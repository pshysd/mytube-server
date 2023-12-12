# API 문서: /api

## /users - 유저

### GET /

- 인증
- return: IUser

### POST /

- 회원가입 요청
- return: 'ok'

### POST /login

- 로그인 요청
- return: IUser

### POST /logout

- 로그아웃 요청
- return: 'ok'

## /videos - 비디오

### GET /

- 전체 영상 가져오기
- return: IVideo[]

### GET /:videoId

- `:videoId`에 해당하는 영상 가져오기
- return: IVideo

### GET /likes

- 영상에 찍힌 좋아요 가져오기
- queryString: videoId
- return: ILike[]

### GET /dislikes

- 영상에 찍힌 싫어요 가져오기
- queryString: videoId
- return: IDislike[]

### POST /file

- 서버에 정적 파일 저장
- return: 

### POST /thumbnail

- 썸네일 생성, 서버에 저장
- return: 

### POST /

- DB에 파일 경로 저장
- return: 'ok'

### POST /like

- 영상에 좋아요 누르기 (이미 했을 경우 취소)
- return: 'ok'

### POST /dislike

- 영상에 싫어요 누르기 (이미 했을 경우 취소)
- return: 'ok'

### GET /subs/:userId

## /subs - 구독

### POST /do

- 구독하기
- return: 'ok'

### POST /undo

- 구독취소
- return: 'ok'

### GET /list?userTo

- 구독자 명단 가져오기
- return: IUser[]

### GET /count?userTo&userFrom

- 구독자 수 가져오기
- return: number

## /comments - 댓글

### GET /:videoId

- 영상에 작성된 덧글 조회
- return: IComment[]

### GET /likes

### GET /dislikes

### POST /like

### POST /dislike

### POST /

- 영상에 덧글 생성
- return: 'ok'

## /categories - 카테고리

### GET /

- 카테고리 가져오기
- return: ICategory[]

## /privacy - 공개 범위

### GET /

- 공개 범위(public, privacy) 가져오기
- return: IPrivacy[]