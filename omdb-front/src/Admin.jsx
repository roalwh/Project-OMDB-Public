import React, { useLayoutEffect, useState, useEffect, useContext } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
// import LoginPage from "./page/MemberPage/LoginPage";
import AdminLogin from "./page/Admin/AdminLogin";
import AdminMain from "./page/Admin/AdminMain";
import DrinkNew from "./page/Admin/DrinkNew";
import axios from "axios";

// 1. useContext 선언
export const UserContext = React.createContext();

function Admin() {
  axios.defaults.baseURL = process.env.REACT_APP_API_HOST;

  // 2. useContext로 관리할 변수
  const [isLogin, setIsLogin] = useState(null);
  const [userData, setUserData] = useState([]);

  const handleLogin = (state) => {
    setIsLogin(state);
  };
  const inputUserData = (data) => {
    setUserData(data);
  };

  const location = useLocation();
  const navigate = useNavigate();

  const sessionToken = sessionStorage.token;

  // const [isShowMainNavigation, setIsShowMainNavigation] = useState(true);

  useLayoutEffect(() => {
    if (location.pathname === "/admin") {
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
  }, [location]);

  useEffect(() => {
    console.log("location.pathname:", location.pathname);
    if (location.pathname === "/admin") {
      if (sessionToken) {
        setIsLogin(true);
        console.log("admin", isLogin);
      }
    }
  }, [location, sessionToken]);

  return (
    <>
      {/* 3. context provider 주입 */}
      <UserContext.Provider
        value={{
          isLogin,
          setIsLogin,
          userData,
          setUserData,
          handleLogin,
          inputUserData,
        }}
      >
        <Routes>
          <Route path="/" element={<AdminMain />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/drink" element={<DrinkNew />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default Admin;
