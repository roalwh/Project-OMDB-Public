// import './Editor.css';
import React, { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";

const Editor = ({ initData, onSubmit }) => {
  // console.log("@@@@@@@@@@@@@@")
  // console.log("initData ?: ", initData);
  // console.log("@@@@@@@@@@@@@@")
  const navigate = useNavigate();
  const isLogin = sessionStorage.getItem("isLogin");
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  // console.log("userData : ", userData);

  const [state, setState] = useState({ //editor 기본값 state
    uid: userData.uid,
    kind: "",
    title: "",
    content: "",
    files: "",
  });

  useEffect(() => {
    if (userData.authority === "ROLE_USER") {
      setBoardKindOptions(BoardKindOptions1);
      setState({
        ...state,
        kind: 2,
        uid: userData.uid,
      });
    } else {
      setBoardKindOptions(BoardKindOptions2);
      setState({
        ...state,
        kind: 1,
        uid: userData.uid,
      });
    }
  }, []);

  useEffect(() => {
    if (initData) {
      if (userData.authority === "ROLE_USER") {
        setBoardKindOptions(BoardKindOptions1);
        setState({
          ...state,
          kind: 2,
          uid: initData.uid,
          title: initData.title,
          content: initData.content,
        });
      } else {
        setBoardKindOptions(BoardKindOptions2);
        setState({
          ...state,
          kind: 1,
          uid: userData.uid,
          title: initData.title,
          content: initData.content,
        });
      }
    }
  }, [initData]);

  // useEffect(() => {
  //   console.log("state : ", state);
  // }, [state]);

  const [BoardKindOptions, setBoardKindOptions] = useState([]);
  //게시판 종류
  const BoardKindOptions1 = [
    { value: 2, name: "자유" },
    { value: 3, name: "맛집" },
  ];

  const BoardKindOptions2 = [
    { value: 1, name: "공지" }, //운영자만 공지 쓸수 있게 하기
    { value: 2, name: "자유" },
    { value: 3, name: "맛집" },
  ];

  //게시판 종류 선택
  const handleChangeBoardKind = (e) => {
    setState({
      ...state,
      kind: e.target.value,
    });
  };

  // 제목 입력
  const handleChangeTitle = (e) => {
    setState({
      ...state,
      title: e.target.value,
    });
  };

  // 게시글 입력 기능
  const handleChangeContent = (e) => {
    setState({
      ...state,
      content: e.target.value,
    });
  };

  // 파일업로드 상태
  const [filename, setFilename] = useState("");
  // 파일업로드 기능
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const setfile = event.target.files[0];
    if (selectedFile) {
      if (window.FileReader) {
        setFilename(selectedFile.name);
      } else {
        const filenameParts = event.target.value.split("\\");
        setFilename(filenameParts[filenameParts.length - 1]);
      }

      setState({
        ...state,
        files: setfile,
      });
    } else {
      setFilename("");
    }
  };

  // <작성 완료> 버튼 기능
  const handleSubmit = () => {
    onSubmit(state);
  };

  // <취소하기> 버튼 기능
  const handleOnGoBack = () => {
    navigate("/board/home/");
  };


  return (
    <div className="Editor">
      <form className="board__body">
        <table className="board__table">
          <colgroup>
            <col style={{ width: "15%" }} />
            <col style={{ width: "85%" }} />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">게시판 종류</th>
              <td>
                {/* 카테고리 셀렉 area */}
                <div className="category_select">
                  <select
                    onChange={handleChangeBoardKind}
                    name="setkind"
                    className="selectBox"
                  >
                    {BoardKindOptions.map((it, index) => (
                      <option key={index} value={it.value}>
                        {it.name}
                      </option>
                    ))}
                  </select>
                </div>
              </td>
            </tr>

            {/* 작성자 area --- ${sessionId} */}
            <tr>
              <th scope="row">작성자</th>
              <td>
                <div>
                  <span type="text"> {userData.nick}</span>
                </div>
              </td>
            </tr>

            {/* 제목 area */}
            <tr>
              <th scope="row">제목</th>
              <td>
                <input
                  type="text"
                  name="title"
                  placeholder="제목"
                  defaultValue={state.title}
                  onChange={handleChangeTitle}
                />
              </td>
            </tr>

            {/* 콘텐츠 area */}
            <tr>
              <th scope="row">내용</th>
              <td className="write_editor">
                <div className="form_element"></div>
                <textarea
                  name="contents"
                  cols="20"
                  rows="10"
                  defaultValue={state.content}
                  style={{ paddingLeft: "10px" }}
                  onChange={handleChangeContent}
                ></textarea>
              </td>
            </tr>

            {/* 첨부파일 area */}
            <tr>
              <th scope="row" onClick={handleSubmit}>첨부파일</th>
              <td className="uploadBox">
                <div className="file-upload">
                  <input
                    type="text"
                    className="upload-name"
                    value={filename}
                    title="파일 첨부하기"
                    readOnly
                  />
                  <label htmlFor="ex_filename">업로드</label>
                  <input
                    type="file"
                    name="files"
                    id="ex_filename"
                    className="upload-hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="board__foot">
          <button type="text" onClick={handleOnGoBack} className="btn_form type-2">
            취소
          </button>
          <button type="submit" onClick={handleSubmit} className="btn_form">
            저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default Editor;
