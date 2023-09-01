import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import InputBox from "../../components/InputBox";
import BlueButton from "../../components/BlueButton";
import axios from "axios";
import useDidMountEffect from "../../useDidMountEffect";
import { UserContext } from "../../Admin";

export default function AdminLogin() {
  const [userId, setUserId] = useState(""); // 로그인 아이디
  const [password, setPassword] = useState(""); // 로그인 비밀번호
  const [message, setMessage] = useState("로그인이 필요합니다."); // 안내 메시지

  const { handleLogin } = useContext(UserContext);
  const navigate = useNavigate();

  /* 탈퇴, 중지된 회원 안내 */
  useDidMountEffect(() => {
    alert(message);
  }, [message]);

  // let isLogin = sessionStorage.getItem("isLogin");

  // if (isLogin) {
  //   return;
  // }

  /** 로그인 함수 */
  const handleAdminSubmit = (e) => {
    // console.log(userId);
    // console.log(password);
    e.preventDefault();

    axios
      .post("/admin/login", {
        id: userId,
        password: password,
      })
      .then((res) => {
        // console.log("res.status: ", res.status);
        if (res.status !== 200) {
          return alert("로그인에 실패하였습니다. 다시 시도해주세요~");
        }
        return res.data; // res.json() 대신 res.data 사용
      })
      .then((data) => {
        if (data) {
          sessionStorage.setItem("token", data.accessToken);
          sessionStorage.setItem("expirationTime", String(data.tokenExpiresIn));
          sessionStorage.setItem("isLogin", true);
          navigate("/admin", true);
        }
      })
      .catch((error) => {
        setMessage(error.response.data.message);
        // console.error("Error during login:", error);
      });
  };

  return (
    <>
      <div id="login">
        <div className="container">
          <div className="login_box">
            <h2 className="login_title">관리자 로그인</h2>
            <form onSubmit={handleAdminSubmit}>
              <InputBox
                placeText1="아이디"
                text1={userId}
                setText1={setUserId}
                type1="text"
                placeText2="비밀번호"
                text2={password}
                setText2={setPassword}
                type2="password"
              />
              <div className="find_area">
                <Link to="/findid">아이디 찾기</Link>
                <Link to="/findpw">비밀번호 찾기</Link>
              </div>

              <div className="btn_area">
                <BlueButton text="로그인" />
                <Link to="/signup">
                  <button className="btn_submit type-2">회원가입</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
