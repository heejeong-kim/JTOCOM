/* =====================================================================
   JTOCOM 교육 이력 공통 데이터 (education.html · index.html 공용)
   ▸ 새 교육 이력은 이 파일의 LECTURES 배열에만 추가하면 됩니다.
     - 교육 페이지(education.html) 목록·검색에 자동 반영
     - 메인(index.html) "Education history" 섹션에 시작일 기준 최신 8건 자동 노출
   ===================================================================== */
/* ===================== AI 교육 이력 =====================
   ▸ 아래 LECTURES 배열에 강의를 추가하면 목록·검색·필터에 자동 반영됩니다.
       name    : 강의명
       period  : 기간 (예: '2025.11' 또는 '2025.03~05')
       target  : 대상 — EDU_TARGETS 값 중 하나여야 필터에 잡힙니다
       summary : 한두 문장 요약
       thumb   : 썸네일 경로 (예: 'assets/images/edu/01.jpg') · 비워두면 '이미지 준비중'
========================================================= */
const EDU_TARGETS = ['기업','공공기관','대학','부트캠프'];
const LECTURES = [
  { name:'동양미래대학교 컴퓨터공학부 겸임교수', period:'2025.03~현재', target:'대학', org:'', featured:true,
    summary:'생성형 AI 활용과 UIUX 기획을 주제로 컴퓨터공학부에서 강의하고 있습니다.', thumb:'',
    links:[{ label:'생성형 AI활용', url:'https://heejeong-kim.github.io/utilization-of-generativeai/index.html' }] },
  { name:'숭의여자대학교 IT소프트웨어융합과 겸임교수', period:'2024.01~현재', target:'대학', org:'', featured:true,
    summary:'생성형 AI·데이터 리터러시, 데이터 분석·시각화, 생성형 AI 웹툰 제작, 융합 콘텐츠 제작을 가르치고 있습니다.', thumb:'',
    links:[{ label:'AI와 디지털 리터러시', url:'https://heejeong-kim.github.io/ai-digital-literacy/' },
           { label:'웹프로젝트 실습', url:'https://heejeong-kim.github.io/web-project-practice-2026/' }] },
  { name:'과학기술경력 포트폴리오 특강', period:'2026.10', target:'공공기관', org:'',
    summary:'과학기술 분야 경력자를 대상으로 경력을 포트폴리오로 구조화하고 표현하는 방법을 특강으로 진행했습니다.', thumb:'assets/p10.png',
    links:[{ label:'특강 페이지', url:'https://heejeong-kim.github.io/science-tech-26/#top' }] },
  { name:'2026 KU(건국대학교) 캠퍼스타운 AI Nest 프로그램 강사 및 멘토링', period:'2026.09', target:'대학', org:'',
    summary:'KU 캠퍼스타운 AI Nest 프로그램에서 참여 팀을 대상으로 생성형 AI 활용 수업 및 멘토링을 진행했습니다.', thumb:'',
    links:[{ label:'펫 x AI', url:'https://heejeong-kim.github.io/ku-ai-nest/' },
           { label:'에코푸드 x AI', url:'https://heejeong-kim.github.io/ku-ai-nest2/' }] },
  { name:'2026. 09 성신여자대학교 「취업 말고 커리어」 특강', period:'2026.08~09', target:'대학', org:'',
    summary:'취업을 넘어 커리어 관점의 진로 설계를 주제로 특강과 멘토링을 진행했습니다.', thumb:'',
    links:[{ label:'커리어 특강', url:'https://heejeong-kim.github.io/sungshin-lecture/' }] },
  { name:'WISET 이공계 생성형 AI 활용 실무 교육', period:'2026.07~08', target:'공공기관', org:'',
    summary:'이공계 연구자·종사자를 대상으로 생성형 AI를 실무에 활용하는 방법을 실습 중심으로 진행했습니다.', thumb:'',
    links:[{ label:'강의교안', url:'https://heejeong-kim.github.io/wiset-ai/' }] },
  { name:'무역안보관리원 AI 영상 제작 및 AI 자동화 실무 교육', period:'2026.07', target:'공공기관', org:'',
    summary:'AI 영상 제작과 업무 자동화를 실제 업무에 적용하는 실습 과정을 진행했습니다.', thumb:'' },
  { name:'한국경제 청년일경험지원사업 ESG 지원형 멀티모달 AX 마케팅 캠프 멘토링', period:'2026', target:'기업', org:'',
    summary:'청년일경험지원사업(ESG 지원형) 멀티모달 AX 마케팅 캠프에서 참여자 멘토링을 진행했습니다.', thumb:'' },
  { name:'AI 서비스 기획 부트캠프', period:'2026.04~현재', target:'부트캠프', org:'패스트캠퍼스',
    summary:'생성형 AI를 활용한 서비스 기획 전 과정을 집중 부트캠프 형태로 진행했습니다.', thumb:'' },
  { name:'2026년 취업전략 멘토링', period:'2026.02~현재', target:'부트캠프', org:'제로베이스',
    summary:'취업 전략 수립을 주제로 참여자별 1:1 멘토링을 진행했습니다.', thumb:'' },
  { name:'goormedu ICT이노베이션스퀘어 기초학습 콘텐츠강사 - GenAI', period:'2025.12', target:'기업', org:'',
    summary:'ICT이노베이션스퀘어 기초학습 과정의 생성형 AI(GenAI) 콘텐츠를 기획·강의했습니다.', thumb:'assets/p23.png', keepSlot:true },
  { name:'한국경제 AI크리에이터 아카데미 (생성형 AI)', period:'2025.05~07', target:'기업', org:'',
    summary:'생성형 AI를 활용한 콘텐츠 크리에이팅 실무 과정을 진행했습니다.', thumb:'' },
  { name:'AI활용 프로젝트 실무 강사 – AI 활용 기획부터 MVP까지 1:1 멘토링', period:'2024.01~현재', target:'부트캠프', org:'제로베이스',
    summary:'AI 활용 기획부터 MVP 제작까지 전 과정을 1:1 멘토링으로 밀착 지원합니다.', thumb:'' },
  { name:'PM 스쿨 전임 강사', period:'2022.04~2026.04', target:'부트캠프', org:'제로베이스',
    summary:'서비스 기획·PM 실무 과정을 전임 강사로 진행했습니다.', thumb:'' },
  { name:'UIUX · PM · 생성형 AI 상시 멘토', period:'2022.01~현재', target:'부트캠프', org:'잇다',
    summary:'UIUX, PM, 생성형 AI 분야에서 상시 멘토로 참여자들의 성장을 지원하고 있습니다.', thumb:'' },
  { name:'서비스 기획서 완성하기 강사 및 멘토', period:'2021.08~2022.04', target:'부트캠프', org:'제로베이스',
    summary:'서비스 기획서 작성 실무를 강의하고 참여자별 멘토링으로 완성도를 높였습니다.', thumb:'' },
  { name:'서비스 기획 및 UXUI 이해하기', period:'2021.06', target:'부트캠프', org:'패스트캠퍼스',
    summary:'서비스 기획과 UXUI의 기본기를 이해하는 입문 과정을 진행했습니다.', thumb:'' },
  { name:'평생학습 지능형 웹/앱 서비스 기획 강사', period:'2020.12~2021.12', target:'공공기관', org:'',
    summary:'평생학습 과정에서 지능형 웹·앱 서비스 기획을 강의했습니다.', thumb:'' },
  { name:'서비스 기획서 완성하기 60일 완주반 강사', period:'2020.06~2021.08', target:'부트캠프', org:'패스트캠퍼스',
    summary:'60일 완주 과정으로 서비스 기획서 작성을 밀착 지도했습니다.', thumb:'' },
  { name:'이공계 전문기술 웹프로젝트 기획 강사', period:'2020.05~2022.05', target:'공공기관', org:'',
    summary:'이공계 전문기술 과정에서 웹 프로젝트 기획을 강의했습니다.', thumb:'' },
  { name:'캠퍼스 CEO육성사업 서비스 기획 강의', period:'2018.01~02', target:'대학', org:'',
    summary:'대학 캠퍼스 CEO 육성 과정에서 서비스 기획을 강의했습니다.', thumb:'' }
];

