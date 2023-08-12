# 9글9글9글 9조 구글링해봤어 team project

## Project

### 프로젝트 명칭

9글9글9글

### 프로젝트 목적과 기능

프로젝트 관리와 작업 흐름 관리에 사용되는 프로젝트

### 중요로직

**초대 받기**

1. userId 생성
2. Board에 접근을 했을 때 userId , boardId가 일치하는 Access 데이터가 있으면 Board 작성 가능
3. 아닐 경우 return 400

**초대하기**

1. userId 생성
2. userId 로그인
3. Board 생성 (boardId, userId)
4. Board에 해당하는 userId를 가진 사람만 Access table에 해당 boardid를 넣은 데이터를 생성할 수있다.
5. 즉, 권한을 가진 사람만 초대 가능.

**보드 생성**

1. 보드 생성 시 권한 동시 부여
2. 트랜잭션 사용 최소화를 통한 성능 향상

**컬럼, 카드 순서 변경**

1. sequelize의 [Op.gt](http://Op.gt) 와 Op.lt를 이용하여 업 다운
2. up 데이터와 down 데이터 서로 교체
3. 트랜잭션 사용 최소화를 통한 성능 향상

**카드의 컬럼 변경**

1. 카드 수정 시 드롭다운을 통해 선택 가능
2. 드롭다운의 항목들은 컬럼 이름을 전부 조회하여 표시
3. 카드 수정 시 카드 순서는 최상단으로 재정렬
4. 카드 수정 시 컬럼에 유효한 카드가 없는 경우 카드 순서 1을 부여

**보드 전체, 개별 조회**

1. raw query를 이용하여 프로세스 단순화

**회원 관리**

1. hashed password 사용을 위해 bcrypt 라이브러리 이용
2. JWT 토큰 사용

## TEAM

### 팀 규칙

- 약속한 시간에 자리에 있기, 부재중 슬랙에 남기기

- 아무리 바빠도 밥 시간 지키기 (밥 시간 연락 금지)

- 현재 부정적인 상황일 경우 빠른 공유

- 소통 중요

- 예쁜 말 사용

- 구글링 해 보기

- 9조 가족 존중하기

- 20시 50분부터 21시 00분 까지 [9조 마무리 회의]
  (질문이 있는 분은 21시 00분 이후에 이어서 진행)

### 팀원 소개

| 이름   | Blog                             | Github                               |
| ------ | -------------------------------- | ------------------------------------ |
| 이다영 | https://verdantjuly.tistory.com/ | https://github.com/verdantjuly/zbase |
| 오준석 | https://velog.io/@y21zzp         | https://github.com/KORjunseok        |
| 장시훈 | https://velog.io/@sh_j225        | https://github.com/sihunjang225      |
| 이연오 | https://velog.io/@yeono          | https://github.com/yeonoh0101        |

### 기능 역할 분담

| 이름   | Backend              | 기타 역할 (발표, 시연 영상) |
| ------ | -------------------- | --------------------------- |
| 이다영 | 보드, 권한, 뼈대     | S.A. ERD API 발표           |
| 오준석 | 회원                 | API ERD 시연 영상           |
| 장시훈 | 컬럼                 | Wireframe ERD               |
| 이연오 | 카드 관리, 카드 상세 | Wireframe ERD               |

    프론트엔드 : 역할 분담 먼저 완료한 인원

### 개발 일정

![Alt text](./public/img/plan.png)

## Coding Convention

### Architecture Layered Pattern

    - controller : req, res만 사용
    - service : 모든 비즈니스 로직
    - repository : 데이터베이스 접근 로직

### 변수, 클래스, 함수 네이밍

    - 변수 : 카멜케이스, const, let (var X)
    - 클래스 : 클래스명 첫 글자는 대문자
    - 함수 : 기능을 잘 설명할 수 있는 단어

- prettierrc : airbnb 참고

**[ Commit Message Convention ]**

      `feat` : 새로운 기능 추가 (Add …)
      `fix` : 코드 수정 (Change, Delete …)
      `docs` : 문서 수정 (README.md 등)
      `style` : 코드에 변경이 없는 단순 줄바꿈, 여백 수정
      `refactor` : 코드 리팩토링
      `test` : 테스트 코드 추가
      `chore` : 빌드 업무 수정, 패키지 매니저 수정

**[기능별 브랜치]**

      `users` : 회원가입/로그인.
      `access` : 권한 관리
      `boards` : 보드 관리
      `columns` : 컬럼 관리
      `cards` : 카드 관리
      `comments` : 댓글 관리

**[최종 집합 브랜치]**

      `develope` : 개발 (기능별 브랜치 집합)
      `master` : 배포

- Commit Message 내용은 한글로 작성
- Commit은 기능 단위 완성 시 하기
- Commit 전에 불필요한 주석 제거
- merge는 약속된 시간에 모여서 진행
- 기능 별로 주석 제목 달기

### try-catch

service layer에는 넣도록 노력하기

## Tech

- Javascript
- Express

## ERD

https://drawsql.app/teams/verdantjuly/diagrams/trello9
![Alt text](./public/img/erd.png)

- Workers : 작업자 권한 테이블
- Access : Board 접근 권한 테이블
- Boards > Columns > Cards > Comments
- Users : 회원 이름 등 정보를 불러와야 하는 경우가 많아서 대부분의 테이블에 외래키 설정

## 파일구조

```
9gle9gle9gle-9team-project
├─ .prettierrc.cjs
├─ README.md
├─ babel.config.json
├─ package-lock.json
├─ package.json
├─ public
│  ├─ board.html
│  ├─ boardlist.html
│  ├─ css
│  │  ├─ board.css
│  │  ├─ boardlist.css
│  │  ├─ invite.css
│  │  └─ profile.css
│  ├─ img
│  │  ├─ erd.png
│  │  ├─ image-1.png
│  │  ├─ image-2.png
│  │  ├─ image-3.png
│  │  ├─ image-4.png
│  │  ├─ image-5.png
│  │  ├─ image-6.png
│  │  ├─ 로그인 배경.png
│  │  ├─ 메인페이지 배경.png
│  │  └─ 배경.png
│  ├─ index.html
│  ├─ invite.html
│  ├─ js
│  │  ├─ board.js
│  │  ├─ boardlist.js
│  │  ├─ card.js
│  │  ├─ index.js
│  │  ├─ invite.js
│  │  ├─ login.js
│  │  ├─ profile.js
│  │  ├─ signup.js
│  │  └─ user.js
│  ├─ login.html
│  ├─ profile.html
│  └─ signup.html
└─ src
   ├─ app.js
   ├─ cache.js
   ├─ constants.js
   ├─ controllers
   │  ├─ access.controller.js
   │  ├─ boards.controller.js
   │  ├─ cards.controller.js
   │  ├─ columns.controller.js
   │  ├─ comments.controller.js
   │  └─ users.controller.js
   ├─ db
   │  ├─ index.js
   │  ├─ models
   │  │  ├─ access.js
   │  │  ├─ boards.js
   │  │  ├─ cards.js
   │  │  ├─ columns.js
   │  │  ├─ comments.js
   │  │  ├─ enum.js
   │  │  ├─ users.js
   │  │  └─ workers.js
   │  ├─ relations
   │  │  ├─ access.relation.js
   │  │  ├─ boards.relation.js
   │  │  ├─ cards.realtaion.js
   │  │  ├─ columns.relation.js
   │  │  ├─ comments.relation.js
   │  │  ├─ index.js
   │  │  ├─ users.relation.js
   │  │  └─ workers.relation.js
   │  └─ sequelize.js
   ├─ env.js
   ├─ init.js
   ├─ middlewares
   │  ├─ authmiddlewares.js
   │  └─ validation.js
   ├─ repositories
   │  ├─ access.repository.js
   │  ├─ boards.repository.js
   │  ├─ cards.repository.js
   │  ├─ columns.repository.js
   │  ├─ comments.repository.js
   │  └─ users.repository.js
   ├─ routes
   │  ├─ access.routes.js
   │  ├─ boards.routes.js
   │  ├─ cards.routes.js
   │  ├─ columns.routes.js
   │  ├─ comments.routes.js
   │  └─ users.routes.js
   └─ services
      ├─ access.service.js
      ├─ boards.service.js
      ├─ cards.service.js
      ├─ columns.service.js
      ├─ comments.service.js
      ├─ message.js
      └─ users.service.js

```

## 초기 자료

### 초기 S.A.

https://gleaming-harp-2af.notion.site/9-9-9-S-A-9a4778aee3d64bbc9c522458eeb75d60?pvs=4

### 초기 Wireframe

![Alt text](./public/img/image-2.png)
![Alt text](./public/img/image-3.png)
![Alt text](./public/img/image-4.png)
![Alt text](./public/img/image-5.png)
![Alt text](./public/img/image-6.png)

### 초기 API

https://verdantjuly.gitbook.io/trello9-api/
