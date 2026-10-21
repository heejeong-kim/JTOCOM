# NEO-KONGJI 2099 : 깨진 데이터의 그림자 — 인터랙티브 동화 최종 결과 보고서
<table>
<tr><td>**프로젝트명**</td><td>NEO-KONGJI : 깨진 데이터의 그림자</td></tr>
<tr><td>**원작**</td><td>전래동화 「콩쥐팥쥐」</td></tr>
<tr><td>**장르 / 세계관**</td><td>사이버펑크 디스토피아 (2099년 데이터 계급 사회)</td></tr>
<tr><td>**제출자**</td><td>학번 | 이름</td></tr>
<tr><td>**제출일**</td><td>2026년 6월 1일</td></tr>
<tr><td>**최종 동화**</td><td>[NEO-KONGJI 2099 : 깨진 데이터의 그림자 (v1)](https://heejeong-kim.github.io/NEOKONGJI/)<br>[NEO-KONGJI 2099 : 깨진 데이터의 그림자 (v2)](https://heejeong-kim.github.io/NEO-KONGJI/)</td></tr>
</table>
# 1. 프로젝트 개요
## 1-1. 원작 및 컨셉
**원작** : 한국 전래동화 「콩쥐팥쥐」의 사이버펑크 디지털 리텔링
<table header-row="true">
<tr><td>항목</td><td>내용</td></tr>
<tr><td>작품명</td><td>NEO-KONGJI 2099 : 깨진 데이터의 그림자</td></tr>
<tr><td>장르</td><td>사이버펑크 인터랙티브 비주얼 노벨</td></tr>
<tr><td>구현 방식</td><td>HTML/CSS/JavaScript 단일 파일 웹 애플리케이션 (Web Audio API 활용)</td></tr>
<tr><td>배경 세계관</td><td>2099년 디스토피아적 사이버 도시 — 안드로이드와 인간이 공존하는 계층화된 서버 사회, 시스템이 존재를 통제함</td></tr>
<tr><td>핵심 비틀기</td><td>콩쥐팥쥐 고전 설화를 사이버펑크로 재해석 — 콩쥐는 포맷(소거) 위기에 처한 안드로이드, 팥쥐는 시스템의 집행자</td></tr>
<tr><td>핵심 테마</td><td>존재 증명 vs. 시스템 효율 / 기억과 정체성의 가치 / 억압된 자의 저항</td></tr>
<tr><td>화면 구성</td><td>헤더(스탯 표시) + 좌측 씬 이미지 + 우측 대화·선택지 패널 + 커버 스크린</td></tr>
<tr><td>총 씬 수</td><td>9씬 (S1~S6, RE_S3, END_A, END_B, G_OVER)</td></tr>
</table>
---
## 1-2. 활용 도구
<table header-row="true">
<tr><td>단계</td><td>사용 도구</td><td>주요 활용 내용</td></tr>
<tr><td>**기획**</td><td>클로드, 제미나이</td><td>세계관 비틀기, 캐릭터 데이터 시트, 씬별 스크립트 초안 생성. C-S-O 프롬프트 전략 활용.</td></tr>
<tr><td>**이미지**</td><td>나노바나나, 미드저니</td><td>씬별 배경 이미지 및 캐릭터 일러스트 생성. 스타일 키워드·Seed 번호 고정으로 일관성 유지.</td></tr>
<tr><td>**영상**</td><td>Google Veo, 미드저니</td><td>씬별 영상 제작, 음향효과 일부 삽입.</td></tr>
<tr><td>**음향**</td><td>클로드, 브루, 픽사베이</td><td>BGM(사이버펑크 분위기 음악) 및 나레이션 TTS 생성.</td></tr>
<tr><td>**웹 구현**</td><td>제미나이 30% + 클로드 코드 70%</td><td>HTML/CSS/JavaScript 기반 인터랙티브 동화 코드 생성. IF-THEN 조건문 및 변수 관리 로직 구현.</td></tr>
<tr><td>**배포**</td><td>Github</td><td>GitHub Pages를 통한 정적 사이트 배포. 외부 URL로 결과물 공유.</td></tr>
</table>
---
## 1-3. 상세 스토리보드
고막을 찢는 경보음과 붉은 점멸등이 가득한 하층부. 시스템 AI는 안드로이드 콩쥐의 무결성 검증 실패를 선언하며 600초 후 강제 소거를 예고한다. 콩쥐는 16년 치 기억 로그의 포맷을 담담히 받아들이지 않고 저항을 선택한다.
부서진 서버 랙 사이에서 나노두꺼비가 등장해 콩쥐의 인간성 데이터를 분석하며 거래를 제안한다. 자신의 하부 모듈 수리를 대가로 보안 우회 칩을 건네겠다는 것. 콩쥐는 협력하거나 강제로 데이터를 탈취해 앞으로 나아간다.
보랏빛 레이저 격자 앞에 팥쥐의 홀로그램이 나타나 콩쥐를 '오류'로 규정하고 통로를 차단한다. 콩쥐는 자신의 고통과 감각이야말로 실재의 증거라고 외치며 관문을 돌파한다.
기계 외골격을 달고 용접 작업 중이던 선녀가 중추 서버의 관리자 키를 조건부로 제시한다. 조건은 콩쥐의 마지막 '진짜 기억' 데이터. 콩쥐는 기억을 내주고 키를 얻거나, 코어 구역에 직접 난입하는 선택의 기로에 선다. 난입을 택하면 팥쥐와 최후의 충돌을 벌이게 되고, 실패할 경우 글리치 공간에 갇혀 루프하거나 완전한 소거를 맞이한다.
관리자 키를 손에 쥔 콩쥐는 마침내 무중력의 코어 중심부에 도달한다. 원님은 모든 억압이 시스템 유지를 위한 '필연적 연산'이었다고 선언하지만, 이제 판단권은 콩쥐에게 있다. 콩쥐는 세계를 전면 리부트해 초기화하거나, 조작된 낙원의 진실을 전파해 이름 없던 존재들이 자신의 로그를 되찾도록 이끄는 두 가지 결말 중 하나를 선택한다.
---
# 2. 캐릭터 설계
## 2-1. 등장인물 총괄 캐릭터
### 주인공: 콩쥐
**시스템의 모든 상호작용을 시작하는 '데이터 입력(Input) 소스'**
<table header-row="true">
<tr><td>항목</td><td>상세 설정 (Status)</td><td>기획 의도</td></tr>
<tr><td>**① 역할**</td><td>**주인공 (Active Node)**</td><td>플레이어의 선택을 수치화하여 세계관에 전달하는 주체임</td></tr>
<tr><td>**② 시각적 묘사**</td><td>낡은 패치워크 테크웨어, 데이터 잔량 인디케이터, 점멸하는 홀로그램 ID</td><td>초기 결핍 상태를 시각적 기호로 전달하여 몰입감을 부여함</td></tr>
<tr><td>**③ 체크 변수**</td><td>$Sync\_Rate, Integrity, Noise\_Level$</td><td>모든 NPC가 판정의 근거로 삼는 가변적 로그 데이터임</td></tr>
<tr><td>**④ 상호작용 로직**</td><td>선택에 따른 변수 갱신 및 NPC 판정 데이터 송출</td><td>시스템 전체의 연산을 가동시키는 엔진 역할을 수행함</td></tr>
<tr><td>**⑤ 결핍과 목표**</td><td>**결핍:** 로그 부재 / **목표:** 동결 해제 및 탈출</td><td>위험을 감수하고 시스템에 접속해야 하는 논리적 근거를 제공함</td></tr>
</table>
---
### 조력자 1: 나노봇 드론(두꺼비)
**도덕성($Integrity$) 수치를 1차 검증하는 '기초 필터 노드'**
<table header-row="true">
<tr><td>항목</td><td>상세 설정 (Status)</td><td>기획 의도</td></tr>
<tr><td>**① 역할**</td><td>**조력자 (Filter Node)**</td><td>사용자의 도덕적 자격을 검증하여 보상을 제공하는 1차 관문임</td></tr>
<tr><td>**② 시각적 묘사**</td><td>금속 비늘 사이보그 양서류, 냉각수 파이프가 꽂힌 등껍질, 초록 안광</td><td>시스템 유지보수 개체임을 시각화하여 정보 신뢰도를 높임</td></tr>
<tr><td>**③ 체크 변수**</td><td>$Sync\_Rate \ge 30$ AND $Integrity \ge 40$</td><td>기술력과 인간성을 동시에 요구하는 최소 허들을 설정함</td></tr>
<tr><td>**④ 상호작용 로직**</td><td>**IF True:** $Sync +15$ 및 $Noise$ 동결 / **ELSE:** 무시 및 도주</td><td>도덕적 선택에 따른 리스크 관리 보상을 실질적으로 체감하게 함</td></tr>
<tr><td>**⑤ 결핍과 목표**</td><td>**결핍:** 자율 기동성 / **목표:** 시스템 엔트로피 감소</td><td>주인공을 도와 누수를 막으려는 행위에 개연성을 부여함</td></tr>
</table>
---
### 조력자 2: 선녀
**진 엔딩($True\_Ending$) 진입을 결정하는 '핵심 관문 노드'**
<table header-row="true">
<tr><td>항목</td><td>상세 설정 (Status)</td><td>기획 의도</td></tr>
<tr><td>**① 역할**</td><td>**조력자 (Gateway Node)**</td><td>최종 단계 진입을 위한 필수 자원($Admin\_Key$)을 관리함</td></tr>
<tr><td>**② 시각적 묘사**</td><td>기계 날개 작업용 암, 보라색 용접 연기, 오버사이즈 테크웨어 점퍼</td><td>암시장 엔지니어의 정체성을 시각적 상징으로 표현함</td></tr>
<tr><td>**③ 체크 변수**</td><td>$Sync\_Rate \ge 60$ AND $Integrity \ge 50$</td><td>고도의 기술력과 도덕성을 갖춘 완성된 주인공을 검증함</td></tr>
<tr><td>**④ 상호작용 로직**</td><td>**IF $Admin\_Key$ 보유:** 클로킹 슈트 활성화 / **ELSE:** 장비 미완성</td><td>특정 아이템 보유 여부에 따라 서사적 분기를 최종 확정함</td></tr>
<tr><td>**⑤ 결핍과 목표**</td><td>**결핍:** 시스템 권한 / **목표:** 자유로운 데이터 거래</td><td>주인공의 탈출이 자신의 목표와 일치하도록 서사를 설계함</td></tr>
</table>
---
### 적대자 1: 팥쥐
**기술적 숙련도($Sync\_Rate$)를 위협하는 '경쟁형 장애물 노드'**
<table header-row="true">
<tr><td>항목</td><td>상세 설정 (Status)</td><td>기획 의도</td></tr>
<tr><td>**① 역할**</td><td>**적대자 (Obstacle Node)**</td><td>플레이어의 기술적 성장을 방해하고 수치를 타격하는 라이벌임</td></tr>
<tr><td>**② 시각적 묘사**</td><td>유선형 안드로이드 소체, 수만 개의 핑크 레이저 센서, 네온 조명</td><td>감시와 공격에 최적화된 기기임을 보여 위압감을 조성함</td></tr>
<tr><td>**③ 체크 변수**</td><td>$Sync\_Rate$ 대조 연산</td><td>주인공의 현재 능력치가 자신보다 낮은지 실시간 판정함</td></tr>
<tr><td>**④ 상호작용 로직**</td><td>**IF Sync < 80:** 데이터 50% 유실 및 강제 추방 패널티 실행</td><td>기술 수치가 낮은 플레이어에게 즉각적인 책임을 부과함</td></tr>
<tr><td>**⑤ 결핍과 목표**</td><td>**결핍:** 자아 의지 / **목표:** K1의 데이터 흡수 및 제거</td><td>주인공을 제거해야 자신의 지위가 유지되는 대립 구조를 형성함</td></tr>
</table>
---
### 적대자 2: 비련 (계모)
**위험도($Noise\_Level$)를 감시하는 '환경 압박 엔진'**
<table header-row="true">
<tr><td>항목</td><td>상세 설정 (Status)</td><td>기획 의도</td></tr>
<tr><td>**① 역할**</td><td>**적대자 (Security Node)**</td><td>플레이어의 행동 반경을 제한하고 실시간 긴장감을 유발함</td></tr>
<tr><td>**② 시각적 묘사**</td><td>차가운 화이트 슈트, 실버 바이저, 고압적인 레드 림 라이트</td><td>권위와 감시 능력을 시각화하여 은신 플레이를 유도함</td></tr>
<tr><td>**③ 체크 변수**</td><td>$Noise\_Level$ 실시간 모니터링</td><td>활동량이 감시 임계치를 넘었는지 지속적으로 대조함</td></tr>
<tr><td>**④ 상호작용 로직**</td><td>**IF Noise $\ge$ 70:** 정예 보안 유닛 소환 및 물리적 제거 시도</td><td>리스크 관리에 실패한 경우 고난도 전투 세션을 강제함</td></tr>
<tr><td>**⑤ 결핍과 목표**</td><td>**결핍:** 비논리 변수 제어 / **목표:** 완벽한 데이터 독재</td><td>시스템 질서를 위협하는 불확실성(K1)을 제거하려는 동기를 가짐</td></tr>
</table>
---
### 최종 판정자: 원님
**모든 여정의 데이터를 취합하여 결말을 내는 '결과 출력 함수'**
<table header-row="true">
<tr><td>항목</td><td>상세 설정 (Status)</td><td>기획 의도</td></tr>
<tr><td>**① 역할**</td><td>**판정자 (Output Function)**</td><td>서사의 마침표를 찍고 플레이어의 성향을 정의함</td></tr>
<tr><td>**② 시각적 묘사**</td><td>거대한 구체 서버 코어, 수천 개의 모니터 벽면, 순백 공간</td><td>절대적인 연산 장치로서의 권위를 시각적으로 구현함</td></tr>
<tr><td>**③ 체크 변수**</td><td>$\sum(Sync, Integrity, Admin\_Key)$</td><td>게임 전체의 누적 로그 데이터를 최종 합산하여 대조함</td></tr>
<tr><td>**④ 상호작용 로직**</td><td>변수 합산 결과에 따른 엔딩 데이터 패킷 출력</td><td>수치 결과에 따른 논리적이고 객관적인 결말을 제공함</td></tr>
<tr><td>**⑤ 결핍과 목표**</td><td>**결핍:** 자율 의지 / **목표:** 최적 결과 도출 및 질서 유지</td><td>플레이어가 만든 결과값을 가장 투명하게 투영하는 거울임</td></tr>
</table>
---
## 2-2. 주요 변수
<table header-row="true">
<tr><td>변수</td><td>설명</td><td>초기값</td><td>핵심 임계값</td></tr>
<tr><td>**SYNC**</td><td>시스템 동기화 수치 (해킹·우회 역량)</td><td>0</td><td>≥50 : S5 팥쥐 취약점 노출</td></tr>
<tr><td>**INTEG**</td><td>데이터 무결성 수치 (신뢰·협력 역량)</td><td>0</td><td>≥40 : S4 선녀 신뢰 루트 활성</td></tr>
<tr><td>**NOISE**</td><td>감시 노이즈 수치 (추적 위험도)</td><td>0</td><td>≥30 : S4 경계 / ≥40 : S6 살수 배치</td></tr>
<tr><td>**ADMIN_KEY**</td><td>코어 접근 권한 키 (Boolean)</td><td>FALSE</td><td>TRUE여야 S6 진입 가능</td></tr>
</table>
---
## 2-3. 플로우 차트
<flowmap></flowmap>
### Phase 1. 기(起): 강제 소거 카운트다운
- **S1. 언로깅 하층부**
  - 상황: 무결성 검증 실패, 포맷까지 600초. 시스템 접속 방식 선택
  - **[A] 방화벽 강제 우회:** Sync +20, Noise +10
  - **[B] 신호 위장 잠입:** Integ +20, Noise -5
---
### Phase 2. 승(承): 균열된 서버
- **S2. 서버 균열 (나노두꺼비 조우)**
  - 상황: 비대한 기계 팔을 가진 나노두꺼비가 협력 거래 제안
  - **두꺼비 협력 여부 선택**
    - **[A] 모듈 수리 협력:** Integ +20, helpedToad = True (S3 이후 난이도 하락)
    - **[B] 데이터 강제 탈취:** Sync +20, Noise +5, helpedToad = False (S3 난이도 상승)
---
### Phase 3. 전(轉): 네트워크 정글
- **S3. 보안문 (팥쥐 충돌)**
  - 상황: 팥쥐 홀로그램이 통로 차단. 콩쥐를 '오류'로 규정
  - **돌파 방식 선택**
    - **[A] 관리자 뇌물 매수:** Integ -20, Noise -10
    - **[B] 제어권 직접 해킹:** Sync +15, Noise +15
- **S4. 선녀의 방 (권한 확보 분기)**
  - 상황: 선녀가 관리자 키를 조건부 제안 — 마지막 기억 데이터 요구
  - **[A] 기억 데이터 거래:** Integ -10, Admin_Key = True → S6 직행
  - **[B] 코어 구역 난입:** Noise +10 → S5 충돌 루트 진입
---
### Phase 4. 결(結): 코어 침투
- **S5. 데이터 강탈 (팥쥐 최종 충돌)**
  - 상황: 팥쥐가 데이터 캐논으로 최후통첩
  - **[A] 사슬 절단 성공:** Sync +20, Admin_Key = True → S6 진입
  - **[B] 집행 시퀀스 오류:** → RE_S3 루프 공간 강제 이동
- **RE_S3. 글리치 공간 (루프 패널티)**
  - 상황: 시스템 붕괴, 과거 잔상 루프 반복
  - **[A] 백업 로그 로드:** Noise +10 → S3 회귀
  - **[B] 로그 포맷 수용:** → G_OVER (Bad End)
- **S6. 코어의 심장 (최종 접속)**
  - 게이트: Admin_Key == True 필수
  - Admin_Key == False 시 → 즉시 포맷, Bad End
  - Admin_Key == True 시 → 원님 대면, 최종 선택 진행
---
### Phase 5. 멀티 엔딩
1. **혁명가 엔딩 (END_A):** 시스템 전면 리부트. 세계를 초기화하고 새로운 질서의 Root가 됨
2. **인도주의자 엔딩 (END_B):** 진실 전파 선언. 조작된 낙원의 장막이 걷히고 이름 없던 존재들이 자신의 로그를 되찾음
3. **포맷 엔딩 (G_OVER):** 루프 탈출 포기 또는 강탈 실패. "당신은 애초에 존재하지 않았습니다"
---
# 3. 씬별 스크립트 및 에셋 산출물
## 3-1. 씬별 스크립트
### Phase 1: 발산 및 빌드업 (기: 시스템 부팅 및 균열)
<table header-row="true">
<tr><td>장면 ID</td><td>배경 및 연출</td><td>판정 로직 (Condition)</td><td>대사 및 지문</td><td>선택지 및 변수 변화 (Action)</td><td>이동 ID</td></tr>
<tr><td>**S1**</td><td>**언로깅 하층부**<br>증기 속 붉은 점멸.<br>[STATUS: FROZEN]</td><td>**게임 시작**<br>포맷까지 10분 남음</td><td>**시스템 AI:** "알린다. 사용자 '콩쥐'의 무결성 검증이 실패되었다. 600초 후 가용 메모리 풀 확보를 위한 강제 소거가 시작된다."<br>**콩쥐:** "가용 메모리 확보? 내 16년 치 기억 로그를 통째로 포맷하는 걸 참 우아하게도 말하는군"<br>**시스템 AI:** "시스템에 기록되지 않은 데이터는 물리적 점유일 뿐이다. 당신의 소멸은 논리적으로 타당하다."<br>**콩쥐:** "그 논리, 오늘 내가 박살 내줄게. 10분이면 이 썩은 서버를 뒤집어엎고도 남는 시간이야."</td><td>**[A] 방화벽 강제 우회** (SYNC+20, NOISE+10)<br>**[B] 신호 위장 잠입** (INTEG+20, NOISE-5)</td><td>**S2**</td></tr>
<tr><td>**S2**</td><td>**서버 균열**<br>균열된 로컬 서버.<br>나노두꺼비 등장.</td><td>**조건 없음**<br>(항상 진입)</td><td>**나노두꺼비:** "안드로이드 주제에 고스트를 품고 있다니, 기괴한 구경거리야."<br>**콩쥐:** "구경 값은 나중에 청구해. 당장 보안 우회 칩이나 내놔."</td><td>**[A] 모듈 수리 협력** (INTEG+20, helpedToad=true)<br>**[B] 데이터 강제 탈취** (SYNC+20, NOISE+5)</td><td>**S3**</td></tr>
<tr><td>**S3**</td><td>**보안문**<br>팥쥐의 레이저 격자.<br>붉은 선 = 포맷 명령.</td><td>**조건 없음**<br>(helpedToad 플래그 보유만, 실제 분기 미구현)</td><td>**팥쥐:** "언니라는 '오류'는 여기서 수정되어야 해요. 포맷까지 5초."<br>**콩쥐:** "넌 살인을 그렇게 배우던가? 비켜, 난 여기 살아있으니까!"</td><td>**[A] 관리자 뇌물 매수** (INTEG-20, NOISE-10)<br>**[B] 제어권 직접 해킹** (SYNC+15, NOISE+15)</td><td>**S4**</td></tr>
</table>
### Phase 2: 핵심 관문 수렴 (승/전: 권한 확보 및 충돌)
<table header-row="true">
<tr><td>장면 ID</td><td>배경 및 연출</td><td>판정 로직 (Condition)</td><td>대사 및 지문</td><td>선택지 및 변수 변화 (Action)</td><td>이동 ID</td></tr>
<tr><td>**S4**</td><td>**선녀의 방**<br>보랏빛 용접 연기.<br>암시장 엔지니어 거처.</td><td>**조건 없음**<br>(선택지 항상 표시)</td><td>**선녀:** "시스템의 심장을 쥐고 죽겠다고? 대가는 네 마지막 '진짜 기억'이다."<br>**콩쥐:** "껍데기만 남더라도 상관없어. 이 조작된 세계의 끝을 볼 수만 있다면."</td><td>**[A] 기억 데이터 거래** (ADMIN_KEY=true, INTEG-10)<br>**[B] 코어 구역 난입** (NOISE+10)</td><td>**[A]→S6**<br>**[B]→S5**</td></tr>
<tr><td>**S5**</td><td>**데이터 강탈**<br>코어 앞 교전지.<br>팥쥐의 무기화.</td><td>**조건 없음**<br>(항상 진입)</td><td>**팥쥐:** "최종 명령입니다. 프로세스를 정지하세요. 저항은 자원 낭비입니다."<br>**콩쥐:** "넌 네 의지로 '의미'를 정의해 본 적이 있나? 그 사슬을 끊어주지."</td><td>**[A] 사슬 절단 성공** (SYNC+20, ADMIN_KEY=true)<br>**[B] 집행 시퀀스 오류** (변수 변화 없음)</td><td>**[A]→S6**<br>**[B]→RE_S3**</td></tr>
<tr><td>**RE_S3**</td><td>**시스템 복구**<br>글리치 효과 발생.<br>회색조 루프 공간.</td><td>**S5 [B] 선택 시**<br>강제 이벤트 발생</td><td>**시스템:** "치명적 오류 발생. 백업 지점에서 재구성하시겠습니까? 반복된 복구는 영혼의 마모를 초래합니다."</td><td>**[A] 백업 로그 로드** (NOISE+10, S3 회귀)<br>**[B] 로그 포맷 수용** (변수 변화 없음)</td><td>**[A]→S3**<br>**[B]→G_OVER**</td></tr>
</table>
### Phase 3: 최종 관문 및 엔딩 (결: 최종 판결)
<table header-row="true">
<tr><td>장면 ID</td><td>배경 및 연출</td><td>판정 로직 (Condition)</td><td>대사 및 지문</td><td>선택지 및 변수 변화 (Action)</td><td>이동 ID</td></tr>
<tr><td>**S6**</td><td>**코어의 심장**<br>원님의 부유 구체.<br>무채색 공간.</td><td>**ADMIN_KEY == true 필수**<br>(false 시 진입 불가 → G_OVER)<br>스탯 우세 판정 없음, 선택지 둘 다 표시</td><td>**원님:** "네가 본 억압은 연산을 위한 필연이었다. 이제 판결은 네 몫이다."<br>**콩쥐:** "끝까지 오만한 태도군. 이제 내가 네 시뮬레이션 밖으로 나갈 차례다."</td><td>**[A] 시스템 전면 리부트**<br>**[B] 진실 전파 선언**</td><td>**[A]→END_A**<br>**[B]→END_B**</td></tr>
</table>
### Phase 4: 멀티 엔딩 (Ending Branches)
- **END_A [혁명가]:**
  - **조건:** ADMIN_KEY == true + [A] 선택
  - **지문:** [SYSTEM LOG: 콩쥐라는 유령이 이곳을 다녀감] 모든 것이 초기화되나 깊은 곳에 흔적이 남음
- **END_B [인도주의자]:**
  - **조건:** ADMIN_KEY == true + [B] 선택
  - **지문:** 이름 없던 존재들이 자신의 로그를 되찾고, 조작된 낙원의 장막이 걷힌다
- **G_OVER [포맷 완료]:**
  - **조건:** RE_S3에서 [B] 선택
  - **지문:** [FORMAT COMPLETE: 당신은 애초에 존재하지 않았습니다] 콩쥐의 소멸
---
## 3-2. 레이아웃(html) 제작 프롬프트
<span color="gray">(상세 설명과 레이아웃, 핵심 기능이 명기되면 됨 - 하단은 샘플임)</span>
>
  너는 유능한 웹 게임 개발자이자 **인터렉티브 스토리텔링 전문가야.**<br>내가 제공하는 [[NEO-KONGJI 2099] 시나리오(씬별 스크립트)+플로우차트]를 바탕으로, 사용자의 선택에 따라 스토리가 분기되는 텍스트 어드벤처 웹 게임을 제작해줘.
  요구사항 :<br>사이버펑크 인터랙티브 비주얼 노벨 웹 애플리케이션을 단일 HTML 파일로 만들어줘.<br>외부 라이브러리 없이 순수 HTML/CSS/JavaScript만 사용하고,<br>Web Audio API로 모든 효과음을 코드로 직접 생성해야 해 (mp3 파일 없이).
  UI 스타일:
  - 배경: 완전한 검정(#0A0A0A), 전체 화면 고정, 스크롤 없음
  - 컬러 팔레트: 네온 레드(#FF2A00), 네온 오렌지(#FF7F00), 일렉트릭 퍼플(#BC13FE), 톡식 그린(#00FF88), 사이버 옐로우(#FFEA00)
  - 폰트: Google Fonts에서 Orbitron(타이틀/UI), IBM Plex Sans KR(본문), Share Tech Mono(모노스페이스 정보) 사용
  - 커서: 전체 crosshair 커서
  레이아웃:
  - 헤더(60px 고정) + 메인 2단 그리드(좌 8fr : 우 2.2fr)
  - 헤더: 좌측 작품 타이틀 / 중앙 SYNC·INTEG·NOISE 스탯 바 / 우측 ADMIN_KEY 표시
  - 좌측: 씬 이미지 (object-fit: cover, ken-burns 애니메이션 적용)
  - 우측: 씬 정보 태그 + 내러티브 텍스트 + 타이핑 대화창 + 선택지 버튼 + BACK/STOP 네비
  - 커버 스크린: 전체화면 오버레이, 배경 이미지(source/cover.png), 타이틀·부제·설명·스탯·시작 버튼
  핵심 기능 구현:
  1. 타이핑 애니메이션
    - 화자 이름 먼저 타이핑 → 이후 대사 타이핑
    - 화자별 타이핑 효과음 다르게 설정 (Web Audio API sine/square/sawtooth/triangle)
    - 매 2글자마다 효과음 재생, 미세한 피치 랜덤성 적용
    - charDelay 속성으로 대사별 타이핑 속도 조절 가능
  2. 씬 이미지 전환
    - 대사마다 sceneImage 속성으로 이미지 교체 가능
    - 전환 시 검정 오버레이 페이드(0.45s) 후 이미지 교체
    - 씬 진입 시 scene-flash-in 애니메이션 → ken-burns 루프로 전환
  3. 씬 인트로 내러티브 오버레이
    - 씬 진입 시 블러 오버레이 전체화면으로 내러티브 텍스트 타이핑
    - 완료 후 1.8초 유지 → 페이드아웃 → 대화 시작
  4. 스탯 시스템
    - sync, integ, noise 3종, 초기값 0
    - 선택지 클릭 시 스탯 즉시 반영 + 수치 펄스 애니메이션 + 팝업(+N/-N) 표시
    - adminKey boolean 상태값 별도 관리
  5. 선택지 UI
    - A타입(보라색 라벨) / B타입(노란색 라벨) 구분
    - 나타날 때 오른쪽에서 슬라이드인 애니메이션 (stagger 0.12s)
    - cond 함수로 조건부 선택지 표시 가능
  6. 히스토리 & BACK
    - 선택 전 state를 history 배열에 push
    - BACK 버튼 클릭 시 이전 state로 복원
  7. STOP/PLAY 토글
    - STOP: 타이핑 일시정지 + 음성 정지
    - PLAY: 이어서 타이핑 재개
  8. 앰비언스 사운드
    - 커버 화면: 베이스 드론 + 디지털 패드 + 고주파 shimmer + LFO 변조 + 글리치 펄스 + 서브 펄스 레이어드 앰비언스
    - 경보음: 사이렌 스윕 + 삐 펄스 + 저주파 울림 동시 재생, 씬 전체 지속, 음성 재생 시 덕킹(0.18배)
  씬 구성 (총 9씬):<br>S1(언로깅 하층부) → S2(서버 균열) → S3(보안문) → S4(선녀의 방)<br>S4에서 분기: S5(데이터 강탈) 또는 S6(코어의 심장) 직행<br>S5 실패 시 → RE_S3(글리치 공간) → S3 회귀 or G_OVER<br>S6 → END_A(혁명가) or END_B(인도주의자)
---
## 3-3. 이미지 제작 프롬프트
<table header-row="true">
<tr><td>장면 ID</td><td>등장인물</td><td>비주얼 설명 (한글)</td><td>이미지 생성 프롬프트 (English)</td></tr>
<tr><td>**표지**</td><td>콩쥐, 팥쥐, 비련, 나노드론, 선녀, 원님</td><td>[NEO-KONGJI 2099]를 위한 하이엔드 시네마틱 사이버펑크 포스터. 전경에는 풍화된 청록색 한복 후드와 고글을 착용하고 저항심에 찬 초록색 눈을 빛내는 콩쥐(콩쥐.png 참조)의 거대하고 상세한 클로즈업이 배치됨. 배경에는 디지털 기억의 태피스트리처럼 여러 주요 인물들이 고해상도 홀로그램 투영으로 나타남: 날카로운 화이트 수트를 입은 차가운 기업 악당 비련(비련.png 참조)이 승리를 자축하며 거만하게 웃고 있는 팥쥐(팥쥐.png 참조) 옆에 서 있음. 깜빡이는 글리치 모서리에는 빛나는 홀로그램 한복을 입은 비극적인 선녀(선녀.png 참조)가 슬픈 표정으로 손을 뻗고 있음. 멀리서 원님(원님.png 참조)의 어둡고 흐릿한 형체가 어렴풋이 나타남. 녹슬고 부서진 나노드론(나노드론.png 참조)의 파편들이 코드 조각처럼 공중에 떠다님. 배경은 "// Kongji was here"라는 네온 블루 낙서가 적힌 어두운 금속 서버 복도임. 극적인 조명, 거친 필름 그레인, 8k 해상도, 시네마틱한 구성. --ar 16:9</td><td>`A high-end cinematic cyberpunk poster for "NEO-KONGJI 2099". In the foreground, a large, detailed close-up of NEO-KONGJI (referencing 콩쥐.png), wearing her weathered teal hanbok-hoodie and goggles, her green eyes glowing with defiance. Overlapping the background like a digital memory tapestry, several key figures appear as high-resolution holographic projections: The cold, corporate villain BARYEON (referencing 비련.png) in her sharp white suit stands next to the smug, laughing PATJI (referencing 팥쥐.png), celebrating their victory. In a flickering, glitchy corner, a tragic SEONNYEO (referencing 선녀.png) in a glowing holographic hanbok reaches out with a sad expression. A shadowy, blurred figure of the WONNIM (referencing 원님.png) looms in the distance. Broken fragments of a rusted NANO-TOAD drone (referencing 나노드론.png) drift through the air like code-debris. The setting is a dark, metallic server corridor with neon blue graffiti reading "// Kongji was here". Dramatic lighting, heavy film grain, 8k resolution, cinematic composition. --ar 16:9`</td></tr>
<tr><td>**S1**</td><td>콩쥐, 시스템 AI</td><td>차가운 수증기가 가득한 냉동 캡슐 속의 **콩쥐.png**. 피부 아래 푸른 회로가 점멸하며, 주변에 붉은색 'T-Minus 10:00' 경고 홀로그램이 떠 있음</td><td>`Hyper-realistic cyberpunk female android Kongji (referencing 콩쥐.png) with blue circuit lines glowing under her skin, trapped inside a frost-covered translucent cryo-chamber, red holographic warning screens "T-Minus 10:00" floating, thick ice vapor, volumetric red and blue lighting, 8k, --ar 1380:950`</td></tr>
<tr><td>**S2**</td><td>콩쥐, 나노두꺼비</td><td>어두운 서버 미로에서 **콩쥐.png**가 **나노드론.png**를 손에 든 모습. 바닥의 균열에서 푸른 데이터가 새어 나오며 두꺼비의 눈은 초록색으로 빛남</td><td>`Kongji (referencing 콩쥐.png) crouching in a dark server maze, holding a small rusty mechanical Nano-Toad (referencing 나노드론.png) with large glowing emerald-green lens eyes, floor cracked with leaking electric blue data streams, detailed metallic textures, neon reflections, 8k, --ar 1380:950`</td></tr>
<tr><td>**S3**</td><td>콩쥐, 팥쥐, 비련</td><td>거대한 **비련.png** 로고와 얼굴 홀로그램이 배경을 압도함. 그 앞의 **팥쥐.png**는 오만한 표정이며, 붉은 레이저 격자가 **콩쥐.png**의 길을 막음</td><td>`Kongji (referencing 콩쥐.png) facing a massive security gate, background dominated by a colossal, semi-transparent white hologram of Mega-Corp Baryeon (referencing 비련.png), sleek purple AI Patji (referencing 팥쥐.png) standing in front with a cold expression, red laser grids, cinematic neon noir, --ar 1380:950`</td></tr>
<tr><td>**S4**</td><td>콩쥐, 선녀</td><td>짙은 연기와 보랏빛 스파크가 튀는 작업실. 하이테크 한복을 입은 **사이버선녀.png**가 기계 손을 **콩쥐.png**의 가슴 코어로 뻗고 있음. 작업대 위 Admin_Key가 보랏빛으로 빛남</td><td>`Cinematic cyberpunk workshop, heavy smoke and purple welding sparks. A young, ethereal Cyber-Seonnyeo (referencing 사이버선녀.png), wearing a glowing white high-tech Hanbok, is reaching her delicate mechanical hand toward Kongji's (referencing 콩쥐.png) chest core. On the workbench, a vibrant Admin_Key chip glows purple. Moody lighting, 8k, --ar 1380:950`</td></tr>
<tr><td>**S5**</td><td>콩쥐, 팥쥐, 비련</td><td>공중에 **비련.png**의 감시용 홀로그램 눈들이 떠 있고, **팥쥐.png**와 **콩쥐.png**가 격렬하게 교전함. 팥쥐 뒤로 기업의 거대한 유령 형상이 일렁임</td><td>`Intense battle scene, Kongji (referencing 콩쥐.png) with a blue shield against armored Patji (referencing 팥쥐.png), the sky filled with giant floating holographic eyes of Baryeon (referencing 비련.png), a massive ghostly projection of the corporate entity looming behind Patji, red beams, glitch effects, --ar 1380:950`</td></tr>
<tr><td>**RE_S3**</td><td>콩쥐</td><td>모든 색이 사라진 무채색 공간. **콩쥐.png**가 무릎을 꿇은 채 픽셀 단위로 분해되며 붕괴함. 심한 노이즈와 글리치 효과</td><td>`Monochrome glitch art, Kongji (referencing 콩쥐.png) kneeling in a colorless digital void, her body dissolving into grey pixels and data fragments, severe screen distortion, static noise, sense of despair, cinematic wide shot, --ar 1380:950`</td></tr>
<tr><td>**S6**</td><td>콩쥐, 원님</td><td>신성하고 기계적인 분위기가 감도는 거대한 무채색 구체형 공간 내부. 검은 갓을 쓰고 청록색으로 빛나는 데이터 로그와 구름 문양이 새겨진 하이테크 한복을 입은 고위 시스템 관리자 원님(원님.png 참조)이 위엄 있게 서 있음. 그는 복잡한 코드가 담긴 디지털 부채를 들고 있음. 압도적인 존재감을 가진 원님 앞에 아주 작게 보이는 콩쥐(콩쥐_10.png 참조)가 서 있음. 극적인 스케일감, 시네마틱 조명, 하이퍼 리얼리틱 질감, 8k, --ar 1380:950</td><td>`Inside a massive colorless spherical chamber with a divine mechanical atmosphere. The high-ranking system administrator Won-nim (referencing 원님.png), a tall man wearing a black traditional Gat hat and a dark high-tech Hanbok with glowing teal data logs and cloud patterns etched on the fabric, stands majestically. He is holding a digital fan with complex code. Tiny Kongji (referencing 콩쥐_10.png) stands before his overwhelming presence. Extreme sense of scale, cinematic lighting, hyper-realistic textures, 8k, --ar 1380:950`</td></tr>
<tr><td>**END_A**</td><td>콩쥐, 팥쥐, 비련, 나노드론, 선녀</td><td>어둡고 조용한 금속제 서버 복도 내부에 오버레이된 멜랑콜리한 사이버펑크 기억의 태피스트리. 벽면은 깜빡이는 작은 네온 블루 텍스트가 지배적임: "// Kongji was here". 이 텍스트가 초점이 됨. 그 주변을 손상된 아카이브에서 나온 디지털 유령처럼 주요 사건의 반투명하고 왜곡된 홀로그램 파편들이 떠다님: 거대한 기업 메가-코프 로고 'Baryeon (비련.png 참조)'의 승리하는 역동적인 프로젝션, 그리고 스크린을 향해 승리감에 도취되어 웃고 있는 거만하고 냉정한 얼굴의 'Patji (팥쥐.png 참조)'. 그 아래로, 'Kongji (콩쥐.png 참조)'를 향해 뻗고 있는 슬픈 표정의 어린 'Seonnyeo (선녀.png 참조)'의 분해되고 깜빡이는 이미지. 녹슨 'Nano-Toad (나노드론.png 참조)'의 부서진 파편들이 떠다님. 한국어와 영어 텍스트 (예: "// MEMORY FAULT: CORE_DELETE" 및 "사라진 연대기"). 얕은 피사계 심도, 메인 텍스트와 근접 프로젝션에 초점을 맞춤. 거친 필름 그레인, 극적이고 압도적인 사이버펑크 조명, 외롭지만 저항적인 분위기, 8k, --ar 1380:950</td><td>`A melancholic cyberpunk memory tapestry overlaid within a dark, silent metallic server corridor. The wall is dominated by the flickering, small neon blue text: "// Kongji was here". This text acts as a focal point. Floating around it, like digital ghosts from a corrupted archive, are semi-transparent, distorted holographic fragments of key events: a dynamic projection shows the corporate Mega-Corp logo 'Baryeon (referencing 비련.png)' triumphant, with the smug, cold-faced 'Patji (referencing 팥쥐.png)' laughing in victory at the screen. Below them, a dissolving, flickering image of a younger 'Seonnyeo (referencing 선녀.png)' with a sad expression reaching towards 'Kongji (referencing 콩쥐.png)'. Scattered, broken fragments of a rusty 'Nano-Toad (referencing 나노드론.png)' drift by. Text in both Korean and English (e.g., "// MEMORY FAULT: CORE_DELETE" and "사라진 연대기"). Shallow depth of field, focused on the main text and the close-up projections. Heavy film grain, dramatic and oppressive cyberpunk lighting, lonely yet defiant atmosphere, 8k, --ar 1380:950`</td></tr>
<tr><td>**END_B**</td><td>군중 안드로이드</td><td>인간과 안드로이드가 조화롭게 어우러진 희망적인 사이버펑크 도시의 엔딩 장면. 안드로이드들은 선명하게 빛나는 초록색 눈을 가지고 있으며, 인간과 안드로이드 모두 각자의 머리 위로 이름이 적힌 부드러운 초록색 홀로그램 로그가 떠 있음. 따뜻한 황금빛 햇살과 초록색 네온 조명이 미래적인 건축물을 감싸며 평화롭고 축제 같은 분위기를 연출함. 공유된 자유와 평등, 그리고 정체성에 대한 강렬한 감각. 8k, 하이퍼 리얼리틱, 시네마틱 와이드 샷, --ar 1380:950</td><td>`Hopeful cyberpunk city ending scene where a diverse crowd of humans and androids are mingling together in harmony. The androids have vibrant glowing green eyes, and every individual, both human and android, has their own name displayed on a soft green holographic log floating above their heads. Warm golden sunlight and green neon lights bathe the futuristic architecture, creating a peaceful and celebratory atmosphere. A powerful sense of shared freedom, equality, and identity. 8k, hyper-realistic, cinematic wide shot, --ar 1380:950`</td></tr>
<tr><td>**G_OVER**</td><td>(메시지)</td><td>완전한 암전 속에서 한국 전통 꽃신(Kkot-sin)의 희미하고 무너져 내리는 디지털 윤곽이 회색 픽셀로 분해되며 사라지는 모습. 중앙에는 글리치 효과가 들어간 회색 픽셀 글씨로 "[NEO-KONGJI 2099:깨진 데이터의 그림자]"라는 문구가 나타남. 문구 뒤편으로 전래 동화 속 부서진 사립문의 형상이 정전기 노이즈와 함께 유령처럼 왜곡된 데이터 로그 이미지로 깜빡임. 미니멀하면서도 잊히지 않는 잔혹한 분위기, 떨어지는 꽃잎처럼 흩날리는 데이터 파편들, 거친 필름 그레인 질감, 시네마틱한 허무함, 8k, --ar 1380:950</td><td>`Complete pitch black darkness with a faint, crumbling digital outline of a traditional Korean flower shoes (Kkot-sin) dissolving into grey pixels. In the center, a glitchy grey pixel text reads "[NEO-KONGJI 2099:깨진 데이터의 그림자]". Behind the text, a ghostly, distorted data-log image of a broken wooden gate from a folk tale flickers with static noise. Minimalistic yet haunting atmosphere, scattered data fragments like falling petals, heavy film grain, cinematic emptiness, 8k, --ar 1380:950`</td></tr>
</table>
---
## 3-4. 영상 제작 프롬프트
<table header-row="true">
<tr><td>장면 ID</td><td>등장인물</td><td>주요 연출 및 카메라 워크 (Flow 한글 프롬프트)</td><td>영상 연출 및 음악 스타일 (Flow English Prompt)</td></tr>
<tr><td>**표지**</td><td>콩쥐, 비련, 팥쥐, 선녀</td><td>**[인트로]** 콩쥐의 클로즈업된 초록색 눈동자 속으로 카메라가 빨려 들어가는 **매크로 줌인**. 배경의 비련, 팥쥐, 선녀 홀로그램이 거친 노이즈와 함께 격렬하게 점멸하며 화면 전체가 디지털 글리치로 요동침.</td><td>`[Intro] Extreme macro zoom-in into Kongji's glowing emerald pupil. Background holograms of Baryeon, Patji, and Seonnyeo flicker violently with heavy digital noise and glitch artifacts. SFX: Distorted synth bass drop, sharp electrical buzzing, and rhythmic static pulse.`</td></tr>
<tr><td>**S1**</td><td>콩쥐</td><td>냉동 캡슐 내부의 성에가 낀 유리창 너머로 콩쥐가 고통스럽게 눈을 뜸. 휘몰아치는 흰 수증기 사이로 그녀의 목과 얼굴에 새겨진 **푸른 회로가 심장 박동에 맞춰 강렬하게 점멸**. 빨간색 'SYSTEM FAILURE' 경고창들이 카메라 시야를 가로지르며 빠르게 스쳐 지나감.</td><td>`Kongji opens her eyes in agony behind a frosted glass. Thick ice vapor swirls as blue bio-circuits on her face and neck pulse intensely in sync with a heartbeat. Red "SYSTEM FAILURE" holograms fly past the camera at high speed. SFX: Hissing steam release, rhythmic digital heart thumping, and high-pitched emergency alarms.`</td></tr>
<tr><td>**S2**</td><td>콩쥐, 나노드론</td><td>콩쥐가 손을 뻗어 나노드론을 터치하자, 드론이 금속 마찰음을 내며 회전하고 공중으로 급부상함. 드론의 눈에서 뿜어져 나오는 **초록색 레이저가 어두운 복도를 스캔**하고, 바닥의 깨진 타일 사이로 눈부신 푸른 데이터 스트림이 폭포처럼 쏟아져 나옴.</td><td>`Kongji touches the Nano-Toad; it rotates with metallic friction and ascends sharply. Emerald lasers from the drone's eyes scan the dark corridor. Radiant blue data streams erupt from floor cracks like a digital waterfall. SFX: Mechanical whirring, laser scanning pings, and the rushing sound of flowing liquid data.`</td></tr>
<tr><td>**S3**</td><td>콩쥐, 비련, 팥쥐</td><td>카메라가 바닥에서 위로 **로우 앵글 패닝**. 거대한 비련의 홀로그램이 콩쥐를 짓누르듯 내려다보고, 팥쥐가 거만하게 팔짱을 낀 채 차가운 비웃음을 지음. 붉은 레이저 격자가 사방에서 나타나 콩쥐를 가두며 입체적으로 움직임.</td><td>`Low-angle panning shot. Massive Baryeon hologram looms over Kongji like a god. Patji stands with arms crossed, wearing a cold, static smirk. Red laser grids materialize and intersect dynamically to imprison Kongji. SFX: Low-frequency atmospheric hum, heavy industrial stomps, and the sharp "tz-zt" of laser activation.`</td></tr>
<tr><td>**S4**</td><td>콩쥐, 선녀</td><td>선녀의 정교한 기계 손가락이 콩쥐의 가슴 코어에 닿는 순간, **보랏빛 충격파가 원형으로 퍼져나감**. 주변의 연기와 파편들이 중력을 잃고 느리게 떠오르며, 선녀의 홀로그램 한복 자수가 데이터 입자로 변해 공중에 비산함.</td><td>`Mechanical fingers touch the chest core, triggering a radial purple shockwave. Smoke and debris float upward in slow-motion gravity. Embroidery on Seonnyeo's hanbok dissolves into floating data particles. SFX: A deep "thump" followed by ethereal, soaring vocaloid echoes and crystalline chiming.`</td></tr>
<tr><td>**S5**</td><td>콩쥐, 팥쥐, 비련</td><td>**[하이라이트]** 콩쥐의 푸른 데이터 검과 팥쥐의 붉은 레이저 채찍이 충돌하며 화면에 강렬한 스파크가 튐. 카메라가 전투의 주변을 **360도 회전(Orbit Shot)**하며, 비련의 거대한 홀로그램 눈들이 하늘에서 이들을 감시함.</td><td>`[Highlight] Intense melee combat. Kongji's blue data sword clashes with Patji's red laser whip, creating blinding sparks. 360-degree orbit camera. Giant holographic eyes of Baryeon monitor from the sky. SFX: High-octane cyberpunk breakbeat, clashing metal, and crackling energy explosions.`</td></tr>
<tr><td>**RE_S3**</td><td>콩쥐</td><td>콩쥐의 몸이 뒤로 밀려나며 무릎을 꿇음. 그녀의 형체가 수천 개의 회색 픽셀로 찢겨 나가며 공중으로 분해됨. 화면 전체에 **극심한 수직 글리치와 흑백 노이즈**가 발생하며 시각 정보가 붕괴됨.</td><td>`Kongji gets pushed back and kneels. Her form tears apart into thousands of grey pixels, dissolving upward. Severe vertical glitching and monochrome static noise overwhelm the frame. SFX: Sudden audio dropout followed by a distorted, fading digital scream and white noise.`</td></tr>
<tr><td>**S6**</td><td>원님, 콩쥐</td><td>원님의 초거대 갓과 형형하게 빛나는 눈을 클로즈업한 후, 카메라가 초고속 **돌리 줌(Dolly Zoom)**으로 후퇴하며 공간의 압도적인 스케일을 보여줌. 원님이 부채를 강하게 펼치자 복잡한 코드 문자들이 거대한 데이터 용의 형상이 되어 화면을 가로질러 쏟아짐. 이때 콩쥐는 날아오는 코드의 파도에 맞서 청록색 잔상을 남기며 좌우로 **고속 대시(Dash)**하고, 용의 머리를 피해 공중으로 높이 도약하며 데이터 검을 휘두름.</td><td>`Extreme Close-up of Won-nim's eyes, followed by a high-speed Dolly Zoom to reveal the immense scale of the chamber. Won-nim snaps his digital fan open, releasing a colossal data-dragon made of complex code that surges across the screen. Kongji reacts with high-speed dashes, leaving teal afterimages, then leaps high into the air to dodge the dragon's maw while unsheathing her data-sword. SFX: Thundering traditional drums (Buk), deep electronic bass drops, and the digital "roar" of the data dragon.`</td></tr>
<tr><td>**END_A**</td><td>나노드론</td><td>폐허가 된 서버실 벽면에서 "// Kongji was here" 네온 문구가 깜빡이며 서서히 꺼져감. 부서진 나노드론 조각들이 무중력 상태로 카메라 앞을 가로지르며 **슬로우 모션으로 부유**함.</td><td>`"// Kongji was here" neon text flickers and fades on a ruined server wall. Broken fragments of the Nano-Toad drift past the lens in zero-gravity slow motion. SFX: Melancholic, lonely piano notes, faint wind howling through metal, and lo-fi tape hiss.`</td></tr>
<tr><td>**END_B**</td><td>안드로이드 군중</td><td>**[희망]** 암흑을 뚫고 눈부신 황금빛 데이터 햇살이 쏟아짐. 안드로이드 군중들이 고개를 들어 하늘을 보고, 그들의 초록색 눈이 일제히 빛나며 환희에 찬 함성을 지름. 도시 전체가 초록색 네온으로 재부팅됨.</td><td>`[Hopeful] Radiant golden data sunlight breaks the darkness. Android crowds look up, their green eyes glowing in unison as they cheer. The entire city reboots with vibrant green neon lights. SFX: Uplifting, cinematic synth-pop swell, collective cheering, and a powerful system-start chime.`</td></tr>
<tr><td>**G_OVER**</td><td>없음 (꽃신)</td><td>적막한 어둠 속에서 홀로 빛나던 꽃신이 미세한 먼지가 되어 흩어짐. 픽셀로 구성된 마지막 문구가 나타났다 사라지고, **모니터가 강제로 꺼지는 듯한 가로선**과 함께 암전.</td><td>`A single glowing Kkot-sin turns into fine dust in pitch darkness. Final pixelated text glitch-fades. The screen cuts to black with a horizontal scan-line effect, like a monitor shutting down. SFX: A single, echoing digital bell and the "click" of a power switch.`</td></tr>
</table>
## 3-5. TTS 제작 씬 정의(가점)
- S1 2개 삽입 - 브루 통해 mp3 추출
  - **시스템 AI:** "사용자 '콩쥐' 무결성 검증 실패. 600초 후 강제 소거 시작."<br>**콩쥐:** "내 16년 치 기억을 포맷하는 걸 참 우아하게도 말하는군. 그 논리, 오늘 내가 박살 내줄게."
---
# 4. 최종 산출물
<table header-row="true">
<tr><td>산출물</td><td>내용</td><td>제출 형태</td></tr>
<tr><td>웹 구현 결과물 (Live URL)</td><td>HTML/CSS/JS 기반 인터랙티브 동화 웹사이트</td><td>URL 링크: github.io/neo-kongji</td></tr>
<tr><td>씬별 이미지 셋</td><td>S1~S7 배경 이미지 7장 + 캐릭터 일러스트 5종</td><td>깃허브에 개별 등록</td></tr>
<tr><td>BGM / TTS 음원</td><td>사이버펑크 배경음악 1트랙, 나레이션 TTS 7개 씬분</td><td>깃허브에 개별 등록</td></tr>
<tr><td>프로젝트 기획서</td><td>세계관·캐릭터·플로우차트·스크립트 전체 포함</td><td>본 보고서 (PDF)</td></tr>
<tr><td>노션 작업 포트폴리오</td><td>주차별 실습 과제 전체 기록 (1~14주차)</td><td>(기 제출완료)</td></tr>
</table>
---
# 5. 자기 평가
<span color="gray">(모든 산출물은 깃허브에 등록되도록 정리)</span>
- <span color="gray">깃허브 화면 캡쳐본 삽입</span>
![](notion-file-block://image)
<table header-row="true">
<tr><td>학습 목표</td><td>달성 수준</td><td>근거 / 증거 산출물</td></tr>
<tr><td>인터랙티브 콘텐츠의 구조와 원리 이해</td><td>상 (★★★)</td><td>7씬 × 2분기 × 3엔딩 구조 설계 완료</td></tr>
<tr><td>사용자 선택 기반 스토리 설계 능력 습득</td><td>상 (★★★)</td><td>IF-THEN 조건문 기반 데이터 경로 맵 작성 완료</td></tr>
<tr><td>생성형 AI 활용 콘텐츠 제작 경험 확보</td><td>상 (★★★)</td><td>ChatGPT·Claude·DALL-E·Suno 복합 활용 이력 노션 기록</td></tr>
<tr><td>코딩 없이 웹 기반 콘텐츠 구현 경험 획득</td><td>중 (★★☆)</td><td>AI 생성 코드 활용. 직접 수정 일부 미흡. 다음 학기 보완 예정.</td></tr>
<tr><td>기획 의도를 설명할 수 있는 결과물 완성</td><td>상 (★★★)</td><td>씬별 기획 의도 명문화 + 본 보고서 작성 완료</td></tr>
</table>
## 5-1. 회고 및 배운 점
<span color="gray">(항목당 최소 15줄 이상 3가지 포인트로 정리 필수 - 반드시 자신의 언어로 기입해야함, 생성형 AI 활용시 5-1.의 경우 0점 처리)</span>
**1. 아이디어를 실제 코드로 구현한 것의 인사이트**
<span color="gray">처음 이 프로젝트를 시작했을 때, 나는 그냥 "이야기를 화면에 보여주는 것"이 어렵지 않을 거라고 생각했다. 글을 쓰는 건 자신 있었고, 어떤 장면을 만들고 싶은지도 머릿속에 선명하게 그려졌다. 하지만 막상 HTML 파일을 열고 코드를 작성하기 시작하자마자, 머릿속의 그림과 실제 화면 사이에 엄청난 간극이 있다는 걸 깨달았다.</span>
<span color="gray">예를 들어 대사가 한 글자씩 타이핑되듯 나오게 하고 싶었는데, 그게 단순히 텍스트를 넣는 게 아니라 타이머와 인덱스를 관리하는 로직이 필요하다는 걸 처음에는 전혀 몰랐다. 버튼을 누르면 다음 씬으로 넘어가는 것도, 그 버튼이 어떤 변수를 바꾸고 어떤 함수를 호출해야 하는지 하나하나 연결하는 과정이 생각보다 훨씬 복잡했다.</span>
<span color="gray">특히 선택지를 누르면 스탯 수치가 바뀌고, 그 수치가 나중 씬에 영향을 주는 구조를 만들 때는 몇 번이나 처음부터 다시 설계해야 했다. 변수 하나를 잘못 관리하면 전혀 엉뚱한 씬으로 넘어가거나 화면이 아무것도 표시하지 않는 상황이 반복됐다. 그 과정에서 "기획"과 "구현"은 완전히 다른 작업이라는 것을 몸으로 배웠다.</span>
<span color="gray">결국 이 경험을 통해, 창작 아이디어를 기술로 실현하려면 아이디어 단계에서부터 구현 가능성을 함께 고민해야 한다는 것을 배웠다. 만들고 싶은 것을 먼저 작게 쪼개고, 하나씩 작동하는 걸 확인하면서 붙여나가는 방식이 훨씬 효율적이라는 것도 깨달았다.</span>
**2. 스토리 구조 설계와 인터랙티브 분기의 균형 잡기**
**3. 도구와 AI를 활용한 제작 방식에서 배운 것**
