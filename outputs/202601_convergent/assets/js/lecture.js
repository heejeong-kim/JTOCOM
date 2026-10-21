/* =========================================================
 * 강의교안 뷰어 — lecture/index.html?week=NN
 * 1) URL의 week 파라미터 확인 → 2) data/week-NN.js 동적 로드
 * 3) Notion markdown 렌더 → 4) 목차/진행바/이전·다음/단축키 연결
 * ========================================================= */
(function () {
  'use strict';
  const META = window.WEEKS_META, PH = window.COURSE.phases, pad2 = window.pad2;
  const $ = s => document.querySelector(s);

  /* ---------- 현재 주차 결정 ---------- */
  const q = new URLSearchParams(location.search);
  let no = parseInt(q.get('week') || store.get('lastWeek', '1'), 10);
  if (!META.some(w => w.no === no)) no = 1;
  const meta = META.find(w => w.no === no);
  const phase = PH[meta.phase];
  document.body.classList.add('ph-' + phase.color);
  store.set('lastWeek', String(no));
  document.title = 'W' + pad2(no) + ' ' + meta.title + ' | 융합콘텐츠제작';
  $('#sysCode').textContent = 'W' + pad2(no) + ' // ' + phase.en;

  /* ---------- 사이드바: 단계별 주차 목록 ---------- */
  (function buildNav() {
    let html = '', last = '';
    META.forEach(w => {
      const p = PH[w.phase];
      if (w.phase !== last) {
        if (last) html += '</div>';
        html += '<div class="ph-group ph-' + p.color + '"><div class="ph-label">' + p.en + ' · ' + w.phase + '</div>';
        last = w.phase;
      }
      html += '<a class="wk-link ph-' + p.color + (w.no === no ? ' on' : '') + '" href="?week=' + pad2(w.no) + '"' + (w.no === no ? ' aria-current="page"' : '') + '>' +
        '<span class="no">' + pad2(w.no) + '</span><span>' + w.title + '</span></a>';
    });
    $('#weekNav').innerHTML = html + '</div>';
    $('#sideCount').textContent = META.length + ' WEEKS';
    $('#sideOpenWk').textContent = 'W' + pad2(no);
  })();

  /* ---------- 히어로 ---------- */
  function renderHero(stats) {
    $('#hero').innerHTML =
      '<div class="hero-scan" aria-hidden="true"></div>' +
      '<div class="hero-top"><span class="tag">' + phase.en + ' · ' + meta.phase + '</span>' +
      '<span class="hero-crumb"><a href="../index.html">HOME</a> / <a href="../index.html#weeks">CURRICULUM</a> / WEEK ' + pad2(no) + '</span></div>' +
      '<div class="hero-grid">' +
        '<div class="big-no" aria-hidden="true"><small>WEEK</small>' + pad2(no) + '</div>' +
        '<div><h1 class="hero-title">' + meta.title + '</h1><p class="hero-sub">' + meta.topic + '</p></div>' +
      '</div>' +
      '<div class="hero-meta">' +
        '<div><span>PHASE</span><b>' + meta.phase + ' — ' + phase.desc + '</b></div>' +
        '<div><span>OUTPUT · 실습/산출물</span><b>' + (meta.output && meta.output !== '-' ? meta.output : '—') + '</b></div>' +
        (stats.preview ? '<div><span>ACCESS · 열람 범위</span><b>🔒 20% 미리보기 · 비밀번호로 전체 열람</b></div>' : '<div><span>READ · 예상 읽기</span><b>약 ' + stats.min + '분 · 실습 ' + stats.labs + ' · 프롬프트 ' + stats.prompts + '</b></div>') +
      '</div>';
  }

  /* ---------- 목차 ---------- */
  function renderToc(toc, stats) {
    const lvMin = toc.some(t => t.lv === 1) ? 1 : 2;
    let items = toc.filter(t => t.lv <= lvMin + 1);
    if (items.length < 6) items = toc.filter(t => t.lv <= lvMin + 2); // 섹션이 적으면 한 단계 더 표시
    const list = items.map(t => '<li><a class="l' + Math.min(t.lv - lvMin + 1, 3) + '" href="#' + t.id + '">' + t.text + '</a></li>').join('');
    $('#toc').innerHTML =
      '<div class="toc-title"><i class="dot"></i>ON THIS PAGE</div>' +
      (list ? '<ol>' + list + '</ol>' : '<p class="mono" style="color:var(--muted);font-size:12px">섹션 없음</p>') +
      (stats.preview ? '<p class="toc-lock">🔒 이후 섹션은 잠금 해제 후 표시됨</p>' : '') +
      '<div class="toc-stats"><div>SECTIONS<b>' + toc.length + '</b></div><div>LABS<b>' + (stats.preview ? '—' : stats.labs) + '</b></div><div>PROMPTS<b>' + (stats.preview ? '—' : stats.prompts) + '</b></div></div>';
  }

  /* ---------- 이전/다음 ---------- */
  function renderPager() {
    const i = META.findIndex(w => w.no === no), p = META[i - 1], n = META[i + 1];
    $('#pager').innerHTML =
      (p ? '<a class="prev" href="?week=' + pad2(p.no) + '"><span>← PREV · W' + pad2(p.no) + '</span><b>' + p.title + '</b></a>' : '<a class="empty"></a>') +
      (n ? '<a class="next" href="?week=' + pad2(n.no) + '"><span>NEXT · W' + pad2(n.no) + ' →</span><b>' + n.title + '</b></a>' : '<a class="empty"></a>');
  }

  /* ---------- 본문 렌더 ---------- */
  // full=true: 전체 교안 / false: 앞 20% 미리보기 + 잠금 게이트
  function renderMd(md, full, data) {
    const r = NotionRender.render(md, { base: '../' });
    $('#prose').innerHTML = r.html + (full ? '' : gateHtml());
    const chars = $('#prose').textContent.replace(/\s+/g, '').length;
    const stats = full ? { min: Math.max(1, Math.round(chars / 500)), labs: r.labs, prompts: r.prompts } : { preview: true };
    renderHero(stats); renderToc(r.toc, stats); renderPager();
    bindCopy(); bindScrollSpy();
    $('#lockBtn').hidden = !(full && Vault.hasKey());
    if (!full) bindGate(data);
  }

  async function mount() {
    const data = (window.WEEK_DATA || {})[no];
    if (data == null) { $('#prose').innerHTML = '<p class="loading">교안 데이터를 찾을 수 없음 (data/week-' + pad2(no) + '.js)</p>'; return; }
    if (typeof data === 'string') { renderMd(data, true); return; }       // 잠금 없는 데이터
    const rest = await Vault.tryStored(data.lock);                         // 이미 잠금 해제된 세션
    if (rest != null) { renderMd(data.preview + '\n' + rest, true); return; }
    renderMd(data.preview, false, data);
  }

  /* ---------- 잠금 게이트 (미리보기 하단) ---------- */
  function gateHtml() {
    return '<div class="gate-fade" aria-hidden="true"></div>' +
      '<section class="vault glass hud" id="vault">' +
        '<div class="vault-ico" aria-hidden="true"><svg viewBox="0 0 48 48"><rect x="9" y="21" width="30" height="21" rx="5"/><path d="M16 21v-6a8 8 0 0 1 16 0v6"/><circle cx="24" cy="31" r="3"/></svg></div>' +
        '<span class="tag">PREVIEW 20% · 이후 80% 잠금</span>' +
        '<h2>여기부터는 수강생 전용 내용임</h2>' +
        '<p>교안의 앞부분만 미리보기로 공개됨. 수업 시간에 안내받은 비밀번호를 입력하면 나머지 내용을 모두 열람할 수 있음.</p>' +
        '<form id="vaultForm" autocomplete="off">' +
          '<input id="vaultPw" type="password" placeholder="비밀번호 입력" aria-label="비밀번호" required autocomplete="current-password">' +
          '<button class="btn btn-primary" type="submit" id="vaultBtn">잠금 해제 →</button>' +
        '</form>' +
        '<label class="vault-rem"><input type="checkbox" id="vaultRem"> 이 기기에서 잠금 해제 상태 유지</label>' +
        '<p class="vault-err" id="vaultErr" role="alert"></p>' +
      '</section>';
  }
  function bindGate(data) {
    if (!Vault.supported()) { $('#vaultErr').textContent = '이 브라우저 환경에서는 잠금 해제를 지원하지 않음 (최신 Chrome/Edge/Safari 사용 권장)'; return; }
    $('#vaultForm').addEventListener('submit', async e => {
      e.preventDefault();
      const btn = $('#vaultBtn'); btn.disabled = true; btn.textContent = '확인 중…'; $('#vaultErr').textContent = '';
      try {
        const rest = await Vault.unlock(data.lock, $('#vaultPw').value, $('#vaultRem').checked);
        const y = scrollY;
        renderMd(data.preview + '\n' + rest, true);
        scrollTo({ top: y });                                              // 읽던 위치에서 이어서 표시
      } catch (err) {
        $('#vaultErr').textContent = '비밀번호가 올바르지 않음';
        const v = $('#vault'); v.classList.remove('shake'); void v.offsetWidth; v.classList.add('shake');
        btn.disabled = false; btn.textContent = '잠금 해제 →'; $('#vaultPw').select();
      }
    });
  }
  $('#lockBtn').onclick = () => { Vault.clear(); location.reload(); };

  /* 데이터 파일 동적 로드 (file:// 에서도 동작) */
  const s = document.createElement('script');
  s.src = '../data/week-' + pad2(no) + '.js';
  s.onload = mount;
  s.onerror = () => { $('#hero').innerHTML = '<div class="loading">데이터 로드 실패 — data/week-' + pad2(no) + '.js 확인 필요</div>'; };
  document.head.appendChild(s);

  /* ---------- 복사 버튼 ---------- */
  function bindCopy() {
    document.querySelectorAll('.copy-btn').forEach(btn => btn.addEventListener('click', () => {
      let text = '';
      if (btn.hasAttribute('data-copy-target')) {
        const src = btn.closest('section').querySelector('.copy-src');
        text = src ? src.innerText.trim() : '';
      } else {
        const box = btn.closest('.codeblock, .prompt-chip');
        text = box ? box.querySelector('code').innerText : '';
      }
      const done = () => { btn.textContent = 'COPIED'; btn.classList.add('done'); setTimeout(() => { btn.textContent = 'COPY'; btn.classList.remove('done'); }, 1400); };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, () => fallback(text, done));
      else fallback(text, done);
    }));
  }
  function fallback(text, done) {
    const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { /* 복사 미지원 */ }
    ta.remove();
  }

  /* ---------- 진행바 + 목차 하이라이트 ---------- */
  function bindScrollSpy() {
    const links = [...document.querySelectorAll('.toc a')];
    const heads = links.map(a => document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
    const bar = $('#progress');
    const onScroll = () => {
      const h = document.documentElement;
      bar.style.width = Math.min(100, (h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)) * 100) + '%';
      let cur = 0;
      heads.forEach((el, i) => { if (el.getBoundingClientRect().top < 140) cur = i; });
      links.forEach((a, i) => a.classList.toggle('on', i === cur));
    };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  /* ---------- 보기 설정: 글자 크기 / 집중 모드 / 사이드바 ---------- */
  let fs = parseInt(store.get('fs', '17'), 10);
  const applyFs = () => document.documentElement.style.setProperty('--fs', fs + 'px');
  applyFs();
  $('#fsUp').onclick = () => { fs = Math.min(fs + 1, 24); applyFs(); store.set('fs', fs); };
  $('#fsDown').onclick = () => { fs = Math.max(fs - 1, 15); applyFs(); store.set('fs', fs); };

  const setFocus = on => { document.body.classList.toggle('focus', on); $('#focusBtn').setAttribute('aria-pressed', on); };
  $('#focusBtn').onclick = () => setFocus(!document.body.classList.contains('focus'));

  const mobile = () => matchMedia('(max-width: 960px)').matches;
  if (store.get('side', 'open') === 'closed' && !mobile()) document.body.classList.add('side-closed');
  const toggleSide = () => {
    if (mobile()) document.body.classList.toggle('side-open');
    else { const c = document.body.classList.toggle('side-closed'); store.set('side', c ? 'closed' : 'open'); }
  };
  $('#sideToggle').onclick = toggleSide;
  $('#sideClose').onclick = toggleSide;   // 사이드바 안의 닫기 버튼
  $('#sideOpen').onclick = toggleSide;    // 닫힌 상태의 열기 탭
  document.addEventListener('click', e => { if (mobile() && document.body.classList.contains('side-open') && !e.target.closest('.side, #sideToggle, #sideOpen')) document.body.classList.remove('side-open'); });

  /* 단축키: ←/→ 주차 이동, F 집중, S 사이드바 */
  addEventListener('keydown', e => {
    if (e.target.closest('input, textarea') || e.metaKey || e.ctrlKey || e.altKey) return;
    const i = META.findIndex(w => w.no === no);
    if (e.key === 'ArrowLeft' && META[i - 1]) location.search = '?week=' + pad2(META[i - 1].no);
    if (e.key === 'ArrowRight' && META[i + 1]) location.search = '?week=' + pad2(META[i + 1].no);
    if (e.key === 'f' || e.key === 'F') setFocus(!document.body.classList.contains('focus'));
    if (e.key === 's' || e.key === 'S') toggleSide();
  });

  /* 배경 네트워크 (본문 가독성을 위해 저밀도) */
  // 본문 가독성을 위해 교안 페이지에서는 배경 애니메이션을 사용하지 않음
})();
