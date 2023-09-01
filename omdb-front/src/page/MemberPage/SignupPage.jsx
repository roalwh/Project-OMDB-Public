import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignupPage() {
  const navigate = useNavigate();

  let token = sessionStorage.getItem("token");

  /* 회원가입 정보 */
  const [userId, setUserId] = useState(""); // 아이디
  const [password, setPassword] = useState(""); // 패스워드
  const [password2, setPassword2] = useState(""); // 패스워드 확인
  const [name, setName] = useState(""); // 사용자 이름
  const [nick, setNick] = useState(""); // 닉네임
  const [email, setEmail] = useState(""); // 이메일
  const [selectedEmail, setSelectedEmail] = useState(""); // 이메일 도메인 선택
  const [phone, setPhone] = useState(""); // 폰번호
  const [address, setAddress] = useState(""); // 주소
  const [birth, setBirth] = useState(""); // 생년월일
  const [gender, setGender] = useState(3); // 성별

  const currentYear = new Date().getFullYear();

  const [errorMessage, setErrorMessage] = useState(""); // 입력 에러 메시지
  const [pwMessage, setPwMessage] = useState(""); // 비밀번호 일치여부 메시지
  const [idMessage, setIdMessage] = useState(""); // 아이디 중복여부 메시지
  // const [authMsg, setAuthMsg] = useState(''); // 이메일 인증여부 메시지
  const [doubleCheck, setDoubleCheck] = useState(null); // 아이디 중복여부 체크
  const [numberCheck, setNumberCheck] = useState(null); // 이메일 인증번호 체크
  const [num, setNum] = useState(""); // 이메일 인증번호
  const [adultCheck, setAdultCheck] = useState(true); // 성인여부 확인

  // 이메일 도메인 선택
  const emailOptions = [
    { label: "직접입력", value: "" },
    { label: "@gmail.com", value: "@gmail.com" },
    { label: "@naver.com", value: "@naver.com" },
    { label: "@daum.net", value: "@daum.net" },
    { label: "@kakao.com", value: "@kakao.com" },
  ];
  const handleEmailChange = (e) => {
      setSelectedEmail(e.target.value);
  };

  const goback = () => {
    navigate("/login");
  };

  /* 성인 확인 */
  useEffect(() => {
    const MemberYear = birth.substr(0, 4);
    if (currentYear - MemberYear <= 18) {
      // 2023년 기준 2004년까지 주류 구매 가능
      setAdultCheck(false);
    }
  }, [birth]);

  //   /* 비밀번호 일치 실시간 확인 */
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

  /* 아이디중복 확인 메시지 입력 */
  useEffect(() => {
    // console.log("useEffect의 doubleCheck", doubleCheck);
    if (doubleCheck === true) setIdMessage("이미 사용중인 아이디입니다.");
    if (doubleCheck === false) setIdMessage("사용 가능한 아이디입니다.");
  }, [doubleCheck]);

  // 중복확인 후 아이디를 변경하면 중복확인 다시 할 수 있도록 함
  useEffect(() => {
    setDoubleCheck(null);
  }, [userId]);

  // 인증번호 확인 후 이메일 변경하면 다시 이메일 확인 할 수 있도록 함
  useEffect(() => {
    setNumberCheck(null);
  }, [email]);

  /* 이메일 인증 확인 메시지 입력 */
  useEffect(() => {
    // console.log("useEffect의 numberCheck", numberCheck);
    if (numberCheck === true) alert("이메일 인증 성공");
    if (numberCheck === false) alert("이메일 인증 실패");
  }, [numberCheck]);

  /* 아이디 중복 확인 함수 */
  const handleCheckUserId = async (e) => {
    e.preventDefault();

    axios
      .get(`auth/check-id/${userId}`)
      .then((res) => {
        setDoubleCheck(res.data);
        // console.log("handleCheckUserId", doubleCheck);
      })
      .catch((error) => {
        console.log("통신안됨");
      });
  };

  /* 이메일 발송 */
  const submitEmail = async (e) => {
    e.preventDefault();

    const data = { email: email + selectedEmail };

    axios
      .post("/auth/email", data)
      .then((res) => {
        // console.log(res);
        alert(res.data);
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

  /* 회원가입 함수 */
  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      // 비밀번호 불일치시 회원가입 불가
      setPwMessage("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (doubleCheck !== false) {
      // 아이디 중복 체크 안했을 시 회원가입 불가
      alert("아이디 중복 체크를 하세요.");
      return;
    }
    if (numberCheck !== true) {
      // 이메일 인증 안했을 시 회원가입 불가
      alert("이메일 인증을 하세요.");
      return;
    }
    if (adultCheck !== true) {
      alert("미성년자는 회원가입이 불가합니다.");
      return;
    }

    const signUpData = {
      id: userId,
      password: password,
      name: name,
      nick: nick,
      email: email + selectedEmail,
      phone: phone,
      address: address,
      birth: birth,
      gender: gender,
    };
    // console.log(signUpData);

    axios
      .post("/auth/signup", signUpData)
      .then((res) => {
        // 회원가입 성공 시 처리
        // console.log(res.data);
        alert("회원가입 성공");
        navigate("/login");
      })
      .catch((error) => {
        // 회원가입 실패 시 처리
        alert("회원가입 실패");
        console.error("Error while signing up:", error);
        // 에러 원인 메시지 보여주기
        setErrorMessage(error.response.data.errors[0].defaultMessage);
        console.log(error.response.data.errors);
        alert(errorMessage);
      });
  };

  return (
    <>
    { token ?
    navigate("/", true) : (
      
    <div id="singup">
      <div className="container">
        <div className="login__head">
          <h3 className="login__title">회원가입</h3>
        </div>
        <div className="login__body">
          <div className="sub_title">
            <h4>개인정보</h4>
            <span>* 표시는 반드시 입력하셔야 하는 항목입니다.</span>
          </div>
          <form onSubmit={handleSignupSubmit}>
            <div className="login__form">
              <div className="form_row type-2">
                {" "}
                {/* 아이디 */}
                <label className="lbl">* 아이디</label>
                <div className="form_input">
                  <input
                    className="input_user"
                    type="text"
                    value={userId}
                    autoComplete="username"
                    onChange={(e) => setUserId(e.target.value)}
                  />
                </div>
                <button className="btn_form" onClick={handleCheckUserId}>
                  중복확인
                </button>
              </div>
              <div
                className="error_message"
                style={doubleCheck ? { color: "red" } : { color: "green" }}
              >
                {idMessage}
              </div>
              <div className="form_row">
                {" "}
                {/* 비밀번호 */}
                <label className="lbl">* 비밀번호</label>
                <input
                  className="input_user"
                  type="password"
                  value={password}
                  placeholder="비밀번호는 8자리 이상이면서 알파벳, 숫자, 특수문자를 포함해야합니다."
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form_row">
                {" "}
                {/* 비밀번호 확인 */}
                <label className="lbl">* 비밀번호 확인</label>
                <div className="form_input w-100">
                  <input
                    className="input_user"
                    type="password"
                    value={password2}
                    autoComplete="new-password"
                    onChange={(e) => setPassword2(e.target.value)}
                  />
                </div>
              </div>
              <div className="error_message">{pwMessage}</div>
              <div className="form_row">
                {" "}
                {/* 이름 */}
                <label className="lbl">* 이름</label>
                <input
                  className="input_user"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form_row">
                {" "}
                {/* 닉네임 */}
                <label className="lbl">* 닉네임</label>
                <input
                  className="input_user"
                  type="text"
                  value={nick}
                  onChange={(e) => setNick(e.target.value)}
                />
              </div>
              <div className="form_row">
                {" "}
                {/* 이메일 */}
                <label className="lbl">* 이메일</label>
                <div className="form_email">
                  <div className="email_box">
                    <div className="email_box_inner">
                      <input
                        className="input_user"
                        type="text"
                        disabled={numberCheck ? true : false}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <select
                        value={selectedEmail}
                        onChange={handleEmailChange}
                        disabled={numberCheck ? true : false}
                        className="email_select"
                      >
                        {emailOptions.map((option, index) => (
                          <option 
                            key={index} 
                            value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={submitEmail}
                      className="btn_form"
                      id="auth_btn"
                    >
                      인증번호 발송
                    </button>
                  </div>
                  <div className="email_auth_box">
                    <div className="auth_label">인증번호</div>
                    <input
                      className="auth_input"
                      disabled={numberCheck ? true : false}
                      type="number"
                      value={num}
                      onChange={(e) => setNum(e.target.value)}
                    />
                    <button
                      onClick={checkEmailAuthNumber}
                      className="btn_form"
                      id="auth_ck_btn"
                    >
                      확인
                    </button>
                  </div>
                </div>
              </div>
              <div className="form_row">
                {" "}
                {/* 생년월일 + 성별 */}
                <label className="lbl">* 생년월일</label>
                <input
                  className="input_user"
                  type="text"
                  value={birth}
                  onChange={(e) => setBirth(e.target.value)}
                  placeholder="ex) 19930821"
                />
              </div>
              <div className="form_row">
                <label className="lbl">성별</label>
                <div className="gender_box">
                  <input
                    type="radio"
                    name="gender"
                    value="1"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <span>남성</span>
                </div>
                <div className="gender_box">
                  <input
                    type="radio"
                    name="gender"
                    value="2"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <span>여성</span>
                </div>
              </div>
              <div className="form_row">
                {" "}
                {/* 폰번호 */}
                <label className="lbl">휴대폰번호</label>
                <input
                  className="input_user"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder=" - 없이 입력하세요."
                />
              </div>
              <div className="form_row">
                {" "}
                {/* 주소 */}
                <label className="lbl">주소</label>
                <input
                  className="input_user"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="login__foot">
              <button className="btn_form" type="submit">
                회원가입
              </button>
              <button className="btn_form type-2" onClick={goback}>
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )};
  </>
  )
}

export default SignupPage;
