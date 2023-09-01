import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BoardHead from "./components/BoardHead";
import Editor from "./components/Editor";
import axios from "axios";


function BoardNew({allboard}) {
  const isLogin = sessionStorage.getItem("isLogin");
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const navigate = useNavigate();
  const [nData, setNData] = useState({});


  // 새글 등록
  const onSubmit = (datas) => {
    if(userData) {
      console.log(datas);
      const { uid, kind, title, content, files } = datas;
      console.log("data:", datas);
      const FormData = require('form-data');
      const data = new FormData();
      data.append('uid',uid);
      data.append('kind',kind);
      data.append('title',title);
      data.append('content',content);
      data.append('files',files);
      console.log(data);
      
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: '/board/add',
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: data
      };
  
      axios.request(config)
        .then((res) => {
          console.log(res);
          alert("저장되었습니다.");
          allboard();
          setNData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
      navigate("/board/home/", { replace: true });
  };

  // useEffect(()=>{

  // },[nData])
  

  return (
    <div id="board">
      <div className="container">
        <BoardHead />
        {/* ---------------------------------- */}
        <Editor onSubmit={onSubmit} />
        {/* ---------------------------------- */}
      </div>
    </div>
  );
}

export default BoardNew;
