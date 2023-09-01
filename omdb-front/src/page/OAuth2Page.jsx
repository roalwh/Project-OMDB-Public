import React, { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OAuth2Page() {
  
    useEffect(() => {
        const accessToken = new URL(window.location.href).searchParams.get('accessToken');
        const expirationTimeIn = new URL(window.location.href).searchParams.get('expirationTimeIn');
        console.log('accessToken:', accessToken);
        console.log('expire:', expirationTimeIn);

        sessionStorage.setItem("token", accessToken);
        sessionStorage.setItem("expirationTime", expirationTimeIn);
        sessionStorage.setItem("isLogin", true);
  
    
        // navigate('/', true);
        // window.location.href = process.env.REACT_APP_PUBLIC_URL + '/?accessToken=' + accessToken + "&expirationTimeIn=" + expirationTimeIn;
        window.opener.location.href = process.env.REACT_APP_PUBLIC_URL + '/?accessToken=' + accessToken + "&expirationTimeIn=" + expirationTimeIn;
    
        window.close();

        
      }, []);



      // return (
      //   <>
      //   <h1 style={{marginTop:'100px'}}>구글 로그인</h1>
      //   </>
      // )
}

export default OAuth2Page;