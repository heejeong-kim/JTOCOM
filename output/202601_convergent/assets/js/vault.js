/* =========================================================
 * Vault — 잠금 주차 교안 복호화 (Web Crypto API)
 * - 교안 데이터는 빌드 시 AES-256-GCM 으로 암호화되어 data/week-XX.js 에 저장됨
 * - 비밀번호 → PBKDF2-SHA256 키 유도 → 복호화 (비밀번호는 어디에도 저장되지 않음)
 * - 잠금 해제 후에는 '유도된 키'만 세션(또는 선택 시 이 기기)에 보관함
 * ========================================================= */
(function () {
  'use strict';
  const KEY_SLOT = 'fusionlab:vault-key';
  const b64 = { // base64 ↔ Uint8Array
    dec: s => Uint8Array.from(atob(s), c => c.charCodeAt(0)),
    enc: u => btoa(String.fromCharCode(...new Uint8Array(u)))
  };
  const ss = { // 저장소 안전 래퍼
    get(k) { try { return sessionStorage.getItem(k) || localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v, remember) { try { (remember ? localStorage : sessionStorage).setItem(k, v); } catch (e) { /* 무시 */ } },
    del(k) { try { sessionStorage.removeItem(k); localStorage.removeItem(k); } catch (e) { /* 무시 */ } }
  };

  const supported = () => !!(window.crypto && crypto.subtle);

  /* 비밀번호로 AES-GCM 키 유도 */
  async function deriveKey(password, payload) {
    const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
    return crypto.subtle.deriveKey(
      { name: 'PBKDF2', hash: 'SHA-256', salt: b64.dec(payload.salt), iterations: payload.iter },
      base, { name: 'AES-GCM', length: 256 }, true, ['decrypt']
    );
  }

  /* 복호화 — 비밀번호가 틀리면 GCM 인증 실패로 예외 발생 */
  async function decrypt(payload, key) {
    const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64.dec(payload.iv) }, key, b64.dec(payload.ct));
    return new TextDecoder().decode(pt);
  }

  async function saveKey(key, remember) {
    const raw = await crypto.subtle.exportKey('raw', key);
    ss.set(KEY_SLOT, b64.enc(raw), remember);
  }
  async function loadKey() {
    const v = ss.get(KEY_SLOT);
    if (!v || !supported()) return null;
    try { return await crypto.subtle.importKey('raw', b64.dec(v), { name: 'AES-GCM' }, true, ['decrypt']); }
    catch (e) { return null; }
  }

  window.Vault = {
    supported,
    isEncrypted: d => !!(d && typeof d === 'object' && d.ct),
    hasKey: () => !!ss.get(KEY_SLOT),
    clear: () => ss.del(KEY_SLOT),
    /* 저장된 키로 복호화 시도 → 실패 시 null */
    async tryStored(payload) {
      const key = await loadKey();
      if (!key) return null;
      try { return await decrypt(payload, key); } catch (e) { ss.del(KEY_SLOT); return null; }
    },
    /* 입력한 비밀번호로 복호화 → 성공 시 키 보관 */
    async unlock(payload, password, remember) {
      const key = await deriveKey(password, payload);
      const text = await decrypt(payload, key); // 틀리면 throw
      await saveKey(key, remember);
      return text;
    }
  };
})();
