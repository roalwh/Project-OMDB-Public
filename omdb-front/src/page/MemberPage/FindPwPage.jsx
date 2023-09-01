import React, { useState, useEffect } from "react";
import InputBox from "../../components/InputBox";
import BlueButton from "../../components/BlueButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FindPwPage() {
  axios.defaults.baseURL = process.env.REACT_APP_API_HOST;

  const [userId, setUserId] = useState(""); // 아이디
  const [email, setEmail] = useState(""); // 이메일
  const [uid, setUid] = useState(null);
  const [password, setPassword] = useState(""); // 패스워드
  const [password2, setPassword2] = useState(""); // 패스워드
  const [pwMessage, setPwMessage] = useState(null); // 비밀번호 일치여부 메시지
  const [numberCheck, setNumberCheck] = useState(null); // 이메일 인증번호 체크
  const [num, setNum] = useState(""); // 이메일 인증번호
  const [pwChangeOk, setPwChangeOk] = useState(false);

  const navigate = useNavigate();

  /* 로그인 화면으로 이동 */
  const goLogin = () => {
    navigate("/login");
  };

  /* 이메일 인증 확인 알람 출력 */
  useEffect(() => {
    console.log("useEffect의 numberCheck", numberCheck);
    if (numberCheck === true) alert("이메일 인증 성공");
    if (numberCheck === false) alert("이메일 인증 실패");
  }, [numberCheck]);

  /* 비밀번호 일치 실시간 확인 */
  useEffect(() => {
    if (password !== "" && password2 !== "") {
      // 비밀번호, 비밀번호 확인이 빈 값이 아닐 것
      if (password !== password2) {
        setPwMessage("비밀번호가 일치하지 않습니다.");
      } else {
        setPwMessage("");
      }
    }
  }, [password2]);

  /** 비밀번호 찾기 */
  const handleFindPwSubmit = (e) => {
    e.preventDefault();
    

    fetch(`${process.env.REACT_APP_API_HOST}/auth/find-pw`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId,
        email: email,
      }),
    })
      .then((res) => {
        console.log("res.status: ", res.status);
        if (res.status !== 200) {
          return alert("통신 문제 발생!!!");
        }
        return res.json();
      })
      .then((data) => {
        setUid(data);
        console.log(uid);
      });
  };

  /* 이메일 발송 */
  const submitEmail = async (e) => {
    e.preventDefault();

    const data = { email: email };

    axios
      .post("/auth/email", data)
      .then((res) => {
        console.log(res);
        alert("비밀번호 변경을 위한 인증 이메일을 발송합니다.");
      })
      .catch((error) => {
        alert("이메일 발송 실패");
        console.error(error);
      });
  };

  /* 이메일 인증번호 체크 */
  const checkEmailAuthNumber = async (e) => {
    e.preventDefault();

    axios
      .get(`auth/check-email/${num}`)
      .then((res) => {
        setNumberCheck(res.data);
        console.log("checkEmailAuthNumber", numberCheck);
      })
      .catch((error) => {
        console.log("통신안됨");
      });
  };

  /* 비밀번호 변경 */
  const changePassword = async (e) => {
    e.preventDefault();

    const data = { password: password };

    axios
      .put(`/auth/change-pw/${uid}`, data)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          setPwChangeOk(true);
        }
      })
      .catch((error) => {
        alert("비밀번호 변경 실패");
        console.error(error);
      });
  };

  return (
    <div id="login">
      <div className="container">
        <div className="login_box">
          <h2 className="login_title">비밀번호 찾기</h2>
          {!uid && (
            <>
              <InputBox
                placeText1="아이디"
                text1={userId}
                setText1={setUserId}
                type1="text"
                placeText2="이메일"
                text2={email}
                setText2={setEmail}
                type2="text"
              />
              <BlueButton text="계정 확인" onClick={handleFindPwSubmit} />
            </>
          )}
          {uid && !numberCheck ? (
            // 회원정보 확인되면 인증번호 발송 ui 로
            <div className="login__password">
              <div className="email_area">이메일 : {email}</div>
              <BlueButton text="인증번호 발송" onClick={submitEmail} />
              <div className="auth_box">
                <label>인증번호 </label>
                <input
                  disabled={numberCheck ? true : false}
                  type="number"
                  value={num}
                  onChange={(e) => setNum(e.target.value)}
                  className="input_style"
                />
                <button
                  onClick={checkEmailAuthNumber}
                  className="btn_form type-3"
                >
                  확인
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
          {numberCheck && !pwChangeOk ? ( // 인증번호 확인되면 비밀번호 변경
            <>
              <InputBox
                placeText1="비밀번호"
                text1={password}
                setText1={setPassword}
                type1="password"
                placeText2="비밀번호 확인"
                text2={password2}
                setText2={setPassword2}
                type2="password"
              />
              <div className="error_message">{pwMessage}</div>
              <BlueButton text="비밀번호 변경" onClick={changePassword} />
            </>
          ) : (
            <></>
          )}
          {pwChangeOk && (
            <>
              <div className="font_style">
                <div>{userId} 님의</div>
                <div> 비밀번호가 변경되었습니다.</div>
              </div>
              <BlueButton text="로그인하기" onClick={goLogin} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FindPwPage;
