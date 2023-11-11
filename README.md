# React - Twitter clone

### Firebase와 Vite를 사용해 Twitter React App을 클론합니다.

<img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white"/> <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/styled&dash;components-DB7093?style=flat-square&logo=styledcomponents&logoColor=white"/>  
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white"/> <img src="https://img.shields.io/badge/React&dash;Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white"/> <img src="https://img.shields.io/badge/timeago.js-000?style=flat-square&logo=&logoColor=white"/>

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

---

노마드 코더 정책 상 강의요약은 괜찮으나, 코드와 필기는 공개적인 곳에 올리면 안 됨.  
필기 요약지는 암호화된 .zip 파일로 저장함.
