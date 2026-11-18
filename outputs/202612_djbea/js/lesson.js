// =========================================================
// 상세 강의교안 공통 스크립트 (lesson-0X.html)
// =========================================================
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ===== 헤더: 스크롤 시 배경 전환 =====
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== 스크롤 등장 모션 =====
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
}, { threshold: 0, rootMargin: "0px 0px -8% 0px" });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ===== 목차: 열기/닫기 =====
const toc = document.getElementById('toc');
const tocToggle = document.getElementById('tocToggle');
const layout = document.querySelector('.l-layout');
const isMobile = () => window.innerWidth <= 1024;
function setToc(open) {
  toc.classList.toggle('is-closed', !open);
  layout.classList.toggle('toc-closed', !open && !isMobile());
  tocToggle.setAttribute('aria-expanded', String(open));
  tocToggle.querySelector('span').textContent = open ? '닫기' : '열기';
  tocToggle.setAttribute('aria-label', open ? '목차 닫기' : '목차 열기');
  tocToggle.title = open ? '목차 닫기' : '목차 열기';
}
if (toc && tocToggle) {
  // 데스크톱은 마지막 상태 기억(기본 열림), 모바일은 기본 닫힘
  let saved = null;
  try { saved = localStorage.getItem('djbea-toc-open'); } catch {}
  setToc(isMobile() ? false : saved !== '0');
  tocToggle.addEventListener('click', () => {
    const open = toc.classList.contains('is-closed');
    setToc(open);
    if (!isMobile()) { try { localStorage.setItem('djbea-toc-open', open ? '1' : '0'); } catch {} }
  });
  // 모바일: 항목을 누르면 패널 닫기
  toc.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { if (isMobile()) setToc(false); }));
  let lastMobile = isMobile();
  window.addEventListener('resize', () => {
    if (isMobile() !== lastMobile) { lastMobile = isMobile(); setToc(!lastMobile); }
  });
}

// ===== 목차: 현재 읽는 섹션 강조 (상위·하위 항목) =====
const tocLinks = [...document.querySelectorAll('.toc-list a[href^="#"]')];
const targets = tocLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
const setActive = id => {
  const link = tocLinks.find(a => a.getAttribute('href') === '#' + id);
  if (!link) return;
  const isSub = !!link.closest('.toc-sub');
  const parent = isSub ? link.closest('.toc-list > li').querySelector(':scope > a') : link;
  tocLinks.forEach(a => a.classList.remove('is-active'));
  parent.classList.add('is-active');
  if (isSub) link.classList.add('is-active');
};
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
}, { rootMargin: '-30% 0px -60% 0px' });
targets.forEach(s => spy.observe(s));

// ===== 프롬프트 복사 버튼 =====
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const pre = btn.closest('.prompt-box').querySelector('pre');
    const text = pre.innerText.trim();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // 클립보드 API를 쓸 수 없는 환경(file:// 등) 대비
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch {}
      ta.remove();
    }
    // 아이콘만 있는 버튼: 복사 완료 시 체크 아이콘으로 잠시 전환
    btn.classList.add('is-done');
    btn.setAttribute('aria-label', '복사됨');
    setTimeout(() => { btn.classList.remove('is-done'); btn.setAttribute('aria-label', '프롬프트 복사'); }, 1600);
  });
});

// ===== 보안 체크리스트: 브라우저에 체크 상태 기억 (개인 편의 기능) =====
document.querySelectorAll('.check input[type="checkbox"]').forEach(cb => {
  const key = 'djbea-' + location.pathname.split('/').pop() + '-' + cb.id;
  try { cb.checked = localStorage.getItem(key) === '1'; } catch {}
  cb.addEventListener('change', () => { try { localStorage.setItem(key, cb.checked ? '1' : '0'); } catch {} });
});

// ===== 플로팅 TOP 버튼 =====
const toTop = document.getElementById('toTop');
if (toTop) {
  const toggleTop = () => toTop.classList.toggle('is-show', window.scrollY > 480);
  window.addEventListener('scroll', toggleTop, { passive: true });
  toggleTop();
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));
}

// ===== 탭 전환 (프롬프트 예시 갤러리) =====
document.querySelectorAll('[data-tabs]').forEach(box => {
  const tabs = [...box.querySelectorAll('[role="tab"]')];
  const select = tab => {
    tabs.forEach(t => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      box.querySelector('#' + t.getAttribute('aria-controls')).hidden = !on;
    });
    tab.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', e => { // 좌우 방향키로 탭 이동
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const n = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
        select(n); n.focus();
      }
    });
  });
});

// ===== 참고 법령 박스: 펼치기/접기 (기본 접힘) =====
document.querySelectorAll('.law-toggle').forEach(btn => {
  const body = document.getElementById(btn.getAttribute('aria-controls'));
  if (!body) return;
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', String(open));
    body.hidden = !open;
    btn.querySelector('span').textContent = open ? '접기' : '펼치기';
  });
});

// ===== 참고 박스(.law): 머리 영역 아무 곳이나 눌러도 펼치기/접기 =====
// (펼치기 버튼·원문 보기 링크는 각자 원래 동작을 유지)
document.querySelectorAll('.law-head').forEach(head => {
  const btn = head.querySelector('.law-toggle');
  if (!btn) return;
  head.classList.add('is-clickable');
  head.addEventListener('click', e => {
    if (e.target.closest('a, button')) return;
    btn.click();
  });
});
