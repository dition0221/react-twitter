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
  - Firebase Authentication 초기 설정
    - Firebase는 너무 크기 때문에, 프로젝트 시작 시 필요한 제품을 직접 선택해야 함
      - Firebase 콘솔에서 활성화한 후, 코드에서 초기화
    - 설정법
      1. [콘솔] Firebase Authentication에 접속해 설정 시작하기
      2. [콘솔] 로그인 매체 설정하기
      3. [코드] 'src/firebase.ts'에서 Authentication 사용 설정하기
         > import { getAuth } from "firebase/auth";
         > export const auth = getAuth(앱이름);
         - 인증 서비스에 대한 직접 링크를 받아올 수 있음
      4. [코드] Authentication 사용하기
         - 'getAuth()'로 만든 auth객체의 프로퍼티, 메서드를 사용
           - 인증인스턴스.authStateReady() - Firebase Authentication이 초기화되고, 사용자 인증 상태가 결정될 떄까지 대기
  - 계정 생성 (이메일)
    1. 예외인 경우 제외하기
       - 로딩 중 이거나 form에 제대로 기입하지 않은 경우, 예외 처리
    2. Firebase에 계정 생성하기
       - 'createUserWithEmailAndPassword(인증인스턴스, 이메일, 비밀번호)' 사용
         - 사용자 자격증명(UserCredential)&lt;Promise&gt;을 반환함
         - 사용자 계정을 생성하려고 시도함
         - 성공 시 사용자는 App에 즉시 로그인 됨
         - 실패(계정이 이미 존재, PW가 유효하지 않는 등)할 수도 있음
           - Firebase가 알아서 PW 유효성 검사를 함
       - '자격증명변수.user'를 통해 사용자 정보를 얻을 수 있음
    3. 사용자의 이름(닉네임) 부여하기
       - Firebase의 사용자는 이름과 아바타 이미지의 URL을 가지는 미니 프로필을 가지게 됨
         - 계정 생성 후, 사용자의 이름을 설정할 수 있음 (옵션)
       - 기본형 : await updateProfile(사용자, { displayName?: 이름, photoURL?: 이미지URL });
    4. 홈페이지로 Re-Direct하기
  - 로그인한 사용자만 볼 수 있는 페이지 생성
    1. 사용자가 로그인을 하였는지 판별하기
       - '인증인스턴스.currentUser' 프로퍼티는 사용자의 값(User) | null을 반환
    2. 로그인한 사용자만 볼 수 있는 Route 생성하기
  - 로그아웃
    - 기본형 : '인증인스턴스.signOut();'
  - 계정 생성 시 error 메시지 보여주기
    - 이미 존재하는 이메일이나 PW가 약하다는 등의 이유때문에 error가 발생할 수 있음
    - 'try-catch'문을 사용해 Firebase의 error문을 확인 가능
    - Firebase의 error 메시지를 보여줄 수도 있음
      > if (e instanceof FirebaseError) {
      > &nbsp;&nbsp;console.log(e.code, e.message)
      > }
  - 로그인
    - 사용자가 로그인 form을 제출할 때(onSubmit에서) 로그인을 실행
    - 기본형 : await signInWithAndPassword(인증인스턴스, 이메일, 비밀번호);
  - 소셜 로그인(GitHub)
    1. [콘솔] 'Authentication'-'Sign-in method'-'새 제공업체 추가'에서 사용 설정하기
    2. GitHub App 생성하기
       - GitHub에서 'Settings'-'Developer settings'-'OAuth Apps' 접속
         - 또는 [ https://github.com/settings/developers ] 접속
       - 새로운 OAuth App 생성
         - 'Homepage URL'은 확인하는 것이 아니라서, 아무거나 넣어도 됨
         - 'Authorization callback URL'은 Firebase애서 나오는 URL을 사용
    3. [콘솔] 소셜로그인 설정 완성하기
       - 클라이언트 ID는 GitHub에서 만들어진 client ID를 사용
       - 클라이언트 PW는 GitHub에서 만드는 Client secret을 사용
    4. [코드] 소셜 로그인 기능 생성하기
       - 소셜 로그인 버튼을 클릭 시 작동하도록 함
       - 기본형
         > const 제공자변수 = new GithubAuthProvider();
         > await signWithPopup(인증인스턴스, 제공자변수); // 옵션 1
         > await signWithRedirect(인증인스턴스, 제공자변수); // 옵션 2
       - 문제 발생 : 로그인 방식은 다르지만, 이메일주소가 같을 경우 error 발생
  - 비밀번호 재설정하는 이메일 전송
    - 기본형 : await sendPasswordResetEmail()
  - 회원가입 시 이메일 인증 기능
    1. 계정 생성 시 인증 이메일 발송하기
       - await sendEmailVerification(사용자정보);
    2. 로그인 시 인증확인 후 로그인하도록 하기
       - 로그인 후 '인증인스턴스.emailVerified' 프로퍼티로 인증되었는지 확인
  - Update : 회원가입 시 이메일 인증 기능 구현 완료
- **23-11-04 : #4.0 ~ #4.3 / Tweeting(1)**
  - Update : 'sendPasswordResetEmail()'로 비밀번호 변경 이메일 발송 기능 추가하기

---

- **23-11-05 : #4.4 ~ #4.7 / Tweeting(2)**

노마드 코더 정책 상 강의요약은 괜찮으나, 코드와 필기는 공개적인 곳에 올리면 안 됨.  
필기 요약지는 암호화된 .zip 파일로 저장함.
