// 맨 위로(TOP) 버튼: 일정 거리 이상 스크롤하면 나타나고, 누르면 페이지 맨 위로 이동
(() => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'to-top';
  btn.setAttribute('aria-label', '맨 위로 이동');
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg><span>TOP</span>';
  // 모든 페이지: 화면 오른쪽 아래 고정 (교안의 목차 버튼은 본문 옆 여백에 별도 배치)
  document.body.appendChild(btn);
  const toggle = () => btn.classList.toggle('is-visible', window.scrollY > 400);
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();
