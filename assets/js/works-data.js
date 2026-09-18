/* =====================================================================
   JTOCOM 포트폴리오 공통 데이터 (portfolio.html · index.html 공용)
   ▸ 새 실적은 이 파일에만 추가하면 됩니다.
     - 포트폴리오 페이지 목록·필터·건수에 자동 반영
     - 메인(index.html) "경험으로 쌓아온 실행력" 섹션에 최신 8건 자동 노출
   ▸ 항목 필드: name(프로젝트명) · period(연도) · type(유형 키)
               service(한 줄 설명, 선택) · url(외부 링크, 선택 → 새 탭)
   ===================================================================== */
const TRACK = [
  ['2026', [
    'Group DEMEX AI Chatbot System',
    'SaaS 플랫폼 시스템 구축',
    '디지털교과서 표준화 작업 컨설팅',
    '에너지관리공단 에너지바우처 업무 포털 컨설팅'
  ]],
  ['2025', [
    '서울시 2025 부활절 퍼레이드 Responsive Web',
    'JOYTOWN Responsive Web 2.0 (with Metaverse)',
    '더리본 온라인 렌탈 시스템 Responsive Web',
    '국가무형문화재 연등회 Responsive Web'
  ]],
  ['2024', [
    '서울시 2024 부활절 퍼레이드 Responsive Web',
    '현대자동차 Global WEBCC 3D Excite 시스템 구축',
    '저출생대책 국민운동 본부 Responsive Web',
    '서울시 청소년지원 센터 Responsive Web'
  ]],
  ['2023', [
    '다문화 TV Responsive Web',
    '부동산광고시장 감시센터 - 허위매물탐지시스템',
    '현대자동차 WWN4.0 글로벌 분석 설계 컨설팅',
    'CGS Seoul Responsive Web',
    '방위사업청 교육포털 컨설팅 Responsive Web',
    'MALHAZA 교육 플랫폼 Responsive Web 2차',
    '금융보안원 반응형 웹 시스템 구축',
    '스마트재단 Responsive Web',
    '서울시 청소년교육센터 Responsive Web',
    '엑스포츠 뉴스 Responsive Web',
    'JOYTOWN(CTSTV메타버스) Responsive Web',
    '서울시 2023 부활절 퍼레이드 Responsive Web'
  ]],
  ['2022', [
    'Metaverse JOYTOWN CI / Brochure',
    '아파트먼트 경비원 관리 APP/WEB 구축',
    '아파트먼트 APP/WEB UXUI 컨설팅',
    '카스코 철강 온라인 경매 사이트 구축',
    '태룡에스디 회사소개 Responsive Web',
    '한양파트너스에프에이치 회사소개 Responsive Web',
    'CTSTV Kids Responsive Web',
    'TSS 주차관리 APP',
    '이너트론 불법감시 시스템 구축',
    'Alamo RAC 해외 렌터카 예약 시스템 구축',
    'LH교과서 테블릿 구축',
    '현대자동차 Global WWN4.0 분석 설계 컨설팅'
  ]],
  ['2021', [
    'O2O 펫플랫폼 CRM 시스템 구축',
    '엘바라이프 인트라넷 구축',
    'CTS 크리스천 아카데미 Responsive Web',
    '시니어 말하자 교육 플랫폼 Responsive Web',
    'AJ 대원 인트라넷 구축',
    '어바웃펫 비즈니스 정책 및 컨설팅',
    'CTSTV 디지털 아카이브 UX 컨설팅',
    '새롬 인트라넷 구축',
    '그라운드 고척 Responsive Web',
    'TIMO Education App',
    '경제사회연구원 Responsive Web'
  ]],
  ['2020', [
    '유니슨이테크 Responsive Web 및 유지보수',
    '온라인투어 차세대 컨설팅',
    'ACE LIFE Insurance System',
    'GSFRESH UXUI 컨설팅 및 차세대 컨설팅',
    '보스톤사이언티픽 Responsive Web'
  ]],
  ['2019', [
    'LG화학 도면 관리 시스템 구축',
    '중소기업중앙회 온라인 조사 시스템 구축',
    'RE100 온라인 경매 시스템 구축',
    'PRS 온라인 관리 시스템 구축',
    'CTS 성경필사 Responsive Web'
  ]],
  ['2018', [
    'TREA Study 교육 플랫폼 Responsive Web',
    '효성 ESS 통합 시스템 구축',
    'RE100 발전시스템 통합 관리 솔루션',
    'MALHAZA 교육 플랫폼 Responsive Web 1차'
  ]]
];

