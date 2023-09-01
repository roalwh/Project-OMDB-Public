import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import adult_logo from "../../static/img/adult_logo.png";
import BlueButton from "../../components/BlueButton";
import axios from "axios";
import useDidMountEffect from "../../useDidMountEffect";

function LoginPage(user) {
  axios.defaults.baseURL = process.env.REACT_APP_API_HOST;

  const userStatus = "user";
  const [userId, setUserId] = useState(""); // 로그인 아이디
  const [password, setPassword] = useState(""); // 로그인 비밀번호
  const [message, setMessage] = useState("로그인이 필요합니다."); // 안내 메시지

  // const { handleLogin } = useContext(UserContext);
  const navigate = useNavigate();

  let token = sessionStorage.getItem("token");

  /* 탈퇴, 중지된 회원 안내 */
  useDidMountEffect(() => {
    alert(message);
  }, [message]);

  /** 로그인 함수 */
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // console.log("안먹혔지롱");
    axios
      .post("/auth/login", {
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
          // handleLogin(true);
          navigate("/", true);
        }
      })
      .catch((error) => {
        setMessage(error.response.data.message);
        // console.error("Error during login:", error);
      });
  };

  /** 구글 로그인 함수 */
  const googleLoginHandler = (e) => {
    e.preventDefault();

    // const popupOption = "width=600, height=800, left=pixels, top=pixels,";
    window.open(
      `${process.env.REACT_APP_API_HOST}/oauth2/authorization/google`,
      "_parent"
    );
  };

  // useEffect(() => {
  //   setUserStatus(user.user);
  // }, []);

  /** 로그인 함수 */
  const handleAdminSubmit = (e) => {
    console.log(userId);
    console.log(password);
    e.preventDefault();

    axios
      .post("/admin/login", {
        id: userId,
        password: password,
      })
      .then((res) => {
        console.log("res.status: ", res.status);
        if (res.status !== 200) {
          return alert("로그인에 실패하였습니다. 다시 시도해주세요~");
        }
        return res.data; // res.json() 대신 res.data 사용
      })
      .then((data) => {
        if (data) {
          localStorage.setItem("token", data.accessToken);
          localStorage.setItem("expirationTime", String(data.tokenExpiresIn));
          // handleLogin(true);
          // navigate(-1);
        }
      })
      .catch((error) => {
        setMessage(error.response.data.message);
        // console.error("Error during login:", error);
      });
  };

  return (
    <>
      {token ? (
        navigate("/", true)
      ) : (
        <div id="login">
          <div className="container">
            {userStatus !== "admin" ? (
              <div className="login_wran">
                <div className="login_wran__img">
                  <img src={adult_logo} alt="성년가능 로고" />
                </div>
                <div className="login_wran__text">
                  <p>
                    이 정보내용은 청소년유해매체물로서 정보통신망이용촉진 및
                    정보보호등에 관한 법률 및 청소년보호법의 규정에 의하여 19세
                    미만의 청소년이 이용할 수 없습니다.
                  </p>
                </div>
              </div>
            ) : null}

            <div className="login_box">
              <h2 className="login_title">
                {userStatus === "admin" ? "술렁술렁 관리자 " : null}로그인
              </h2>
              <form
                onSubmit={
                  userStatus === "admin" ? handleAdminSubmit : handleLoginSubmit
                }
              >
                <div className="input_area">
                  <input
                    className="input_box"
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="아이디"
                    autoComplete="username"
                    required
                  />
                  <input
                    className="input_box"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                    autoComplete="current-password"
                    required
                  />
                </div>

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
                {userStatus !== "admin" ? (
                  <div className="login_foot">
                    <div className="hr_line">
                      <hr />
                      <span>OR</span>
                      <hr />
                    </div>
                    {/* <a href={`${process.env.REACT_APP_API_HOST}/oauth2/authorization/google`}>
                      <div className="btn_google">
                      
                        <i className="ico_google"></i>구글계정으로 로그인
                      </div>
                      </a> */}
                    <div className="btn_google" onClick={googleLoginHandler}>
                      <i className="ico_google"></i>구글계정으로 로그인
                    </div>
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginPage;
