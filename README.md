# 🍶 술렁술렁
* 전통주 정보공유 웹 플랫폼
* 팀명 : Just one more drink 

## 사이트가 살아있다면 아래에서 동작합니다
http://roalwh.iptime.org:20108/
<br/>
* 퍼블릭 게시용이므로 설정파일은 되도록 삭제되어있습니다.

## 😀 목표
소주 맥주 말고도 더 맛있고 다양한 전통주에 대해 알아봅시다.
취향에 맞는 전통주도 추천해드립니다.
국내 여행할 때 마시면 좋을 지역별 전통주도 추천해드립니다. 
우리술에 관심있고 우리술을 좋아하는 모든 사람들이 모인 커뮤니티


## 👨‍👩‍👦‍👦 Collaborators : 팀원 소개
| 이름       | 역할           | GitHub 프로필                               |Email                               |
|------------|----------------|---------------------------------------------|---------------------------------------------|
| 원영호     | 팀장, 서버관리자, 풀스택 | [roalwh](https://github.com/roalwh) |
| 김세은     | 프론트엔드      | [senique-dev](https://github.com/senique-dev) |
| 문상혁     | 풀스택          | [m960626](https://github.com/m960626) |
| 서영은     | 풀스택          | [YOUNGEUN100](https://github.com/YOUNGEUN100) |
| 최진주     | 프론트엔드      | [pearl1233333](https://github.com/pearl1233333) |

## 🎞 시연 영상
- 사용자 : https://www.youtube.com/watch?v=N9YjAZHWraE
- 관리자 : https://www.youtube.com/watch?v=9p1A91r_M4w

## 🛠 활용 장비 및 재료
<div style="display: flex; flex-direction: row;">
<img src="https://img.shields.io/badge/HTML5-3DDC84?style=flat-square&logo=html&logoColor=white"/>
<img src="https://img.shields.io/badge/CSS3-3DDC84?style=flat-square&logo=css&logoColor=white"/>
<img src="https://img.shields.io/badge/SASS-3DDC84?style=flat-square&logo=SASS&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-3DDC84?style=flat-square&logo=JavaScript&logoColor=white"/>
<img src="https://img.shields.io/badge/react-3DDC84?style=flat-square&logo=react&logoColor=white"/>
<img src="https://img.shields.io/badge/Java-3DDC84?style=flat-square&logo=Java&logoColor=white"/>
<img src="https://img.shields.io/badge/mariaDB-3DDC84?style=flat-square&logo=mariaDB&logoColor=white"/>
<img src="https://img.shields.io/badge/SpringBoot-3DDC84?style=flat-square&logo=SpringBoot&logoColor=white"/>
<img src="https://img.shields.io/badge/JPA-3DDC84?style=flat-square&logo=JPA&logoColor=white"/>
</div>

## 📑 프로젝트 수행절차
- 총 개발기간 8/1 ~ 9/1
- 8/1 ~ 8/3 프로젝트 기획 및 주제선정
- 8/4 ~ 8/7 화면설계, DB설계, 데이터 수집
- 8/7 ~ 8/27 서비스 구축, 테스트
- 8/27 ~ 9/1 서버 배포

## ☝ 화면설계
Figma https://url.kr/6t7ejs

## ✌ DB설계
<img src="https://github.com/roalwh/Project-OMDB-Public/assets/121986519/cc4d2924-af5f-4bd4-8946-ab14051bf127" />

## 👌 기능설계
<h3>사용자 관리</h3>
<ul>
<li>JWT 기반 로그인</li>
<li>패스워드 암호화(BCrypt)</li>
<li>이메일 인증</li>
<li>관리자/일반사용자 권한 분리</li>
<li>마이페이지</li>
</ul>

<h3>정보 제공</h3>
<ul>
<li>전통주 검색</li>
<li>전통주 정보 제공</li>
<li>검색 정렬 기능</li>
<li>리뷰 작성, 수정, 삭제</li>
</ul>

<h3>취향 파악</h3>
<ul>
<li>5가지 질문을 통해 취향 검색</li>
<li>질문 기준으로 전통주 추천</li>
</ul>

<h3>지역별 안내</h3>
<ul>
<li>지도를 이용한 지역 검색</li>
<li>지역별 전통주 표시</li>
</ul>

<h3>커뮤니티</h3>
<ul>
<li>공지글, 자유글, 맛집 추천 글 작성, 수정, 삭제</li>
<li>검색 정렬 기능</li>
<li>댓글 작성, 수정, 삭제</li>
</ul>


## 🤚 API
관리자(admin)   API|   |  
-- | -- | --
기능 | Method | URL
관리자 리스트 조회 | GET | /admin/adminlist
사용자 리스트 조회 | GET | /admin/userlist
userFlag 수정 | PUT | /admin/userset
관리자 등록 | POST | /admin/signup
처음 관리자 등록 | POST | /admin/signup/new

게시글(board)   + 댓글(comment) API | |  
-- | -- | --
기능 | Method | URL
게시글등록 + 파일등록   add | POST | /board/add
게시글 파일 가져오기 | GET | /board/files/{board_id}
게시글수정 update | PUT | /board/update/{board_id}
게시글삭제 inactive   board | PUT | /board/inactive/{board_id}
전체 게시글 보기 all   view | GET | /board/view/all
게시판 종류별 글보기 이름   검색  kind title orderby | GET | /board/view?kind={kind_no}&orderby={정렬할   컬럼}
게시글 상세보기 + 댓글   보기 | GET | /board/view/{board_id}
댓글 조회 view | GET | /board/comment/no/{comment_id}
댓글 수정 update | PUT | /board/comment/update/{comment_id}
댓글 삭제 inactive | PUT | /board/comment/inactive/{comment_id}
댓글 등록 add | POST | /board/comment/add

주종별   전통주(drink) + 리뷰(review) API|   |    
-- | -- | --
기능 | Method | URL
술검색 | GET | /cate/search?name={drink_name}
술정보 | GET | /cate/info/{drink_id}
술정보 리뷰조회 | GET | /cate/review/{drink_id}
전체 술정보 | GET | /cate/all
리뷰 이미지 호출 | GET | /rimg/4/52/review_10_52.png
리뷰 등록 | POST | /cate/reviewin
리뷰  수정 | PUT | /cate/reviewedit/{review_id}
리뷰 삭제 | DEL | /admin/reviewdel/{review_id}

전통주(drink)   + 리뷰(review) API|   |  
-- | -- | --
기능 | Method | URL
술정보 검색 | GET | /dri/{drink_id}
카테고리 or 이름 검색 | GET | /dri/search?name={drink_name}
술 이미지 호출 | GET | /dimg/{drink_id}/drink_553.png
술 좋아요 조회 | GET | /dlike/userList?uid={user_id}
술정보 등록 | POST | /dri/drinkIn
술정보 수정 | PUT | /dri/drinkedit/{drink_id}
술 좋아요 등록 | POST | /dlike/add

회원(member) API |   |  
-- | -- | --
기능 | Method | URL
회원가입 | POST | /auth/signup
로그인 | POT | /auth/login
회원정보 가져오기 | GET | /member/me
아이디 찾기 | POST | /auth/find-id
비밀번호 찾기 전 계정   확인 | POST | /auth/find-pw
비밀번호 변경 | PUT | /auth/change-pw/{user_id}
회원정보 수정 | PUT | /member/change-info
회원 탈퇴 | PUT | /auth/change-pw/{user_id}
이메일 발송 | POST | /auth/email
이메일 번호 확인 | GET | /auth/check-email/{number}

마이페이지(myPage) API |   |  
-- | -- | --
기능 | Method | URL
회원 게시글 가져오기 | GET | /member/board/{user_id}
회원 댓글 가져오기 | GET | /member/comment/{user_id}
회원 리뷰 가져오기 | GET | /member/review/{user_id}












