import React, { useLayoutEffect, useState, useEffect } from "react";
import { Route, Routes, useLocation  } from "react-router-dom";

// 레이아웃
import Header from "./layout/Header";
import Main from "./page/Main";
import Footer from "./layout/Footer";

// 우리술 소개
import InfoPage from "./page/InfoPage";
import InfoDetailPage from "./page/InfoDetailPage";

// 우리술 찾기
import FindPage from "./page/FindPage";
import DetailPage from "./page/DetailPage";

// 우리술 취향
import DrinkTest from "./page/DrinkTest";

// 우리술 지도
import MapPage from "./page/MapPage";

// 게시판
import BoardPage from "./page/Board/BoardPage";
import SubPage from "./page/SubPage";

// 로그인 회원가입 마이페이지
import SignupPage from "./page/MemberPage/SignupPage";
import LoginPage from "./page/MemberPage/LoginPage";
import FindIdPage from "./page/MemberPage/FindIdPage";
import FindPwPage from "./page/MemberPage/FindPwPage";
import MyPage from "./page/MyPage";

// CSS
import "./static/css/common.css";
import "./static/css/member.css";
import "./static/css/pearl.css";
import "./static/css/reset.css";
import "./static/css/subpage.scss";
import axios from "axios";

/* 1. useContext 선언 */
export const UserContext = React.createContext();

function App() {
  // axios 기본경로 
  axios.defaults.baseURL = process.env.REACT_APP_API_HOST;


  /* 2. useContext 로 관리할 변수들 ]-------------  */
  const [isLogin, setIsLogin] = useState(null); // 로그인 유무
  const [userData, setUserData] = useState([]); // 사용자 데이터 

  const handleLogin = (state) => {
    setIsLogin(state);
  }
  const inputUserData = (data) => {
    setUserData(data);
  }
  /* -------------------------------------------- */


  // const [isShowMainNavigation, setIsShowMainNavigation] = useState(true);

  const location = useLocation();

  const sessionToken = sessionStorage.token;

  useLayoutEffect(() => {
    if (location.pathname === "/") {
      if (!sessionToken) {
        const accessToken = new URL(window.location.href).searchParams.get(
          "accessToken"
        );
        if (accessToken) {
          const expireTime = new URL(window.location.href).searchParams.get(
            "expirationTimeIn"
          );
          const expireTimeDate = new Date(Number(expireTime));

          sessionStorage.setItem("token", accessToken);
          sessionStorage.setItem("expirationTime", expireTimeDate);
          sessionStorage.setItem("isLogin", true);

          setIsLogin(true);
          // navigate('/', true);
          window.location.href = process.env.REACT_APP_PUBLIC_URL;
        }
      }
    }
    if (
      location.pathname === "/popup-google" ||
      location.pathname === "/oauth2login/callback"
    ) {
      // setIsShowMainNavigation(false);
    }
  }, [location, sessionToken]);

  useEffect(() => {
    // console.log("location.pathname:", location.pathname);
    if (location.pathname === "/") {
      if (sessionToken) {
        setIsLogin(true);
      }
    }
  }, [location, sessionToken]);

  return (
    <>
      {/* 3. context provider 주입 */}
      <UserContext.Provider
        value={{ isLogin, setIsLogin, userData, setUserData, handleLogin, inputUserData }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />

          {/* <Route path="/login" element={() => isLogin? navigate("/") : <LoginPage />}  /> */}
          <Route path="/login" element={<LoginPage />}  />

          <Route path="/signup" element={<SignupPage />} />
          <Route path="/findid" element={<FindIdPage />} />
          <Route path="/findpw" element={<FindPwPage />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/subpage" element={<SubPage />} />
          <Route path="/find" element={<FindPage />} />
          <Route path="/infopage/info" element={<InfoPage />} />
          <Route path="/infoDetailpage" element={<InfoDetailPage />} />
          <Route path="/mappage" element={<MapPage />} />
          <Route path="/board/*" element={<BoardPage />} />
          {/* <Route path="/boardpage/:idx" element={<BoardDetail />} /> */}
          <Route path="/:did" element={<DetailPage />} />
          <Route path="/drinktest" element={<DrinkTest />} />
        </Routes>
      </UserContext.Provider>
      <Footer />
    </>
  );
}

export default App;
