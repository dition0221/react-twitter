# React - Twitter clone

### Firebase와 Vite를 사용해 Twitter React App을 클론합니다.

<img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white"/> <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/styled&dash;components-DB7093?style=flat-square&logo=styledcomponents&logoColor=white"/>  
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white"/> <img src="https://img.shields.io/badge/React Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white"/> <img src="https://img.shields.io/badge/timeago.js-000?style=flat-square&logo=&logoColor=white"/> <img src="https://img.shields.io/badge/React Hook Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white"/> react-google-recaptcha-v3

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
- **23-11-01 : #3.0 ~ #3.4 / Authentication (+ Code Challenge)**
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
  - _Update (Code Challenge): 회원가입 시 이메일 인증 기능_
- **23-11-04 : #4.0 ~ #4.3 / Tweeting(1) (+ Code Challenge)**
  - Cloud Firestore
    - Firebase의 NoSQL DB
    - 설정법
      1. [콘솔] DB 생성하기
         - DB 위치를 정함 (딱 한 번만 정할 수 있음)
         - 테스트 모드 선택 (30일만 사용 가능)
      2. [코드] DB 인스턴스 생성하기
         - 기본형
           > import { getFirestore } from "firebase/firestore";  
           > export const 변수명 = getFirestore(앱명);
    - 콘솔에서 수동으로 DB에 데이터를 추가하는 방법
      1. 컬렉션 생성하기
         - 컬렉션(collection) : 폴더 같은 것
      2. 문서(document) 생성하기
         - 필드와 값을 입력해 생성
         - 기본적으로 임의의 ID가 배정되지만, 원한다면 ID를 변경할 수 있음
         - 문서 내에 또 다른 컬렉션 생성 가능
    - 코드에서 DB에 데이터를 추가하는 방법
      - 기본형 : await addDoc(collection(DB인스턴스, 컬렉션명), { 데이터(키-값) });
        - ex.
          > await addDoc(collection(db, "tweets"), {  
          > &nbsp;&nbsp;tweet,  
          > &nbsp;&nbsp;createAt: Date.now(),  
          > &nbsp;&nbsp;username: user.displayName || "Anonymous",  
          > &nbsp;&nbsp;userId: user.uid,  
          > });
      - 추후 트윗을 삭제할 권한을 부여하기 위해, 트윗 시 사용자 id를 저장함
        - 트윗 삭제 시 로그인 사용자 id와 트윗 id를 비교한 후, 삭제 결정
      - DB가 거의 실시간으로 작동함
  - Storage(Firebase)
    - 설정법
      1. [콘솔] '빌드'-'Storage'에서 스토리지 생성하기
         - 테스트 모드 선택
      2. [코드] storage 인스턴스 생성하기
         - 기본형
           > import { getStorage } from "firebase/storage";  
           > export const 변수명 = getStorage(앱명);
    - 스토리지도 FireStore처럼 컬렉션(폴더)과 문서로 이루어져 있음
      - 파일이 저장되는 폴더명과 파일명을 지정 가능
    - 사용법 (파일 업로드)
      1. 해당 파일의 위치에 대한 reference(location) 받아오기
         - 기본형
           > import { ref } from "firebase/storage";  
           > const 변수명 = ref(스토리지인스턴스, 저장경로);
         - 이미지명은 이미지가 업로드된 트윗의 id이어야, 트윗 삭제 시 빠르게 찾기 가능
           - 'addDoc()'은 document의 참조를 &lt;Promise&gt;로 반환함을 이용
         - ex.
           > const doc = await addDoc( ... );  
           > const locationRef = ref(storage, \`tweets/\${user.uid}/\${doc.id}\`);
      2. 스토리지에 파일 업로드하기
         - 기본형
           > import { uploadBytes } from "firebase/storage";  
           > await uploadBytes(위치참조변수, 파일변수);
         - ex. `await uploadBytes(locationRef, file);`
      3. 스토리지의 파일 경로를 추출하기 (DB에 파일 경로를 추가하기 위함)
         - 'uploadBytes()'는 업로드 결과에 대한 참조&lt;Promise&gt;를 반환함
         - 기본형
           > import { getDownloadURL } from "firebase/storage";  
           > const 변수 = await getDownloadURL(저장결과참조변수);
         - 결과값의 .ref 프로퍼티로 Promise&lt;string&gt;타입인 URL을 반환함
         - ex.
           > const result = await uploadBytes(locationRef, file);  
           > const url = await getDownloadURL(result.ref);
      4. DB에 파일 경로를 추가하기
         - 'updateDoc()' 메서드를 사용해 DB document 업데이트
         - 기본형
           > import { updateDoc } from "firebase/firestore";  
           > await updateDoc(문서참조변수, { 데이터(키-값) });
         - ex. `await updateDoc(doc, { photo: url });`
  - _Update (Code Challenge): 'sendPasswordResetEmail()'로 비밀번호 변경 이메일 발송 기능_
- **23-11-05 : #4.4 / Tweeting(2)**
- **23-11-09 : #4.4 ~ #4.7 / Tweeting(3)**
  - 쿼리하는(데이터를 가져오는) 방법 - Firestore(DB)
    1. DB로부터 가져올 데이터가 어떻게 생겼는지 TypeScript로 정의하기
       - 'interface'로 타입을 정의
    2. 쿼리(Query) 생성하기
       - 어떤 데이터를 원하는지에 대한 쿼리를 생성해야 함
       - 기본형 : `const 변수명 = query(collection(DB인스턴스, 컬렉션명), ...조건문);`
    3. DB로부터 문서 가져오기
       - 'getDocs(쿼리)' 메서드를 사용해 'QuerySnapshot'을 결과값으로 받음
         - QuerySnapshot : Firestore에서 실행한 쿼리의 결과를 나타내는 객체
       - 기본형 : `const 변수명 = await getDocs(쿼리변수);`
       - '쿼리스냅샷' 변수의 프로퍼티들(.docs, .empty, .size 등)을 이용 가능
         - .docs : 결과 배열을 반환하며, 반복문에서 '.data()' 메서드를 사용해 결과를 출력
           - ex. `snapshot.docs.forEach((doc) => console.log(doc.data()));`
    4. 가져온 문서를 상태에 저장하기
       - 배열의 '.map()'메서드를 사용해 저장할 데이터 배열을 생성한 후, 상태에 저장
         - id는 '문서.id'(DB에서 자동 생성됨)를 사용
  - 실시간으로 쿼리의 변경 사항을 수신하는 방법 - Firestore(DB)
    - DB 및 쿼리와 실시간 연결을 생성하고, 해당 쿼리에 요소가 생성/삭제/수정 시 쿼리에 알려줌
    - 사용법
      1. 'onSnapshot()'을 사용해 DB와 이벤트 리스너를 연결하기
         - 특정 문서나 켈렉션, 쿼리 이벤트를 감지하여, 실시간으로 이벤트 콜백함수를 실행할 수 있음
           - DB에 들어온 쿼리를 새로고침 없이 화면에 반영 가능
         - 'getDocs()'를 사용해 DB로부터 문서를 가져오는 방법 대신 사용함
         - 기본형 : `await onSnapshot(쿼리, 콜백함수);`
           - 콜백함수에서 실시간 이벤트를 작성
           - 콜백함수에서 각 스냅샷의 '.docChanges'는 마지막 스냅샷 이후의 변경 사항을 배열로 반환함 (변경 유형도 알 수 있음)
      2. DB와 연결을 해제하기
         - 사용자가 다른 화면을 사용 시 실시간을 작동하지 않게 해주는 것이 좋음
           - 'useEffect()'의 cleanUp(return문) 기능을 이용
           - 연결을 계속 켜놓을 시 비용이 늘어나기 때문
         - 'onSnapshot()'은 'Unsubscribe' 함수를 반환함
           - 기본형
             > let 변수명: Unsubscribe | null = null;
             > 변수명 = await onSnapshot( ... );
             > 변수명(); // 실시간 DB 연결 해제
  - 트윗 삭제 기능 구현
    1. 로그인한 유저 id와 트윗의 유저 id가 일치할 경우에만, 트윗 삭제를 허가
       - 트윗 DB에 작성자의 id를 저장하고 있음
    2. 트윗 삭제하기 (Firestore)
       - 기본형 : `await deleteDoc(doc(DB인스턴스, 컬렉션명, 문서id));`
    3. 첨부했던 이미지 삭제하기 (Storage)
       1. 스토리지에서 파일 참조하기
          - 기본형 : `const 변수명 = ref(스토리지인스턴스, 파일경로);`
       2. 스토리지에서 파일 삭제하기
          - 기본형 : `await deleteObject(참조변수);`
- **23-11-10 : #5.0 ~ #5.2 / User profile (+ Code Challenge)**
  - 사용자 프로필 생성
    1. 프로필 페이지 생성하기
    2. 프로필 이미지 파일을 스토리지에 저장하는 기능 구현하기
       - 사용자로부터 파일 받기
       - 파일 참조변수 생성하기
       - 스토리지에 파일 업로드하기
       - 스토리지에 업로드한 파일의 경로 가져오기
    3. 프로필 업데이트하기
       - 스토리지에 업로드한 이미지 파일의 결과참조변수를 가지고 업데이트
       - 기본형 : `await updateProfile(사용자변수, { 키-값 });`
  - 유저 타임라인
    - 현재 로그인한 사용자의 트윗만 가져오는 기능을 구현할 것
    1. 쿼리 작성하기
       - 'query()' 함수의 where 조건문을 사용해 로그인한 사용자의 트윗만 가져옴
       - 기본형 : `where(필드명, 비교연산, 비교값)`
    2. DB로부터 스냅샷 가져오기
    3. 스냅샷을 state에 저장하기
    4. 쿼리 필터 index 적용하기
       - 쿼리 조건문 사용 시 index가 필요하다고 콘솔 에러가 발생함
         - 콘솔의 링크에 접속하여, index를 저장하면 됨
       - firestore에게 무엇을 필터링하는지 알려주는 작업
         - firestore가 유연하기 때문에 필요한 작업
  - timeago.js 패키지
    - Internationalization 내장 API를 사용해 상대시간을 계산할 때, 시간단위를 꼭 입력해야 함
      - 자동으로 시간단위를 사용하기 위해 timeago.js 패키지를 사용
    - 설치법 : `npm i timeago.js`
    - 사용법 : `format(날짜, 국가코드);`
      - 기본값은 영어이며, 다른 언어를 사용할 시 'register()'로 등록 후 사용
        - ex.
          > import { format, register } from "timeago.js";
          > import koLocale from "timeago.js/lib/lang/ko";
          >
          > register("ko", koLocale);
          > const relativeTime = format(Date.now(), "ko");
    - <a href="https://github.com/hustcc/timeago.js" target="_blank">공식 문서</a> / <a href="https://youtu.be/2AMRTAFSh98?t=373" target="_blank">참고 자료</a>
  - _Update (Code Challenge)_
    - _트윗의 내용 수정 기능_
    - _트윗의 이미지 삭제/수정 기능_
    - _트윗의 상대적인 작성시간 기능 (timeago.js)_
    - _프로필 이름 수정 기능_
- **23-11-11 : #6.0 ~ #6.3 / Deploy**
  - 배포 (deploy)
    1. [콘솔] Firebase Hosting 서비스 생성하기
    2. [코드] Firebase CLI 설치하기
       > npm i -g firebase-tools
    3. [코드] firebase에 로그인하기
       > firebase login
    4. [코드] firebase 프로젝트 시작(초기화)하기
       - `firebase init` 입력
       - `Hosting: Config files...` 선택
         - Firebase Hosting을 위한 파일구성을 만듦
       - `Use an existing project` 옵션 선택
         - 기존 프로젝트 사용
       - 프로젝트 선택
       - 'public directory' 입력
         - 빌드한 후, 빌드 폴더를 선택해야 함 (npm run build)
           - vite는 'dist'폴더에 빌드하므로, 'dist'를 입력
         - SPA(Single Page Application)으로 사용할지 여부 선택
           - SPA로 사용
       - GitHub와 함께 자동 빌드하고 배포하도록 설정 여부
         - No
       - 'dist/index.html'파일이 이미 존재하는데, 덮어쓸지 여부
         - Yes
    5. [코드] 배포 스크립트 생성하기
       - package.json에서 배포하는 스크립트를 생성
         > "deploy": "firebase deploy"
       - 배포 전에 자동으로 빌드하는 스크립트를 생성
         > "predeploy": "npm run build"
       - 'deploy' 스크립트 실행 시 npm이 자동으로 'predeploy'를 먼저 실행함
  - 보안 룰 (DB, Storage)
    - 사용자가 DB 또는 Storage에 파일을 읽고 쓰는 것을 허용/차단할지 결정할 수 있음
    - 이 프로젝트에서 Firebase에 대한 호출은 전부 Front-End 코드로부터 도찱하므로, 사용자가 API key를 볼 수 있음
      - 보안 룰과 함께라면, Firebase는 구체적으로 허용한 작업만 수행하게 됨
      - 타인이 API key를 알고있다고 해도, 보안 룰을 바꿀 권한이 없음
    - 배포한 프로젝트에 곧바로 적용됨 (새로 배포할 필요 없음)
    - 설정법
      - [콘솔] firestore 또는 storage의 '규칙'에 접속해 설정 가능
      - if문으로 조건을 체크하여, 권한을 허용/차단을 설정
      - { read, write, create, update, delete 등 }
        - 'write'는 { create, update, delete }를 전부 포함
      - > ex. 'tweets' 컬렉션 내의 모든 doc을 권한이 있는 사용자에게 read와 create를 허용하는 룰
        > match /tweets/{doc} {
        > &nbsp;&nbsp;allow read, create: if request.auth != null;
        > }
      - resource : 사용자가 수행하려는 문서(내용)을 의미함
      - > ex. 오직 트윗을 생성한 본인만이 해당 트윗을 수정을 허용하는 룰
        > allow update, delete: if request.auth.uid == resource.data.userId
      - > ex. 로그인한 사용자가 1MB 이하의 파일만 업로드할 수 있는 룰
        > allow write: if request.auth != null && request.resource.size < 1 \* 1024 \* 1024
    - <a href="https://firebase.google.com/docs/storage/security/core-syntax?hl=ko&authuser=0" target="_blank">공식문서1</a> / <a href="https://firebase.google.com/docs/storage/security/rules-conditions?hl=ko&authuser=0" target="_blank">공식문서2</a>
  - Firebase API key 보안
    1. <a href="https://console.cloud.google.com/apis/credentials" target="_blank">'구글클라우드-API및서비스-사용자인증정보'</a>에 접속하기
       - 프로젝트 선택 후, 'Browser key (auto created by Firebase)'에 접속
    2. '애플리케이션 제한사항 설정'에서 API 호출 디바이스 제한 설정하기
       - '웹사이트' 선택 후, 배포한 사이트 주소(프로토콜 제외) 입력 후, 저장
         - 해당 웹사이트에서만 Firebase API를 사용할 수 있도록 설장하는 것
         - localhost도 차단되므로, 개발 중에는 localhost를 추가해도 됨
- **23-11-15 : Responsive app design(1)**
  - _Update_
    - _소셜로그인 구글 추가_
    - _로그인한 사용자는 '로그인', '회원가입' 페이지에 접근 불가하도록 추가_
  - _Doing_
    - _반응형 웹 디자인_
- **23-11-16 : Responsive app design(2)**
  - _Fix : [PostTweetForm] 스토리지에 업로드가 되지 않는 현상 수정_
    - _firebase 보안룰 문제 : resource.size -> request.resource.size 수정_
  - _Update_
    - _반응형 웹 디자인 : 모바일, PC (중단점 : 768px)_
    - _[Profile] 트윗만 스크롤 가능하도록 업데이트_
    - _[Timeline, Profile] 트윗 컨테이너의 최상단 이동 anchor 버튼 생성_
      - _모바일 : 브라우저의 최상단으로 이동_
      - _PC : 트윗 컨테이너의 최상단으로 이동_
    - _favicon 업데이트_
    - _Rich Link Preview 및 썸네일 업데이트_
- **23-11-17 : 🤣 Hacked by bot**
  - _Problem : 악성봇에 의해 단시간에 DB할당량을 모두 사용당함_
  - _Issue_
    - _이메일 회원가입 시 이메일인증 시스템이 있음에도 불구하고, 가짜이메일은 막지 못한 현상_
      - _트윗 횟수 제한하기_
      - _해외 접속 차단하기_
      - _reCAPTCHA 봇 걸러내기_
      - _이메일 주소 제한하기_
- **23-11-21 : Security**
  - reCAPTCHA v3
    - v2와 다르게, 사용자의 액션을 절대 제한하지 않음
      - 서버에게 특정 사용자의 점수를 알려주며, 점수를 통해 악의적인지 판단
      - 0~1 사이의 값을 가지며, 0: 봇 / 1: 사람
    - 시작하기 공식 문서 : https://firebase.google.com/docs/app-check/web/recaptcha-provider?hl=ko
    - 'react-google-recaptcha-v3' 패키지 사용
  - _Doing_
    - _reCAPTCHA v3 적용_
      - [main], [CreateAccount], [firebase.ts]
    - _React-Hook-Form 대체_
      - [CreateAccount], [FindPw]
      <!-- TODO: GithubBtn, GoogleBtn 임시폐쇄 -->

---

- To-Do
  - firebase 콘솔에서 App Check 등록하기 (reCAPTCHA)
  - 트윗에 사용자의 프로필 이미지 추가
  - 이메일, 소셜로그인 통합
  - 개발 완료 시 firebase API 호출 localhost 삭제하기

노마드 코더 정책 상 강의요약은 괜찮으나, 코드와 필기는 공개적인 곳에 올리면 안 됨.  
필기 요약지는 암호화된 .zip 파일로 저장함.
