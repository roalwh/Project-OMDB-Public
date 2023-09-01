import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../App';

function MemberDrop() {
    const { handleLogin, userData, inputUserData } = useContext(UserContext);
    const member = userData;
    // const [cookie, setCookie, removeCookie] = useCookies(['token']);

    let navigate = useNavigate();
    const [ok, setOk] = useState(false); // 안내문 동의 여부

    /* 회원 정보 */
    const userId = member.id; // 아이디
    const [password, setPassword] = useState(''); // 패스워드
    const [check, setCheck] = useState(false);  //  패스워드 일치 여부 확인

    /** 회원 비밀번호 확인 - 로그인으로 */
    const handlePwCheck = (e) => {
        e.preventDefault();

        axios.post('/auth/login', {
            id: userId,
            password: password,
        })
            .then(res => {
                // console.log('res.status: ', res.status);
                if (res.status !== 200) {
                    return alert('비밀번호를 다시 입력해주세요.');
                }
                if (res.status === 200) { // 상태 코드 확인 수정
                    setCheck(true);
                }
                return res.data; // res.json() 대신 res.data 사용
            })
            .catch(error => {
                console.error('Error during password check:', error);
                alert('비밀번호를 확인하는 중에 오류가 발생하였습니다.');
            });
    }

    const agree = () => {
        setOk(!ok);
    }

    /* 회원 탈퇴처리 */
    const dropOutMember = async (e) => {
        e.preventDefault();

        if (ok) {
            axios.put(`/auth/drop/${userId}`)
                .then(res => {
                    // console.log(res);
                    alert("탈퇴되었습니다.");
                    sessionStorage.removeItem("isLogin");
                    sessionStorage.removeItem("userData");
                    sessionStorage.removeItem("token");
                    sessionStorage.removeItem("expirationTime");
                    handleLogin(false);
                    inputUserData(null);
                    navigate('/', true);
                })
                .catch(error => {
                    alert("다시 시도해주세요.");
                    console.error(error);
                });
        } else {
            alert("안내사항에 동의해주세요.");
            return;
        }
    };

    return (
        <div className='memberDrop_wrap'>
            {!check ?
                <form className='drop__form'>
                    <div className='drop__label'>
                        <label>아이디 : </label>
                        <span>{userId}</span>
                    </div>
                    <div className='drop__input'>
                        <input
                            type="password"
                            className='int'
                            value={password}
                            placeholder='비밀번호를 입력하세요'
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='drop__foot'>
                        <button
                            type='submit'
                            className='btn_submit'
                            onClick={handlePwCheck}
                        >확인</button>
                    </div>

                </form> :
                <form className='drop__wraning'>
                    <div className='drop__wraning_info'>
                        <div className='warning_text'>사용하고 계신 아이디 {userId} 는 탈퇴할 경우 재사용 및 복구가 불가능합니다.</div>
                        <div className='warning_text2'>&#8251; 게시판 서비스의 게시글 및 댓글은 탈퇴 후 삭제할 수 없습니다.</div>
                    </div>
                    <div className='drop__checkbox'>
                        <input
                            type="checkbox"
                            checked={ok}
                            className='chk'
                            onChange={agree} />
                        <span className='chk_info_text'> 안내 사항을 확인했으며, 이에 동의합니다.</span>
                    </div>
                    <div className='board__foot'>
                        <button
                            className='btn_form'
                            type='submit'
                            onClick={dropOutMember}
                        >
                            탈퇴하기
                        </button>
                    </div>
                </form>
            }
        </div>
    )
}

export default MemberDrop