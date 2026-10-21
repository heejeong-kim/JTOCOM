/* 강의교안 웹뷰 인터랙션: 테마, 주차 바, 목차, 퀴즈 가리기, 프롬프트 복사, 이미지 확대, 잠금 해제 */
(function () {
  'use strict';
  var body = document.body;
  var KEY_CACHE = 'lockKey.v1'; // 브라우저 세션에만 파생 키 보관 (비밀번호 자체는 저장하지 않음)

  // ── 다크/라이트 테마 전환
  var themeBtn = document.getElementById('themeBtn');
  if (themeBtn) themeBtn.addEventListener('click', function () {
    var root = document.documentElement;
    var dark = root.dataset.theme ? root.dataset.theme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
  });

  // ── 현재 주차 번호가 상단 넘버링 바에서 보이도록
  var nav = document.getElementById('weeknav');
  var cur = nav && nav.querySelector('a.on');
  if (nav && cur) nav.scrollLeft = cur.offsetLeft - nav.clientWidth / 2 + cur.clientWidth / 2;

  // ── 읽기 진행률 + 맨 위로
  var progress = document.getElementById('progress');
  var toTop = document.getElementById('toTop');
  function onScroll() {
    var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
    if (progress) progress.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    if (toTop) toTop.classList.toggle('show', h.scrollTop > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener('click', function () { window.scrollTo({ top: 0 }); });

  // ── 목차: 본문 헤딩으로 동적 생성 + 스크롤스파이
  var io = null;
  function buildToc() {
    var list = document.getElementById('tocList');
    var doc = document.getElementById('doc');
    if (!list || !doc) return;
    list.innerHTML = '';
    if (io) io.disconnect();
    var map = {};
    doc.querySelectorAll('h2[id], h3[id]').forEach(function (h) {
      if (h.closest('.lock')) return;
      var li = document.createElement('li');
      li.className = 'lv' + h.tagName.charAt(1);
      var a = document.createElement('a');
      a.href = '#' + h.id; a.textContent = h.textContent.trim();
      li.appendChild(a); list.appendChild(li); map[h.id] = a;
    });
    if (!('IntersectionObserver' in window)) return;
    var links = Object.keys(map).map(function (k) { return map[k]; });
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('on'); });
        if (map[e.target.id]) map[e.target.id].classList.add('on');
      });
    }, { rootMargin: '-80px 0px -70% 0px' });
    Object.keys(map).forEach(function (id) { io.observe(document.getElementById(id)); });
  }

  // ── 복사 유틸
  function copyText(text, btn) {
    function ok() { btn.textContent = '복사됨 ✓'; btn.classList.add('done');
      setTimeout(function () { btn.textContent = '복사'; btn.classList.remove('done'); }, 1600); }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); ok(); } catch (e) { btn.textContent = '복사 실패'; }
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(ok, fallback);
    else fallback();
  }
  function addCopy(el, getText) {
    if (el.classList.contains('has-copy')) return;
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'copy-btn'; b.textContent = '복사';
    b.setAttribute('aria-label', '프롬프트 복사');
    b.addEventListener('click', function (e) { e.stopPropagation(); copyText(getText(), b); });
    el.classList.add('has-copy');
    el.insertBefore(b, el.firstChild);
  }
  function plain(el) {
    var clone = el.cloneNode(true);
    clone.querySelectorAll('.copy-btn').forEach(function (b) { b.remove(); });
    return clone.innerText.replace(/\n{3,}/g, '\n\n').trim();
  }

  // ── 본문 기능 부여 (최초 + 잠금 해제 후 재실행)
  function enhance(root) {
    root.querySelectorAll('table').forEach(function (table) {
      if (table.dataset.quiz) return;
      var rows = table.querySelectorAll('tr');
      if (rows.length < 2) return;
      var cols = [];
      rows[0].querySelectorAll('th,td').forEach(function (c, idx) {
        var t = c.textContent.replace(/\s+/g, ' ').trim();
        if (/^(답변|정답)$/.test(t) || /해설/.test(t)) cols.push(idx);
      });
      if (!cols.length) return;
      table.dataset.quiz = '1';
      var cells = [];
      for (var r = 1; r < rows.length; r++) {
        var cs = rows[r].querySelectorAll('th,td');
        cols.forEach(function (idx) {
          var c = cs[idx]; if (!c) return;
          var v = c.textContent.trim();
          c.classList.add('spoiler', 'hide');
          if (v.length <= 2) c.classList.add('short');
          if (v === 'O') c.classList.add('ans-o');
          if (v === 'X') c.classList.add('ans-x');
          c.addEventListener('click', function () { c.classList.toggle('hide'); });
          cells.push(c);
        });
      }
      var wrap = table.closest('.table-wrap') || table;
      var tools = document.createElement('div');
      tools.className = 'quiz-tools';
      tools.innerHTML = '<button type="button" class="chip">정답·해설 모두 보기</button><button type="button" class="chip">다시 가리기</button>';
      tools.children[0].onclick = function () { cells.forEach(function (c) { c.classList.remove('hide'); }); };
      tools.children[1].onclick = function () { cells.forEach(function (c) { c.classList.add('hide'); }); };
      wrap.parentNode.insertBefore(tools, wrap);
    });
    root.querySelectorAll('pre').forEach(function (pre) {
      addCopy(pre, function () { return (pre.querySelector('code') || pre).innerText.trim(); });
    });
    if (body.dataset.prompt) {
      root.querySelectorAll('blockquote').forEach(function (q) { addCopy(q, function () { return plain(q); }); });
      root.querySelectorAll('.toggle-body').forEach(function (tb) {
        if (tb.innerText.trim()) addCopy(tb, function () { return plain(tb); });
      });
    }
    root.querySelectorAll('figure.img img').forEach(function (img) {
      if (img.dataset.zoom) return;
      img.dataset.zoom = '1';
      img.addEventListener('click', function () {
        var lb = document.createElement('div');
        lb.className = 'lightbox';
        var big = document.createElement('img');
        big.src = img.src; big.alt = img.alt;
        lb.appendChild(big);
        lb.addEventListener('click', function () { lb.remove(); });
        document.body.appendChild(lb);
      });
    });
  }

  var doc = document.getElementById('doc');
  if (doc) { enhance(doc); buildToc(); }

  // ── 잠금 해제 (PBKDF2-SHA256 → AES-GCM, 브라우저 Web Crypto)
  var lockData = document.getElementById('lockData');
  var meta = window.LOCK_META;
  if (!lockData || !meta) return;
  var subtle = window.crypto && window.crypto.subtle;
  var form = document.getElementById('lockForm');
  var msg = document.getElementById('lockMsg');
  var pwInput = document.getElementById('lockPw');
  function u8(s) { var b = atob(s), a = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) a[i] = b.charCodeAt(i); return a; }
  function toB64(buf) { var s = '', a = new Uint8Array(buf); for (var i = 0; i < a.length; i++) s += String.fromCharCode(a[i]); return btoa(s); }

  if (!subtle) {
    if (msg) msg.textContent = '이 브라우저에서는 잠금 해제를 지원하지 않음. 최신 Chrome·Edge·Safari를 사용함.';
    return;
  }
  function deriveKey(pw) {
    return subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveKey']).then(function (base) {
      return subtle.deriveKey({ name: 'PBKDF2', salt: u8(meta.s), iterations: meta.it, hash: 'SHA-256' },
        base, { name: 'AES-GCM', length: 256 }, true, ['decrypt']);
    });
  }
  function verify(key) { return subtle.decrypt({ name: 'AES-GCM', iv: u8(meta.vi) }, key, u8(meta.v)); }
  function unlock(key) {
    var p = JSON.parse(lockData.textContent);
    return subtle.decrypt({ name: 'AES-GCM', iv: u8(p.i) }, key, u8(p.c)).then(function (plainBuf) {
      var slot = document.getElementById('lockedSlot');
      slot.outerHTML = new TextDecoder().decode(plainBuf);
      var lock = document.getElementById('lock');
      if (lock) lock.remove();
      body.classList.add('unlocked');
      enhance(doc); buildToc(); onScroll();
    });
  }
  function cacheKey(key) {
    return subtle.exportKey('raw', key).then(function (raw) {
      try { sessionStorage.setItem(KEY_CACHE, toB64(raw)); } catch (e) {}
    });
  }

  // 같은 브라우저 세션에서 이미 해제했다면 자동 해제
  var cached = null;
  try { cached = sessionStorage.getItem(KEY_CACHE); } catch (e) {}
  if (cached) {
    subtle.importKey('raw', u8(cached), { name: 'AES-GCM' }, false, ['decrypt'])
      .then(function (key) { return verify(key).then(function () { return unlock(key); }); })
      .catch(function () { try { sessionStorage.removeItem(KEY_CACHE); } catch (e) {} });
  }

  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var pw = pwInput.value;
    if (!pw) return;
    msg.textContent = '확인 중…'; msg.className = 'lock-msg';
    deriveKey(pw).then(function (key) {
      return verify(key).then(function () { return cacheKey(key).then(function () { return unlock(key); }); });
    }).catch(function () {
      msg.textContent = '비밀번호가 올바르지 않음. 다시 확인함.';
      msg.className = 'lock-msg err';
      pwInput.select();
    });
  });
})();
