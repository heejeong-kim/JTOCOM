// 섹션 제목 + 샘플 카드 묶음을 스크롤 진입 시 등장시킴
const headings = document.querySelectorAll('.section-heading, .tracks');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (headings.length && !reduceMotion && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('motion-enabled');
  const headingObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.18 });

  headings.forEach((heading) => headingObserver.observe(heading));
}

// 워드 클라우드: 단어를 차례로 강조하고 아래 설명 줄에 뜻을 보여줌 (마우스·키보드 포커스 시 해당 단어 우선)
const cloudWords = Array.from(document.querySelectorAll('.cloud-word'));
const caption = document.querySelector('.cloud-caption');
if (cloudWords.length && caption) {
  const showWord = (word) => {
    cloudWords.forEach((w) => w.classList.toggle('is-active', w === word));
    caption.classList.add('is-changing');
    setTimeout(() => {
      const term = word.childNodes[0].textContent.trim();
      caption.innerHTML = '';
      const b = document.createElement('b'); b.textContent = term;
      const span = document.createElement('span'); span.textContent = word.dataset.tip;
      caption.append(b, span);
      caption.classList.remove('is-changing');
    }, 180);
  };
  let current = 0;
  let paused = false;
  cloudWords.forEach((w, idx) => {
    w.addEventListener('mouseenter', () => { paused = true; current = idx; showWord(w); });
    w.addEventListener('focus', () => { paused = true; current = idx; showWord(w); });
    w.addEventListener('mouseleave', () => { paused = false; });
    w.addEventListener('blur', () => { paused = false; });
  });
  showWord(cloudWords[0]);
  if (!reduceMotion) {
    setInterval(() => {
      if (paused) return;
      current = (current + 1) % cloudWords.length;
      showWord(cloudWords[current]);
    }, 2800);
  }
}

// 커리큘럼 표: 남는 가로 폭을 모든 칸의 좌우 여백에 똑같이 나눠, 칸 사이·양 끝 여백을 모두 동일하게 맞춤
const agenda = document.querySelector('.agenda');
const agendaWrap = document.querySelector('.agenda-wrap');
const BASE_PX = 24;
function equalizeAgenda() {
  if (!agenda || !agendaWrap) return;
  agenda.style.setProperty('--cell-px', BASE_PX + 'px');
  agenda.classList.remove('is-tight');
  if (window.innerWidth <= 900) return; // 좁은 화면은 기본 여백 유지
  const cols = agenda.rows[0].cells.length;
  agenda.style.width = 'max-content';
  agenda.style.minWidth = '0';
  const natural = agenda.getBoundingClientRect().width;
  agenda.style.width = '';
  agenda.style.minWidth = '';
  const extra = agendaWrap.clientWidth - natural;
  // 한 줄로 다 들어가지 않으면 주요 내용 칸만 줄바꿈 허용
  agenda.classList.toggle('is-tight', extra < 0);
  if (extra > 0) {
    agenda.style.setProperty('--cell-px', (BASE_PX + extra / (cols * 2)).toFixed(2) + 'px');
  }
}
if (agenda) {
  equalizeAgenda();
  window.addEventListener('resize', equalizeAgenda);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(equalizeAgenda);
}
