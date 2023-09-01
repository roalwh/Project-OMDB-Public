import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BoardHead from "./components/BoardHead";
import Editor from "./components/Editor";

const BoardEdit = ({allboard}) => {
  const isLogin = sessionStorage.getItem("isLogin");
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  //1.게시글 아이디

  const navigate = useNavigate();
  const params = useParams(); //게시글 파라미터
  const BItemId = params.bid;
  // console.log("prams : ", params);
  // const [BItemId,setBItemId] = useState(params.bid);

  //게시글 정보
  const [bItem, setBItem] = useState();
  // console.log("bItem : ", bItem);

  //게시글 정보 불러오기 - 파라미터값이랑 같은 글번호를 가진 글아이템 불러옴
  const bData = () => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `/board/view/${BItemId}`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .request(config)
      .then((res) => {
        // console.log("res : ", res);
        setBItem(res.data);
        // console.log("bItem 값 : ", bItem);
      })
      .catch((error) => {
        console.log(error);
        alert("저장실패ㅜ");
      });
  };

  useEffect(() => {
    bData();
  }, []);
  // console.log("bItem : ????", bItem);
  // console.log("수정 화면입니다")

  // 글 수정하기
  const onSubmit = (data) => {
    // data.preventDefault();
    if (window.confirm("게시글을 수정하시겠습니까?")) {
      const { kind, title, content, files } = data;
      const editData = {
        kind: kind,
        title: title,
        content: content,
      };
      axios
        .put(`/board/update/${BItemId}`, editData)
        .then((res) => {
          // console.log(dlikeData);
          // console.log(res.data);
          setBItem(res.data);
          alert("수정 성공");
          allboard(); 
        })
        .catch((error) => {
          alert("실패");
          console.error("Error while signing up:", error);
        });
    }
    navigate("/board/home", { replace: true });
  };

  if (!bItem) {
    return <div>데이터를 불러오고 있습니다...</div>;
  } else {
    return (
      <div id="board">
        <div className="container">
          <BoardHead />
          {/* ---------------------------------- */}
          <Editor initData={bItem} onSubmit={onSubmit} />
          {/* ---------------------------------- */}
        </div>
      </div>
    );
  }
};

export default BoardEdit;
