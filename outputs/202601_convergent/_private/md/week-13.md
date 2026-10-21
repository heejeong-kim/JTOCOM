## 13주차. AI 텍스트 투 비디오(Text-to-Video) 및 이미지 투 비디오(Image-to-Video)
### 🎯 수업 목표
- **학습 목표:** 11-12주차에 확정한 1차 이미지 에셋을 기반으로, AI 비디오 생성 엔진의 카메라 워킹 및 모션 제어 기법을 학습하여 컷별 무빙 소스 구현
- **핵심 키워드:** 이미지 기반 비디오 생성(Image-to-Video), 모션 브러시(Motion Brush), 카메라 다이내믹스(Camera Dynamics), 일관성 유지(Temporal Consistency)
# 0. 도입: 멈춘 이미지에 생명을 불어넣는 3가지 규칙
영상 제작 단계의 핵심은 11주차에서 고정한 '스타일 일관성'을 영상의 시간 축에서도 유지하는 것임. 단순히 이미지가 움직이는 것을 넘어, 서비스의 내러티브와 분위기를 해치지 않는 절제된 연출이 필요함
**💡 Veo의 경우 프롬프트 준수 능력과 자연스러운 물리 법칙 구현이 뛰어남**
> **💡 Veo 활용 3대 원칙**
  1. 프롬프트 밀도 유지: 이미지 생성 시 사용했던 4 Block 프롬프트 구조의 톤앤매너를 Veo 텍스트 입력창에도 일관되게 주입해야 화풍 붕괴가 없음
  2. 카메라 다이내믹스의 세분화: Veo는 팬, 틸트, 줌 등의 복합 명령어를 정밀하게 연산하므로 명확한 카메라 디렉션을 텍스트로 명시함
  3. 하이퍼 리얼 물리 법칙: 왜곡된 움직임보다 인물과 배경의 자연스러운 상호작용(예: 바람에 날리는 머리카락, 네온사인 불빛의 반사)에 집중함
# 1. 작업 전 점검 및 소스 최적화
Veo의 인코딩 성능을 극대화하고 크레딧 낭비를 막기 위해 소스 이미지를 사전 정제
### 1-1. 전처리 체크
- **해상도 가로세로비(Aspect Ratio) 통일:** 웹 UI 적용 표준 규격인 16:9(또는 기획서 상의 규격)로 크롭 및 해상도 업스케일링 완료 여부
- **아티팩트 제거:** 이미지의 글리치나 왜곡은 Veo가 '움직여야 할 오브젝트'로 오인하므로 결함 요소 사전 보정 필수
### 1-2. 소스 에셋 최적화 체크리스트
- **해상도 및 비율 고정:** 웹 서비스 레이아웃에 맞춘 해상도(예: 16:9 또는 4:3) 및 포맷(PNG) 통일
- **노이즈 및 뭉개짐 제거:** 이미지 생성 단계의 사전 업스케일링 필수
# 2. Veo 전용 프롬프트 및 파라미터 제어 규칙
Veo는 명령어의 수식어에 민감하게 반응하므로, 영상의 시간 축을 제어할 키워드를 구조화하여 매핑함
### 2-1. 카메라 컨트롤 텍스트 블록
프롬프트 후반부에 물리적인 카메라 가이드를 명시하여 연출 의도를 반영함
- **시네마틱 줌 (긴장감 고조):** `..., slow cinematic zoom-in, establishing shot, focus on character's expression, 4k resolution`
- **카메라 팬/틸트 (공간 정보 확장):** `..., smooth camera pan from left to right, revealing the details of the cyberpunk street, cinematic lighting`
- **정적 고정 (정보 전달):** `..., static shot, subtle character breathing motion, natural wind movement, highly detailed`
### 2-2. 고급 파라미터 설정
- **Motion Level (모션 수준):** 기본값 3~5 설정 (Veo는 모션 값이 과도할 경우 프레임 후반부에 인물 이목구비 뭉개짐 발생 가능)
- **Prompt Weighting (프롬프트 가중치):** 참조 이미지의 스타일을 유지하면서 텍스트 명령어를 반영하는 밸런스 값을 중간값 이상으로 유지
# 3. 일관성 및 영상 품질 검증 (Temporal Audit)
- [Flow](https://labs.google/fx/tools/flow)
- [Google Gemini](https://gemini.google.com/app)
Veo로 생성된 전체 비디오 소스를 타임라인 상에서 종단 간(End-to-End) 검증함
<table header-row="true">
<tr><td>검증 지표</td><td>점검 방법</td><td>통과 기준 (Pass Criteria)</td></tr>
<tr><td>**비주얼 일관성 (Visual Fidelity)**</td><td>11-12주차 원본 이미지 시안과 Veo 결과물의 첫 프레임 비교</td><td>텍스트 투 비디오 변환 과정에서 화풍, 지배적 색조, 질감이 변형되지 않을 것</td></tr>
<tr><td>**물리적 연속성 (Physics Continuity)**</td><td>0초부터 8초까지의 프레임 변형 추적</td><td>인체의 비정상적인 뒤틀림, 배경 오브젝트의 갑작스러운 소멸이 없을 것</td></tr>
<tr><td>**내러티브 매칭 (Scene Match)**</td><td>데이터 딕셔너리(구조)의 시나리오 흐름과 대조</td><td>카메라 워킹이 기획한 씬의 감정선(위기, 평온 등)과 일치할 것</td></tr>
</table>
