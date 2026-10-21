/* =========================================================
 * 융합콘텐츠제작 2026-1 · 주차 메타데이터
 * - Notion "주차별 커리큘럼" DB 속성(주차/단계/학습 내용/실습·산출물)을 그대로 옮김
 * - 본문(markdown)은 data/week-XX.js 에 별도 저장됨
 * ========================================================= */
window.COURSE = {
  title: '융합콘텐츠제작',
  term: '2026년 1학기',
  school: '숭의여자대학교',
  tagline: 'Interactive Storytelling × Generative AI',
  // 모든 주차 공개 — 각 교안의 앞 20%는 미리보기, 나머지 80%는 암호화되어 비밀번호로 잠금 해제함
  previewRatio: 0.2,
  // 단계(Phase) 정의 — 색상 토큰은 theme.css 의 --c-* 변수와 연결됨
  phases: {
    '이해': { en: 'UNDERSTAND', color: 'cyan',    desc: '융합 콘텐츠 및 인터랙티브 구조 이해' },
    '기획': { en: 'DESIGN',     color: 'violet',  desc: '스토리·선택 구조·세계관 기획' },
    '제작': { en: 'BUILD',      color: 'magenta', desc: 'AI 활용 콘텐츠 제작' },
    '완성': { en: 'COMPLETE',   color: 'lime',    desc: '웹 구현, 결과물 완성 및 발표' },
    '시험': { en: 'EVALUATE',   color: 'amber',   desc: '직무수행능력평가' }
  }
};

window.WEEKS_META = [
  { no: 1,  phase: '이해', title: 'OT',                                  topic: '교수 소개 및 수업 소개 (샘플 예시 리뷰)',                 output: '-' },
  { no: 2,  phase: '이해', title: '융합 콘텐츠 개념 이해',               topic: '융합 콘텐츠의 개념 이해',                                 output: '-' },
  { no: 3,  phase: '이해', title: '인터랙티브 동화 구조 이해',           topic: '인터랙티브 동화 기본 구조 분석',                          output: '인터랙티브 동화 분석' },
  { no: 4,  phase: '기획', title: '세계관 설정, 캐릭터 및 스크립트 작성', topic: '캐릭터 성격·역할 고정 · 세계관 톤과 규칙 설정',           output: '주차별 실습 과제' },
  { no: 5,  phase: '기획', title: '스토리 구조 기획',                    topic: '선택지 개수 설정과 스토리 트리 방식(계층형 구조)',         output: '주차별 실습 과제' },
  { no: 6,  phase: '기획', title: '선택 구조 설계 및 플로우차트 설계',   topic: '동화 기본 서사 구조 이해 [시작–사건–선택–결말] 설계',      output: '주차별 실습 과제' },
  { no: 7,  phase: '기획', title: '인터렉티브 동화 기획 완성, 로직 설계', topic: '스토리·선택·세계관 통합 · 기획 논리 점검',                 output: '주차별 실습 과제' },
  { no: 8,  phase: '시험', title: '중간시험',                            topic: '1-7주 학습 평가 - 시험',                                  output: '직무수행능력평가 1' },
  { no: 9,  phase: '제작', title: '인터렉티브 동화 기획 완성 및 시스템 설계', topic: '인터페이스 설계, 디자인 컨셉 정의',                   output: '주차별 실습 과제' },
  { no: 10, phase: '제작', title: '로직 수정, 캐릭터, 컷별 이미지 제작 프롬프트', topic: '로직 수정, 이미지 생성 AI 도구 사용법 + 스타일 일관성 유지', output: '주차별 실습 과제' },
  { no: 11, phase: '제작', title: '컷별 이미지 제작 1',                  topic: '장면 이미지 제작',                                        output: '주차별 실습 과제' },
  { no: 12, phase: '제작', title: '컷별 이미지 제작 2',                  topic: '장면 이미지 제작 · 웹 배포',                              output: '주차별 실습 과제' },
  { no: 13, phase: '제작', title: '컷별 영상, 기타 음향',                topic: '장면 완성도 높이기',                                      output: '주차별 실습 과제' },
  { no: 14, phase: '완성', title: '결과물 최종',                         topic: '기획 의도 정리 · 결과물 설명 구조화',                     output: '주차별 실습 과제' },
  { no: 15, phase: '시험', title: '기말시험',                            topic: '최종 결과물 제출, 1-14주차 학습 평가 - 시험',             output: '직무수행능력평가 2' }
];

/* 두 자리 주차 코드 (예: 6 → "06") */
window.pad2 = n => String(n).padStart(2, '0');