/* 썸네일 자동 매핑 — 전체 순서 기준 assets/p1.png … p20.png (파일이 없으면 카드에서 '이미지 준비중'으로 자동 대체) */
/* 썸네일을 직접 지정한 항목(thumb 값 있음)은 번호 매핑에서 제외 → 기존 p번호 이미지가 밀리지 않음 */
/* keepSlot:true → 직접 지정한 썸네일을 쓰되 번호 자리는 유지 (뒤 항목 p번호가 당겨지지 않음) */
{ let n = 0; LECTURES.forEach(l => { if (l.thumb) { if (l.keepSlot) n++; return; } n++; l.thumb = 'assets/p' + n + '.png'; }); }

/* 기간 문자열 → 정렬용 숫자 (예: '2026.08~09' → 202608, '2026' → 202600) */
const lectureStartKey = p => { const m = String(p||'').match(/(\d{4})(?:\.\s*(\d{1,2}))?/); return m ? (+m[1])*100 + (+(m[2]||0)) : 0; };
/* 최신순 정렬된 사본 반환 (시작일이 같으면 배열 순서 유지) */
const latestLectures = (count = 8) => LECTURES.map((l,i) => ({ l, i }))
  .sort((a,b) => lectureStartKey(b.l.period) - lectureStartKey(a.l.period) || a.i - b.i)
  .slice(0, count).map(x => x.l);
