// 프롬프트 복사 버튼: 클릭 시 프롬프트 텍스트를 클립보드로 복사
document.querySelectorAll('.prompt .copy').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const text = btn.parentElement.querySelector('pre').textContent;
    try { await navigator.clipboard.writeText(text); btn.classList.add('is-done'); btn.setAttribute('aria-label', '복사됨'); }
    catch (e) { btn.setAttribute('aria-label', '복사 실패'); }
    setTimeout(() => { btn.classList.remove('is-done'); btn.setAttribute('aria-label', '프롬프트 복사'); }, 1500);
  });
});

// 플로팅 버튼(목차·교시 이동): 아이콘을 누르면 패널이 펼쳐지고, 바깥 클릭·Esc·항목 선택 시 닫힘
(() => {
  const pairs = [
    [document.querySelector('.toc-fab:not(.lesson-fab)'), document.getElementById('toc-panel'), '목차'],
    [document.querySelector('.lesson-fab'), document.getElementById('lesson-panel'), '교시 이동'],
  ].filter(([f, p]) => f && p);
  const set = (fab, panel, name, v) => {
    panel.hidden = !v;
    fab.setAttribute('aria-expanded', String(v));
    fab.setAttribute('aria-label', name + (v ? ' 닫기' : ' 열기'));
    fab.classList.toggle('is-open', v);
  };
  const closeAll = () => pairs.forEach(([f, p, n]) => set(f, p, n, false));
  pairs.forEach(([fab, panel, name]) => {
    fab.addEventListener('click', (e) => { e.stopPropagation(); const v = panel.hidden; closeAll(); set(fab, panel, name, v); });
    panel.addEventListener('click', (e) => { if (e.target.closest('a')) set(fab, panel, name, false); });
  });
  document.addEventListener('click', (e) => { if (!e.target.closest('.toc-float')) closeAll(); });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const opened = pairs.find(([, p]) => !p.hidden);
    if (opened) { closeAll(); opened[0].focus(); }
  });
})();

(() => {
  const panel = document.getElementById('toc-panel');
  if (!panel) return;
  // 지금 읽고 있는 섹션을 목차에서 강조
  const links = [...panel.querySelectorAll('a')];
  if (!('IntersectionObserver' in window)) return;
  const map = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => a.classList.remove('is-active'));
      const a = map.get(en.target.id); if (a) a.classList.add('is-active');
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  map.forEach((_, id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
})();

// 1.2 기존 개발 vs 바이브코딩: 화면에 보이면 모션 시작
(() => {
  const vs = document.querySelector('.vs');
  if (!vs) return;
  if (!('IntersectionObserver' in window)) { vs.classList.add('is-play'); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { vs.classList.add('is-play'); io.disconnect(); } });
  }, { threshold: 0.35 });
  io.observe(vs);
})();

// 3.1 HTML·CSS·JS 카드: 화면에 보이면 미니 모션 시작
(() => {
  const el = document.querySelector('.stack-demo');
  if (!el) return;
  if (!('IntersectionObserver' in window)) { el.classList.add('is-play'); return; }
  const io = new IntersectionObserver((es) => { es.forEach((e) => { if (e.isIntersecting) { el.classList.add('is-play'); io.disconnect(); } }); }, { threshold: 0.3 });
  io.observe(el);
})();

// 3. 모션 예시: 화면에 보이면 시작
(() => {
  const el = document.querySelector('.motion-demo');
  if (!el) return;
  if (!('IntersectionObserver' in window)) { el.classList.add('is-play'); return; }
  const io = new IntersectionObserver((es) => { es.forEach((e) => { if (e.isIntersecting) { el.classList.add('is-play'); io.disconnect(); } }); }, { threshold: 0.3 });
  io.observe(el);
})();
