import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../../App';

function MemberInfo() {
  const { userData, inputUserData } = useContext(UserContext);
  const member = userData;
  // console.log("userData:",userData);

  /* 회원 정보 */
  const uid = userData.uid;
  const [userId, setUserId] = useState(''); // 아이디
  const [name, setName] = useState(''); // 사용자 이름
  const [nick, setNick] = useState(''); // 닉네임
  const [email, setEmail] = useState(''); // 이메일 
  const [selectedEmail, setSelectedEmail] = useState(''); // 이메일 도메인 선택 
  const [phone, setPhone] = useState(''); // 폰번호
  const [address, setAddress] = useState(''); // 주소
  // const [birth, setBirth] = useState(''); // 생년월일

  const [numberCheck, setNumberCheck] = useState('');  // 이메일 인증번호 체크
  const [num, setNum] = useState(''); // 이메일 인증번호

  useEffect(() => {
    setUserId(member.id);
    setName(member.name);
    setNick(member.nick);
    setEmail(member.email);
    setPhone(member.phone);
    setAddress(member.address);
  }, [member])

  // 이메일 도메인 선택
  const emailOptions = [
    { label: "직접입력", value: '1' },
    { label: "@gmail.com", value: "r@gmail.com" },
    { label: "@naver.com", value: "@naver.com" },
    { label: "@daum.net", value: "@daum.net" },
    { label: "@kakao.com", value: "@kakao.com" },
  ];
  const handleEmailChange = (e) => {
    setSelectedEmail(e.target.value);
  };


  /* 회원정보 변경 */
  const changeMemberInfo = async (e) => {
    e.preventDefault();

    if (member.email !== email) {
      alert("이메일 인증을 해야합니다.");
      return;
    }

    const data = {
      uid: uid,
      id: userId,
      nick: nick,
      name: name,
      email: email,
      phone: phone,
      address: address,
    };

    axios.put(`/member/change-info`, data)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          inputUserData(data);
          // sessionStorage.removeItem("userData");
          // sessionStorage.setItem("userData");
          alert("회원정보가 변경되었습니다.")
        }
      })
      .catch(error => {
        alert("비밀번호 변경 실패");
        console.error(error);

      });
  };


  /* 이메일 발송 */
  const submitEmail = async (e) => {
    e.preventDefault();

    const data = { email: email, };

    axios.post('/auth/email', data)
      .then(res => {
        console.log(res);
        alert("이메일 발송");
      })
      .catch(error => {
        alert("이메일 발송 실패");
        console.error(error);
      });
  };

  /* 이메일 인증번호 체크 */
  const checkEmailAuthNumber = async (e) => {
    e.preventDefault();

    axios.get(`auth/check-email/${num}`)
      .then(res => {
        setNumberCheck(res.data);
        console.log("checkEmailAuthNumber", numberCheck);
      })
      .catch(error => {
        console.log("통신안됨");
      })
  };


  return (
    <>
      <div className="login__body">
        <div className='sub_title'>
          <h4>개인정보</h4>
          <span>* 표시는 반드시 입력하셔야 하는 항목입니다.</span>
        </div>
        <form>
          <div className='login__form'>
            <div className='form_row'> {/* 아이디 */}
              <label className='lbl'>* 아이디</label>
              <input
                className='input_user'
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                disabled
              />
            </div>
            <div className='form_row'> {/* 이름 */}
              <label className='lbl'>* 이름</label>
              <input
                className='input_user'
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='form_row'> {/* 닉네임 */}
              <label className='lbl'>* 닉네임</label>
              <input
                className='input_user'
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
                  <input
                    className="input_user"
                    type="email"
                    disabled={numberCheck ? true : false}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <select
                    value={selectedEmail}
                    onChange={handleEmailChange}
                    disabled={numberCheck ? true : false}
                    className='email_select'>
                    {emailOptions.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
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
            <div className='form_row'> {/* 폰번호 */}
              <label className='lbl'>휴대폰번호</label>
              <input
                className='input_user'
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="'-' 을 제외하고 적어주세요"
              />
            </div>
            <div className='form_row'>  {/* 주소 */}
              <label className='lbl'>주소</label>
              <input
                className='input_user'
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className='login__foot'>
            <button
              className='btn_form'
              type="submit"
              onClick={changeMemberInfo}
            >
              정보수정</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default MemberInfo