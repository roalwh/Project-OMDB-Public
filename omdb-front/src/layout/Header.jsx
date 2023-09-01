import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../static/js/header.js";
import mainLogo from "../static/img/mainLogo.png";
import axios from "axios";
import { UserContext } from "../App";

export default function Header() {

  const { userData, handleLogin, inputUserData } = useContext(UserContext);
  const isLogin = sessionStorage.getItem("isLogin");
  // const userData = sessionStorage.getItem("userData");

  const [nick, setNick] = useState('');
  const navigate = useNavigate();

  const sessionToken = sessionStorage.token;


  const toggleLogoutHandler = () => {
    alert("로그아웃 하였습니다.");

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("expirationTime");
    sessionStorage.removeItem("isLogin");
    sessionStorage.removeItem("userData");
    // setIsLogin(false);
    handleLogin(false);
    // setUserData(null);
    inputUserData(null);
    navigate("/", true);
  };

  useEffect(() => {
    if (isLogin) {
      const accessToken = "Bearer " + sessionToken;

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: '/member/me',
        headers: {
          'Authorization': accessToken
        }
      };

      axios.request(config)
        .then((res) => {
          // console.log("header - res.data",res.data);
          if (res.data) {
            setNick(res.data.nick);
            // setUserData(res.data);
            inputUserData(res.data);
            sessionStorage.setItem("userData", JSON.stringify(res.data));
            // sessionStorage.setItem("userData",res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLogin]);

  /* 닉네임 바뀌면 header 닉네임에 적용되도록 */
  useEffect(() => {
    if (userData) {
      setNick(userData.nick);
    } else {
      setNick('');
    }
  }, [isLogin]);

  const [sidemenuActive, setSidemenuActive] = useState(false);
  const handleSidemenu = () => {
    setSidemenuActive(!sidemenuActive);
    if (!sidemenuActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }

  const closeSidemenu = () => {
    setSidemenuActive(false);
    document.body.style.overflow = "visible";
  };

  return (
    <>
      <header id="header">
        <div className="header_inner">
          <h1 className="logo">
            <Link to="/">
              <img src={mainLogo} />
              <p>술렁술렁</p>
            </Link>
          </h1>
          <nav className="gnb_wrap" id="gnb">
            <ul className="gnb_depth1">
              <li>
                <h2><Link to="/infopage/info">우리술 알기</Link></h2>
                <ul className="gnb_depth2">
                  <li className="link">
                    <Link to="/infoDetailpage">전통주란?</Link>
                  </li>
                  <li className="link">
                    <Link to="/infopage/info">전통주 종류</Link>
                  </li>
                </ul>
              </li>
              <li>
                <h2><Link to="/find">우리 술 찾기</Link></h2>
                <ul className="gnb_depth2">
                  <li className="link">
                    <Link to="/find">우리 술 찾기</Link>
                  </li>
                </ul>
              </li>
              <li>
                <h2><Link to="/drinktest">우리 술 취향</Link></h2>
                <ul className="gnb_depth2">
                  <li className="link">
                    <Link to="/drinktest">우리 술 취향</Link>
                  </li>
                </ul>
              </li>
              <li>
                <h2><Link to="/mappage">우리술 지도</Link></h2>
                <ul className="gnb_depth2">
                  <li className="link">
                    <Link to="/mappage">우리술 지도</Link>
                  </li>
                </ul>
              </li>
              <li>
                <h2><Link to="/board/home">커뮤니티</Link></h2>
                <ul className="gnb_depth2">
                  <li className="link">
                    <Link to="/board/home">커뮤니티</Link>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="gnb_bg"></div>
            <div className="gnb_util">
              <div className="gnb_search">
                <Link to="/find">
                  <i className="ico_search"></i>
                  <span>검색</span>
                </Link>
              </div>
              <div className="gnb_login">
                {!isLogin && (
                  <Link to="/login">
                    <i className="ico_login"></i>
                    <span>회원가입</span>
                  </Link>
                )}
              </div>
              {isLogin && ( // 로그인해야 보임
                <>
                  {/* 임시 마이페이지 */}
                  <div className="gnb_login">
                    <Link to="/myPage">
                      <i className="ico_login"></i>
                      <span>마이페이지</span>
                      <p className="nick_point">{nick}</p>
                    </Link>
                  </div>
                  <button className="logout_btn" onClick={toggleLogoutHandler}>
                    로그아웃
                  </button>
                </>
              )}
            </div>

          </nav>
          <div className="sideMenu">
            <div
              className="sideMenu_icon"
              onClick={
                handleSidemenu
              }>
              <span></span>
              <span></span>
              <span></span>
            </div>
            {
              sidemenuActive ? (
                <div className="sideMenu_list">
                  <div className="dim"
                    onClick={handleSidemenu}></div>
                  <div className="sideMenu_list__inner">
                    <button
                      className="btn_close"
                      onClick={handleSidemenu}><i className="ico_close"></i></button>
                    <div className="sideMenu_member">
                      <div className="gnb_util">
                        <div className="gnb_login">
                          {!isLogin && (
                            <Link to="/login" onClick={closeSidemenu}>
                              <i className="ico_login"></i>
                              <span>회원가입</span>
                              <p className="gnb_login_text">로그인이 필요합니다.</p>
                            </Link>
                          )}
                        </div>
                        {isLogin && ( // 로그인해야 보임
                          <>
                            {/* 임시 마이페이지 */}
                            <div className="gnb_login">
                              <Link to="/myPage" onClick={closeSidemenu}>
                                <i className="ico_login"></i>
                                <span>마이페이지</span>
                                <p className="nick_point">{nick}</p>
                              </Link>
                            </div>
                            <button className="logout_btn" onClick={toggleLogoutHandler}>
                              로그아웃
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <nav className="sideMenu_nav">
                      <ul>
                        <li>
                          <h2><Link to="/infopage/info" onClick={closeSidemenu}>우리술 알기</Link></h2>
                          <ul className="sideMenu_nav_depth2">
                            <li className="link">
                              <Link to="/infoDetailpage" onClick={closeSidemenu}>전통주란?</Link>
                            </li>
                            <li className="link">
                              <Link to="/infopage/info" onClick={closeSidemenu}>전통주 종류</Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <h2><Link to="/find" onClick={closeSidemenu}>우리 술 찾기</Link></h2>
                          <ul className="sideMenu_nav_depth2">
                            <li className="link">
                              <Link to="/find" onClick={closeSidemenu}>우리 술 찾기</Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <h2><Link to="/drinktest" onClick={closeSidemenu}>우리 술 취향</Link></h2>
                          <ul className="sideMenu_nav_depth2">
                            <li className="link">
                              <Link to="/drinktest" onClick={closeSidemenu}>우리 술 취향</Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <h2><Link to="/mappage" onClick={closeSidemenu}>우리술 지도</Link></h2>
                          <ul className="sideMenu_nav_depth2">
                            <li className="link">
                              <Link to="/mappage" onClick={closeSidemenu}>우리술 지도</Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <h2><Link to="/board/home" onClick={closeSidemenu}>커뮤니티</Link></h2>
                          <ul className="sideMenu_nav_depth2">
                            <li className="link">
                              <Link to="/board/home" onClick={closeSidemenu}>커뮤니티</Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>

                </div>
              ) : null
            }
          </div>
        </div>
      </header>
    </>
  );
} 