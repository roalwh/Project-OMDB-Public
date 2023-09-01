import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MemberInfo from "../components/mypageComponets/MemberInfo";
import MemberDrop from "../components/mypageComponets/MemberDrop";
import MyReview from "../components/mypageComponets/MyReview";
import MyBoard from "../components/mypageComponets/MyBoard";
import MyComment from "../components/mypageComponets/MyComment";
import MyDrink from "../components/mypageComponets/MyDrink";

function MyPage() {
  let isLogin = sessionStorage.getItem("isLogin");
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const uid = userData.uid;


  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

  return (
    <div id="mypage">
      <div className="container">
        {/* <div className="mypage_top">
          <div className="mypage_profile">
            <div className="mypage_symbol">
              <span>소주애주가</span>
            </div>
            <p className="mypage_welcome">
              <strong>{nick}</strong>님 환영합니다
            </p>
          </div>
        </div> */}
        <div className="mypage_bottom">
          <div className="mypage_menu">
            <dl>
              <dt className="title">나의술</dt>
              <dd className="name">
                <a href="#tab1" onClick={() => setTab(0)}>
                  <i className="ico_menu1"></i>나의 술 리뷰
                </a>
              </dd>
              <dd className="name">
                <a href="#tab2" onClick={() => setTab(1)}>
                  <i className="ico_menu2"></i>찜한 술
                </a>
              </dd>
            </dl>
            <dl>
              <dt className="title">커뮤니티</dt>
              <dd className="name">
                <a href="#tab3" onClick={() => setTab(2)}>
                  <i className="ico_menu3"></i>내가 쓴 글
                </a>
              </dd>
              <dd className="name">
                <a href="#tab4" onClick={() => setTab(3)}>
                  <i className="ico_menu4"></i>내가 쓴 댓글
                </a>
              </dd>
            </dl>
            <dl>
              <dt className="title">회원정보</dt>
              <dd className="name">
                <a href="#tab5" onClick={() => setTab(4)}>
                  <i className="ico_menu5"></i>회원정보수정
                </a>
              </dd>
              <dd className="name">
                <a href="#tab6" onClick={() => setTab(5)}>
                  <i className="ico_menu6"></i>회원탈퇴
                </a>
              </dd>
            </dl>
          </div>
          <div className="mypage_content">
            {/* 내가 쓴 술리뷰 */}
            {tab === 0 ? (
              <div className="mypage_cont--1">
                <MyReview uid={uid} />
              </div>
            ) : null}
            {tab === 1 ? (
              <div className="mypage_cont--2">
                <MyDrink uid={uid} />
              </div>
            ) : null}
            {/* 내가 쓴 게시판 */}
            {tab === 2 ? (
              <div className="mypage_cont--3">
                <MyBoard uid={uid} />
              </div>
            ) : null}
            {/* 내가 쓴 댓글 */}
            {tab === 3 ? (
              <div className="mypage_cont--4">
                <MyComment uid={uid} />
              </div>
            ) : null}
            {tab === 4 ? (
              <div className="mypage_cont--5">
                <h2 className="mypage_cont__title">회원정보수정</h2>
                <div className="mypage_cont">
                  <MemberInfo />
                </div>
              </div>
            ) : null}
            {tab === 5 ? (
              <div className="mypage_cont--5">
                <h2 className="mypage_cont__title">회원탈퇴</h2>
                <div className="mypage_cont">
                  <MemberDrop />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
