// 프롬프트 복사 버튼: 클릭 시 프롬프트 텍스트를 클립보드로 복사
document.querySelectorAll('.prompt .copy').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const text = btn.parentElement.querySelector('pre').textContent;
    try { await navigator.clipboard.writeText(text); btn.textContent = '복사됨'; }
    catch (e) { btn.textContent = '복사 실패'; }
    setTimeout(() => { btn.textContent = '복사'; }, 1500);
  });
});

// 플로팅 목차: 아이콘을 누르면 패널이 펼쳐지고, 바깥 클릭·Esc·항목 선택 시 닫힘
(() => {
  const fab = document.querySelector('.toc-fab');
  const panel = document.getElementById('toc-panel');
  if (!fab || !panel) return;
  const open = (v) => {
    panel.hidden = !v;
    fab.setAttribute('aria-expanded', String(v));
    fab.setAttribute('aria-label', v ? '목차 닫기' : '목차 열기');
    fab.classList.toggle('is-open', v);
  };
  fab.addEventListener('click', (e) => { e.stopPropagation(); open(panel.hidden); });
  panel.addEventListener('click', (e) => { if (e.target.closest('a')) open(false); });
  document.addEventListener('click', (e) => { if (!panel.hidden && !e.target.closest('.toc-float')) open(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) { open(false); fab.focus(); } });

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

// 목차 버튼 시작 위치: '1 바이브코딩이란' 제목 줄 높이에서 보이다가, 스크롤하면 헤더 아래(108px)에 고정

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
