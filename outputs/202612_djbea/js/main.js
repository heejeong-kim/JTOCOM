// ===== 헤더: 스크롤 시 배경 전환 =====
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// (모바일 메뉴 제거 — 헤더에는 강의교안 바로가기 CTA만 노출)

// ===== 스크롤 등장 모션 =====
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
}, { threshold: 0, rootMargin: "0px 0px -8% 0px" }); // 긴 섹션(모바일 교안)도 일부만 보이면 등장
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ===== 히어로 콘솔: 프롬프트 타이핑 + 단계 진행 애니메이션 =====
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const prompts = [
  "… [작업] 선정기준.txt로 참여자 명단을 선정·보완·탈락으로 분류해. [조건] 판단할 수 없는 행은 '판단 보류'로 …",
  "… [작업] 분류 결과별 안내문과 90자 문자 초안을 작성해. [조건] 마감일·제출 방법은 양식 그대로 …",
  "… [작업] 신청서 10건의 제출서류를 검토기준표와 대조해 표로 정리해. [조건] 누락·불일치만 표시 …",
  "… [작업] 5개 사업의 목표 대비 달성률을 계산해. [조건] 계산식을 함께 보여줘 …",
  "… [작업] 실적 분석으로 내부 보고용 결과보고서 초안을 작성해. [조건] 추정은 '추정'으로 표시 …"
];
const typed = document.getElementById('typed');
const steps = [...document.querySelectorAll('#flow .flow-step')];
const bar = document.getElementById('bar');
const pct = document.getElementById('pct');
const sleep = ms => new Promise(r => setTimeout(r, ms));

function setStep(i) {
  steps.forEach((s, k) => {
    s.classList.toggle('is-active', k === i);
    s.classList.toggle('is-done', k < i);
    s.querySelector('.state').textContent = k < i ? '완료' : (k === i ? '처리 중' : '대기');
  });
  const p = Math.round((i / steps.length) * 100);
  bar.style.width = p + '%';
  pct.textContent = p + '%';
}

async function run() {
  if (reduce) { // 모션 최소화 환경: 완료 상태로 고정
    typed.textContent = prompts[4];
    setStep(steps.length); return;
  }
  while (true) {
    for (let i = 0; i < prompts.length; i++) {
      setStep(i);
      typed.textContent = '';
      for (const ch of prompts[i]) { typed.textContent += ch; await sleep(30); }
      await sleep(1100);
    }
    setStep(steps.length);
    await sleep(2200);
  }
}
run();

// ===== 플로팅 TOP 버튼: 일정 높이 이상 스크롤 시 노출 =====
const toTop = document.getElementById('toTop');
const toggleTop = () => toTop.classList.toggle('is-show', window.scrollY > 480);
window.addEventListener('scroll', toggleTop, { passive: true });
toggleTop();
toTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
});

// (히어로 배경 모션은 js/hero-fx.js 에서 처리)
