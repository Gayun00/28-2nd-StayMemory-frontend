## 👉 프로젝트 소개

![스크린샷 2022-02-05 오전 1 49 52](https://user-images.githubusercontent.com/93597794/152569117-418e46c9-1ca5-42b8-8d44-4ce5648e9d1f.png)reference : [STAYFOLIO](https://www.stayfolio.com/)

좋은 잠자리 문화를 선도하고 있는 STAY를 큐레이팅하는 여행 플렛폼 STAYFOLIO 클론 프로젝트 입니다. 
<br>
짧은 프로젝트 기간 동안 개발에 집중할 수 있도록 STAYFOLIO 만의 감성적인 UI와 기획을 일부 참고하여 숙박 플랫폼 서비스를 구현하였습니다.

<br>



<br>

## 👉 팀 소개
### 1. 팀명

Stay Memory


### 2. 팀원

- 프론트엔드 : 이가윤 이석호 옥채현
- 백엔드 : 이찬영, 김재엽
  - [백엔드 github 링크](https://github.com/wecode-bootcamp-korea/28-2nd-StayMemory-backend)


### 3. 배포 링크

[배포링크](http://stay-memory.s3-website.ap-northeast-2.amazonaws.com)

### 4. 기술 스택
- React.js
- Styled-component
- Recoil
- Git & Github

<br>

## 📘 구현사항 및 업무 분담

### 이가윤

- 메인 페이지 : 순수 리액트 코드와 라이브러리 slick을 활용한 캐러셀 구현
- 상세 페이지 : 예약 불가 날짜 비활성화, 선택한 기간 예약하기 기능 구현
- 로그인 페이지 : REST API KEY와 JWT토큰을 사용한 카카오 소셜 로그인 기능 구현
- 어드민 페이지 : 호텔의 정보(가격, 이미지)를 업데이트 할 수 있는 어드민 페이지 구현
- 공통 컴포넌트 : GNB, 모달창, 달력 컴포넌트 (검색 페이지, 상세페이지, Nav 컴포넌트 공통 사용)
- 마이 페이지 : 예약정보 / 다녀온 스테이 탭 구현

### 이석호
- 검색 페이지 : 조건 선택 및 쿼리스트링 및 백엔드 데이터 활용으로 호텔 리스트 시각화


### 옥채현

- 로그인 페이지 : 레이아웃 구현
- 마이페이지 : 관심스테이 탭 구현
- 공통 컴포넌트 : 관심 스테이 버튼 컴포넌트 구현

<br>

## 📙 구현 사항 상세 내용

### 1. 메인 페이지

| description | 
| ---- | 
|  메인 페이지 캐러셀    | 
|  ![메인페이지 캐러셀](https://user-images.githubusercontent.com/67543454/155482025-2582e0a4-eb88-4fc7-89f7-6ff0a93515be.gif) |  


<br>

### 2. 상세 페이지

| description | 
| ---- | 
|   - 예약기간 선택 후 합계금액 표시 <br> - 결제하기 버튼 클릭시 예약 완료   |  
|  ![상세페이지ㅏ](https://user-images.githubusercontent.com/67543454/155482047-bfcab50b-c360-4385-b690-51829fffcac9.gif) |  


<br>

### 3. 로그인 페이지

| description |
| ---- |
|   - 카카오 소셜 로그인 기능: Rest API key로 인가 코드와 로그인 토큰을 발급받아 백엔드에 전달 후, 백엔드에서 JWT 토큰을 전달받아 사용하였습니다. <br> - 로그 아웃시 저장된 JWT토큰을 세션 스토리지에서 삭제 하고 로그인 페이지로 리디렉션 합니다.   | 
|   ![로그인 로그아웃](https://user-images.githubusercontent.com/67543454/155482056-6ea93aad-c19a-4b5f-9420-ed8e7a71416a.gif)| 


<br>

### 4. 어드민 페이지

| description |
| ---- |
|  - 별도 URI로 접속: 어드민 관리자 로그인을 통해 접속하는 것이 맞지만, 프로젝트 기간 내 어드민 페이지의 로직 구현에 집중하기 위해 생략했습니다. <br> 대신 admin/[adminid] URI로 접속이 가능합니다. admin/1로 접속하면 id가 1인 admin권한을 가진 사용자의 페이지로 접속할 수 있습니다. <br> - 이미지/가격 변경: 기존 등록된 숙소의 썸네일 이미지 및 가격 정보 변경 가능 <br> - 이후 사용자 페이지로 접속하면 해당 호텔의 변경된 썸네일 이미지 및 가격정보를 볼 수 있습니다.  |
|  ![어드민페이지](https://user-images.githubusercontent.com/67543454/155482037-d38b42ed-c589-4299-8c55-73bf28590856.gif) |

<br>


### 5. GNB 모달 컴포넌트


| 어디로 떠날까요?  | 언제 떠날까요?     |
| ------------- | --------------- |
|        각각 원하는 지역과 기간을 검색해 예약가능한 숙소를 찾을 수 있습니다.        |        클릭시 숙소 목록 페이지로 이동하고, 쿼리 스트링이 전달됩니다.         |   
| ![ezgif com-gif-maker (20)](https://user-images.githubusercontent.com/67543454/155488014-08dc32bc-f0e9-44fa-9540-9addd1292ebf.gif) | ![ezgif com-gif-maker (21)](https://user-images.githubusercontent.com/67543454/155488017-64f5abf9-0739-4655-a8f4-a0da9b28ad6e.gif) |


<br>

### 6. 마이 페이지



| description |
| ---- |
|  관심스테이 버튼을 클릭한 숙소와 예약한 숙소 정보를 확인할 수 있습니다. | 
|   <img width="700" alt="스크린샷 2022-02-24 오후 5 40 19" src="https://user-images.githubusercontent.com/67543454/155488974-8939acf8-1660-43d8-b17a-fe683e5fd0b3.png"> | 


<br>

### 7. 검색 페이지
```
- 인원, 가격 등 필터 Drop-down 버튼 구현
- 상수 데이터를 활용하여 input 카운트 개별 관리
- input range 가격 슬라이드 구현(MUI 라이브러리 문제로 삭제)
- 쿼리스트링 및 백엔드 데이터 활용으로 조건에 맞는 호텔 리스트 시각화 
```
<br>


## 💡 협업 및 프로젝트 진행 방식 소개

### 사용한 툴

- Trello: 칸반보드를 활용한 회의록 작성 및 진행상황 공유 [treollo 링크](https://trello.com/b/u2X2xFAH/stay)
- Slack, Discord: 팀원간 소통 및 실시간 작업 완료 사항 공유

| 회의록                           |     진행상황 공유   |
| ---------------------------------------------------------------------------------------------------------------------- | ------|
 | - 데일리 스탠드업 미팅: 매일 4가지 항목 팀 내 공유 <br> (블로킹 포인트, 어제 작업한 내용, 오늘 작업할 내용, 기타 공유 사항) <br> 주간 회고 미팅, 스프린트 플래닝 미팅 진행 | 업무 진행상황 공유|
|             <img width="599" alt="스크린샷 2022-02-02 오후 5 34 16" src="https://user-images.githubusercontent.com/67543454/152119643-5d6e2dca-f40c-4835-9f12-1f964dc6b75f.png">|<img width="700" alt="스크린샷 2022-02-24 오후 6 07 42" src="https://user-images.githubusercontent.com/67543454/155493465-2726871b-b515-4255-b109-d92b933ab780.png">|


<br>

### Git 컨벤션

- git rebase: PR/ 브랜치 당 하나의 커밋내역으로 관리

<br>

### 커밋 메시지 컨벤션

- Add: 기능 및 구현 사항 추가
- Modify: 스타일 변경
- Refactor: 코드 포맷 변경 및 리팩토링
- Fix: 오류 수정