/* 유형 자동 분류 — 우선순위: 컨설팅 > App > Responsive Web > 시스템 구축 > 기타 */
const TYPE_LABEL = { genai:'생성형 AI 웹제작', fusion:'융합 콘텐츠', web:'Responsive Web', system:'시스템 구축', consult:'컨설팅', app:'App', workflow:'AI Workflow 자동화', etc:'기타' }
/* 유형별 픽토그램 (인덱스 포트폴리오 타일과 동일 스타일) */
const TYPE_ICON = {
  fusion:'<rect x="2" y="7" width="20" height="11" rx="5"/><path d="M7 10.5v4M5 12.5h4M15.5 11.5h.01M18 13.5h.01"/>',
  genai:'<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8Z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8Z"/>',
  web:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 4v5"/>',
  system:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 10v10"/>',
  consult:'<path d="M5 4h10l4 4v12H5Z"/><path d="M15 4v4h4M8 13h8M8 17h5"/>',
  app:'<rect x="7" y="2" width="10" height="20" rx="2.5"/><path d="M11 18h2"/>',
  workflow:'<path d="M13 2 4 14h7l-1 8 9-12h-7Z"/>',
  etc:'<path d="M4 5h16v14H4Z"/><path d="m4 15 5-5 4 4 3-3 4 4M15 8h.01"/>'
};;
function classify(name){
  if (/컨설팅|UX 컨설팅|UXUI 컨설팅/.test(name)) return 'consult';
  if (/\bAPP\b|\bApp\b|APP\//.test(name))        return 'app';
  if (/Responsive Web|반응형 웹/.test(name))      return 'web';
  if (/시스템|구축|System|솔루션|인트라넷|테블릿/.test(name)) return 'system';
  return 'etc';
}
const ALL = TRACK.flatMap(([period, list]) =>
  list.map(name => ({ name, period, type: classify(name) })));

/* 포트폴리오 = 실적 중 최신 순 (연도 그룹 순서 유지) */
const PORTFOLIO_ORDER = ['2026','2025','2024','2023','2022','2021','2020','2019','2018'];
const HUES = [200,208,193,214,186,205,197,211,190,216,203,188,209,195,212,199,206,191,215,201,187,210,196,204];
const WORKS = ALL
  .slice()
  .sort((a,b) => PORTFOLIO_ORDER.indexOf(a.period) - PORTFOLIO_ORDER.indexOf(b.period))
  .map((w,i) => ({ ...w, h: HUES[i % HUES.length], no: String(i+1).padStart(2,'0') }));
/* 추가 실적 — 번호는 기존 매핑 유지를 위해 항상 마지막 번호로 부여 */
WORKS.push({
  name: '광화문 읽거리 콘텐츠, 반응형 웹 구축',
  period: '2021',
  type: classify('광화문 읽거리 콘텐츠, 반응형 웹 구축'),
  h: HUES[WORKS.length % HUES.length],
  no: String(WORKS.length + 1).padStart(2,'0')
});
WORKS.push({
  name: '숭실대학교 MBA 앱 제작',
  period: '2021',
  type: 'app',
  h: HUES[WORKS.length % HUES.length],
  no: String(WORKS.length + 1).padStart(2,'0')
});
WORKS.push({
  name: '블록북 UIUX 컨설팅',
  period: '2024',
  type: 'consult',
  h: HUES[WORKS.length % HUES.length],
  no: String(WORKS.length + 1).padStart(2,'0')
});
WORKS.push({
  name: 'FACEVIEW Brochure',
  period: '2025',
  type: 'etc',
  h: HUES[WORKS.length % HUES.length],
  no: String(WORKS.length + 1).padStart(2,'0')
});
WORKS.push({
  name: 'iLOTTE.com UIUX 컨설팅',
  period: '2022',
  type: 'consult',
  h: HUES[WORKS.length % HUES.length],
  no: String(WORKS.length + 1).padStart(2,'0')
});
WORKS.push({
  name: 'GSGHOP UIUX 컨설팅',
  period: '2022',
  type: 'consult',
  h: HUES[WORKS.length % HUES.length],
  no: String(WORKS.length + 1).padStart(2,'0')
});
WORKS.push({
  name: '올리자 중고등학생 교육용 플랫폼 시스템 구축',
  period: '2022',
  type: 'system',
  h: HUES[WORKS.length % HUES.length],
  no: String(WORKS.length + 1).padStart(2,'0')
});
WORKS.push({
  name: '전국학교급식 데이터전처리시각화',
  period: '2026',
  type: 'consult',
  h: HUES[WORKS.length % HUES.length],
  no: String(WORKS.length + 1).padStart(2,'0')
});
WORKS.push({
  name: 'DMEX AI Brochure 제작',
  period: '2026',
  type: 'etc',
  h: HUES[WORKS.length % HUES.length],
  no: String(WORKS.length + 1).padStart(2,'0')
});
WORKS.push({
  name: 'CTS 뉴욕방송 ONAIR Responsive Web',
  period: '2021',
  type: 'web',
  h: HUES[WORKS.length % HUES.length],
  no: String(WORKS.length + 1).padStart(2,'0')
});

/* 생성형 AI 웹제작 — 외부 링크(새 탭) 카드 · 목록 맨 앞에 노출, 번호는 마지막 번호로 부여 */
WORKS.unshift({
  name: '돌파녀의 포트폴리오',
  period: '2026',
  type: 'genai',
  service: '생성형 AI로 기획·디자인·개발한 개인 포트폴리오 웹사이트',
  url: 'https://heejeong-kim.github.io/break_through/',
  h: HUES[WORKS.length % HUES.length],
  no: String(WORKS.length + 1).padStart(2,'0')
});

WORKS.unshift({
  name: '데이터로 보는 환경 대시보드',
  period: '2026',
  type: 'genai',
  service: '생성형 AI로 공공 환경 데이터를 분석·시각화한 인터랙티브 대시보드',
  url: 'https://heejeong-kim.github.io/wiset/',
  h: HUES[WORKS.length % HUES.length],
  no: String(WORKS.length + 1).padStart(2,'0')
});

/* 36번 항목을 SAMSUNG POP UIUX 컨설팅으로 교체 — 번호 36 유지 */
const idx36 = WORKS.findIndex(w => w.no === '36');
if(idx36 > -1) WORKS[idx36] = { ...WORKS[idx36], name: 'SAMSUNG POP UIUX 컨설팅', type: 'consult' };

/* 06번 항목을 Group DEMEX Admin System으로 교체 — 번호 06 유지 */
const idx06 = WORKS.findIndex(w => w.no === '06');
if(idx06 > -1) WORKS[idx06] = { ...WORKS[idx06], name: 'Group DEMEX Admin System', type: 'system', period: '2026' };

/* 02번 항목만 제거 — 나머지 번호·이미지 매핑은 그대로 유지 */
const idx02 = WORKS.findIndex(w => w.no === '02');
if(idx02 > -1) WORKS.splice(idx02, 1);

/* 추가·교체된 항목까지 포함해 최신 연도가 항상 상위에 오도록 재정렬
   (번호 no·이미지 매핑은 각 객체의 속성이라 정렬해도 그대로 유지됨) */
const yearRank = p => { const i = PORTFOLIO_ORDER.indexOf(p); return i < 0 ? 999 : i; };
WORKS.unshift(
  {name:'숭의여자대학교', service:'AI 콘텐츠 제작', period:'2026', type:'workflow', no:'workflow-01', h:200},
  {name:'동양미래여자대학교', service:'AI 콘텐츠 제작', period:'2026', type:'workflow', no:'workflow-02', h:208}
);
/* 융합 콘텐츠 — AI 게임 (외부 링크 · 새 탭) */
WORKS.unshift({
  name: 'AI게임 NEO-KONGJI',
  period: '2026',
  type: 'fusion',
  service: '생성형 AI로 기획·제작한 인터랙티브 웹 게임',
  url: 'https://heejeong-kim.github.io/NEO-KONGJI/',
  no: 'fusion-01',
  h: 200
});
WORKS.sort((a,b) => yearRank(a.period) - yearRank(b.period));

/* 메인 카드 설명 — service 가 없는 항목에만 사용 (없으면 기본 문구 자동 생성) */
const WORK_DESC = {
  'Group DEMEX AI Chatbot System':'그룹사 문서와 규정을 연결한 사내 AI 상담 챗봇을 구축했습니다.',
  '디지털교과서 표준화 작업 컨설팅':'교과서 콘텐츠 구조와 메타데이터 표준화를 설계했습니다.',
  '에너지관리공단 에너지바우처 업무 포털 컨설팅':'신청·심사·지급 업무 흐름을 진단하고 포털 개선안을 제시했습니다.',
  'Group DEMEX Admin System':'챗봇과 콘텐츠 운영을 위한 통합 관리자 시스템을 구축했습니다.',
  '전국학교급식 데이터전처리시각화':'급식 데이터를 정제하고 지역·학교별 대시보드로 시각화했습니다.',
  'DMEX AI Brochure 제작':'생성형 AI로 서비스 소개 브로슈어를 기획·제작했습니다.',
  'SaaS 플랫폼 시스템 구축':'멀티테넌트 구조의 구독형 서비스 플랫폼을 구축했습니다.',
  'JOYTOWN Responsive Web 2.0 (with Metaverse)':'메타버스와 연동되는 반응형 커뮤니티 플랫폼을 고도화했습니다.'
};
