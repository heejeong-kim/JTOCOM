/* =========================================================
 * 메인 허브 — 단계 파이프라인 / 주차 카드 / 필터·검색 / 평가 바
 * ========================================================= */
(function () {
  'use strict';
  const META = window.WEEKS_META, PH = window.COURSE.phases, pad2 = window.pad2;
  const $ = s => document.querySelector(s);

  /* ---------- 마지막으로 본 주차 이어보기 ---------- */
  const last = parseInt(store.get('lastWeek', '0'), 10);
  if (last) { const b = $('#resumeBtn'); b.href = 'lecture/index.html?week=' + pad2(last); b.textContent = 'W' + pad2(last) + ' 이어보기 →'; }

  /* ---------- 단계 파이프라인 ---------- */
  const order = ['이해', '기획', '시험', '제작', '완성'];
  $('#pipe').innerHTML = order.map((k, i) => {
    const p = PH[k], ws = META.filter(w => w.phase === k).map(w => w.no);
    const rng = ws.length > 1 && ws[ws.length - 1] - ws[0] === ws.length - 1 ? 'W' + pad2(ws[0]) + '–W' + pad2(ws[ws.length - 1]) : ws.map(n => 'W' + pad2(n)).join(' · ');
    return '<a class="glass pipe-step ph-' + p.color + '" href="lecture/index.html?week=' + pad2(ws[0]) + '">' +
      '<div class="pipe-node">' + pad2(i + 1) + '</div><div class="en">' + p.en + '</div><h3>' + k + '</h3><p>' + p.desc + '</p><div class="rng">' + rng + '</div></a>';
  }).join('');

  /* ---------- 주차 카드 ---------- */
  $('#grid').innerHTML = META.map(w => {
    const p = PH[w.phase];
    return '<a class="glass wcard ph-' + p.color + (w.phase === '시험' ? ' exam' : '') + '" data-phase="' + w.phase + '" data-q="' + (w.title + ' ' + w.topic + ' ' + w.output).toLowerCase() + '" href="lecture/index.html?week=' + pad2(w.no) + '">' +
      '<figure class="wc-thumb' + '' + '" data-no="' + pad2(w.no) + '">' + (Vault.hasKey() ? '<span class="wc-lock open">🔓 전체 열람</span>' : '<span class="wc-lock">🔒 20% 미리보기</span>') + '<img loading="lazy" src="assets/img/thumbs/week-' + pad2(w.no) + '.svg" alt="' + w.no + '주차 썸네일"></figure>' +
      '<div class="wc-top"><span class="wc-no">' + w.no + '<small>주차</small></span><span class="tag">' + p.en + ' · ' + w.phase + '</span></div>' +
      '<h3 class="wc-title">' + w.title + '</h3><p class="wc-topic">' + w.topic + '</p>' +
      '<div class="wc-foot"><span>' + (w.output && w.output !== '-' ? '▣ ' + w.output : '▣ 개념 학습') + '</span><span class="go">OPEN →</span></div></a>';
  }).join('') + '<div class="empty-msg" id="emptyMsg" hidden>검색 결과 없음</div>';

  /* ---------- 15주차 단계 스트립 ---------- */
  $('#phaseStrip').innerHTML = META.map(w => '<i class="on ph-' + PH[w.phase].color + '" data-phase="' + w.phase + '" title="W' + pad2(w.no) + ' ' + w.phase + '"></i>').join('');

  /* ---------- 필터 + 검색 ---------- */
  let active = 'ALL', query = '';
  const chips = ['ALL'].concat(order);
  $('#filters').innerHTML = chips.map(k => {
    const c = k === 'ALL' ? 'cyan' : PH[k].color;
    return '<button class="fbtn ph-' + c + '" type="button" data-f="' + k + '" aria-pressed="' + (k === 'ALL') + '">' + (k === 'ALL' ? '<i class="dot"></i>전체' : '<i class="dot"></i>' + k) + '</button>';
  }).join('') + '<input class="search" id="search" type="search" placeholder="키워드 검색 (예: 플로우차트)" aria-label="주차 검색">';

  function apply() {
    let shown = 0;
    document.querySelectorAll('.wcard').forEach(c => {
      const ok = (active === 'ALL' || c.dataset.phase === active) && (!query || c.dataset.q.includes(query));
      c.classList.toggle('hide', !ok); if (ok) shown++;
    });
    $('#emptyMsg').hidden = shown > 0;
    $('#zoneShown').textContent = pad2(shown);
    $('#consolePhase').textContent = active === 'ALL' ? 'all' : PH[active].en.toLowerCase();
    document.querySelectorAll('#phaseStrip i').forEach(i => i.classList.toggle('on', active === 'ALL' || i.dataset.phase === active));
  }
  $('#filters').addEventListener('click', e => {
    const b = e.target.closest('.fbtn'); if (!b) return;
    active = b.dataset.f;
    document.querySelectorAll('.fbtn').forEach(x => x.setAttribute('aria-pressed', x === b));
    apply();
  });
  $('#search').addEventListener('input', e => { query = e.target.value.trim().toLowerCase(); apply(); });

  /* ---------- 평가 비율 (1주차 OT 교안 기준) ---------- */
  const EVAL = [
    { nm: '중간고사', v: 30, d: '직무수행능력평가 1 — 기획 및 구조 이해', c: 'amber' },
    { nm: '기말고사', v: 30, d: '직무수행능력평가 2 — 최종 결과물 완성', c: 'magenta' },
    { nm: '과제', v: 20, d: '직무수행능력평가 3 — 주차별 실습 과제', c: 'violet' },
    { nm: '출석', v: 20, d: '병결 시 앱 등록 + 하드카피 제출 필수', c: 'cyan' }
  ];
  $('#evalBars').innerHTML = EVAL.map(e =>
    '<div class="eval-row ph-' + e.c + '"><span class="nm">' + e.nm + '</span><div class="bar"><i data-w="' + e.v * 2.5 + '%"></i></div><b>' + e.v + '%</b><small>' + e.d + '</small></div>'
  ).join('');
  // 화면에 보일 때 막대 애니메이션
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) { en.target.querySelectorAll('.bar i').forEach(i => i.style.width = i.dataset.w); io.unobserve(en.target); }
  }), { threshold: .3 }) : null;
  if (io) io.observe($('#evalBars')); else document.querySelectorAll('#evalBars .bar i').forEach(i => i.style.width = i.dataset.w);

  startNet('net', 24000);
})();
