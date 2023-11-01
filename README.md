# React - Twitter clone

### Firebase와 Vite를 사용해 Twitter React App을 클론합니다.

<img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white"/> <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/styled&dash;components-DB7093?style=flat-square&logo=styledcomponents&logoColor=white"/>  
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white"/> <img src="https://img.shields.io/badge/React&dash;Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white"/>

---

- **23-10-30 : #1.0 ~ #2.3 / Set up**
  - Firebase
    - Back-End 서버 서비스 혹은 App 개발 플랫폼
      - Web, App 등을 만들 때 시간을 절약하는 데 사용할 수 있는 서비스
    - 서비스
      1. Build : 더 빨리 아이디어를 구현할 수 있도록 하는 서비스
         - DB : 'cloud firebase'
           - NoSQL
           - query하기 쉽고, real-time 지원
         - Authentication
           - Log In/Out, PW 변경, 소셜 로그인 등
         - 배포 : 'Hosting'
         - 스토리지 : 'cloud storage'
      2. Release & Monitor
         - App이 충돌할 때 사용하는 'crashlytics'와 같은 많은 분석 도구들이 포함
         - 성능, testing, Google analytics, 머신러닝 등
      3. Engage
         - In-App Messaging, Cloud Messaging, A/B Testing, Remote Config
         - 푸시 알림 및 테스트 등
  - Vite
    - Front-End 개발 시 사용하기 쉽고, 가벼운 개발 환경을 제공하는 도구
      - 다양한 Front-End App을 개발하는 데 도움
    - 사용법
      1. 'npm create vite@latest'로 vite 설치하기
         - 'TypeScript + SWC' 선택하기
      2. 'npm i'로 패키지 설치하기
      3. 'vite.config.ts'에서 플러그인이 없다고 error 시 'npm add -D 플러그인'을 입력해 추가하기
      4. 더미 파일 삭제하기
      5. 필요한 패키지 설치하기
         - react-router-dom, styled-reset, styled-components, @types/styled-components -D 등
  - Routing (React-Router-Dom v6)
    - react-router-dom의 객체 방식(v6) 이용
    - 사용법
      1. Router 객체 생성하기
         - 'createBrowserRouter()' 메서드 사용
      2. Router 적용하기
         - &lt;RouterProvider router={라우터변수명} /&gt;
  - Global style CSS (styled-components)
    - 'styled-components'의 'createGlobalStyle()' 메서드 사용
    - 'styled-reset' 패키지를 사용헤 reset CSS를 적용
  - 로딩 페이지 (Firebase Authentication)
    - Firebase 인증은 기본적으로 Firebase SDK와 Firebase server에서 작동함
      - 인증에 필요한 쿠키, 토큰 등을 다 담당함
      - 쿠키와 토큰을 가져와 서버와 함께 확인해야하므로, 시간이 필요함
    - Firebase가 인증을 받는 시간동안 loading을 보여줄 수 있음
      - loading이 끝난 후 Router를 표시하도록 함
      - ex. {isLoading ? &lt;LoadingScreen /&gt; : &lt;RouterProvider router={router} /&gt;}
  - Firebase 초기 설정
    1. Firebase에 로그인 후, 콘솔로 이동해 프로젝트 생성하기
    2. App에 Firebase를 추가하여 시작하기
       - 'Web'버튼을 눌러 web app에 Firebase 추가하여 등록
    3. Firebase 패키지 설치하기
       - 'npm i firebase'
       - SDK 코드를 복사한 후 'src/firebase.ts'를 생성한 후 붙여넣기
         - Firebase를 나의 API key로 초기화하기 위함
         - 공유해도 100% 안전
- **23-11-01 : #3.0 ~ #3.4 / Authentication**

---

노마드 코더 정책 상 강의요약은 괜찮으나, 코드와 필기는 공개적인 곳에 올리면 안 됨.  
필기 요약지는 암호화된 .zip 파일로 저장함.
