import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlueButton from "../../components/BlueButton";
import InputBox from "../../components/InputBox";

function FindIdPage() {

  const navigate = useNavigate();

  const [name, setName] = useState(""); // 이름
  const [email, setEmail] = useState(""); // 이메일
  const [userId, setUserId] = useState(""); // 찾은 아이디

  /** 아이디 찾기 */
  const handleFindIdSubmit = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_HOST}/auth/find-id`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    })
      .then((res) => {
        console.log("res.status: ", res.status);
        if (res.status !== 200) {
          return alert("아이디 찾기에 실패하였습니다.");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUserId(data.id);
      });
  };

  const goLogin = () => {
    navigate("/login");
  };

  const goFindPw = () => {
    navigate("/findpw");
  };

  return (
    <div id="login">
      <div className="container">
        <div className="login_box">
          <h2 className="login_title">아이디 찾기</h2>
          {!userId && (
            <form onSubmit={handleFindIdSubmit}>
              <InputBox
                placeText1="이름"
                text1={name}
                setText1={setName}
                type1="text"
                placeText2="이메일"
                text2={email}
                setText2={setEmail}
                type2="text"
              />
              <BlueButton text="아이디 찾기" />
            </form>
          )}
          {userId && (
            <>
              <div className="getUserId">
                <div className="text">
                  회원님의 아이디는 <strong>{userId}</strong> 입니다.
                </div>
              </div>
              <BlueButton text="로그인하기" onClick={goLogin} />
              <button className="btn_submit type-2 mb-0" onClick={goFindPw}>
                비밀번호 찾기
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FindIdPage;
