### 🎯 이번 주차 안내
- 11주차에 이어 컷별 이미지 제작을 이어서 진행하고, 완성된 결과물을 웹에 배포하는 방법을 확인함
<details>
<summary>배포(Deploy) 가능한 방법</summary>
  ## 1) Netlify로 올리기
  ### A. 배포
  1. Netlify 접속 → 회원가입/로그인
  2. 대시보드에서 **Add new site → Deploy manually**
  3. 업로드 영역에 `index.html` 파일을 **드래그&드롭**
  4. 자동으로 URL이 생성되고 즉시 배포 완료
    예: `https://xxxxxx.netlify.app`
  ### B. 주소(사이트명) 바꾸기
  - Site settings → **Change site name**에서 원하는 이름으로 변경
  ### C. 커스텀 도메인(선택)
  - Domain settings → Add domain → 안내대로 DNS 연결하면 HTTPS까지 자동 적용
  ---
  ## 2) GitHub로 올리기
  ### A. 준비: 파일명 변경이 핵심
  GitHub Pages는 기본 진입 파일이 `index.html`이어서,
  1. 현재 파일 **`index.html`로 이름 변경** (권장)
  ### B. 배포
  1. GitHub → **New repository** 생성 (예: `portfolio`)
  2. repo에 `index.html` 업로드(커밋)
  3. Settings → Pages
  4. **Source: Deploy from a branch** 선택
  5. Branch를 `main` / `(root)`로 지정 후 Save
  6. 몇 초~수 분 내 URL 생성
    예: `https://깃허브아이디.github.io/portfolio/`
  ### C. 커스텀 도메인(선택)
  - Pages 설정에서 Custom domain 입력 → DNS에 CNAME/A레코드 설정 → HTTPS 체크
  ---
  ## 3) Vercel로 올리기
  ### A. 배포
  1. Vercel 가입/로그인
  2. **New Project → Import** 대신, 가장 간단하게 하려면:
    - GitHub에 repo로 올린 뒤 Vercel에서 해당 repo를 Import (권장)
  3. Framework preset은 Other/Static으로 처리
  4. 배포하면 `https://xxxx.vercel.app` 생성
  ---
  [참고] 자주 터지는 오류 TOP 5
  <table header-row="true">
<tr><td>문제</td><td>원인</td></tr>
<tr><td>URL 안 뜸</td><td>index.html 아님</td></tr>
<tr><td>빈 화면</td><td>JS/CSS 경로 오류</td></tr>
<tr><td>404</td><td>Pages 미설정</td></tr>
<tr><td>이미지 안 보임</td><td>대소문자, 경로 불일치</td></tr>
<tr><td>접속은 되는데 화면 깨짐</td><td>로컬 경로 사용 (`C:\`)</td></tr>
  </table>
</details>
