import React, { useContext, useEffect, useState } from "react";
import Button from "./components/Button";
import { BoardStateContext } from "./BoardPage";
import { Link, useNavigate } from "react-router-dom";
import BoardHead from "./components/BoardHead";
import { UserContext } from "../../App";
import Pagination from "react-js-pagination";
import {
  AiOutlineLeft,
  AiOutlineDoubleLeft,
  AiOutlineRight,
  AiOutlineDoubleRight,
} from "react-icons/ai";

const BoardHome = (props) => {
  const Data = useContext(BoardStateContext);
  // console.log("boardHome :", props);
  const isLogin = props.isLogin;
  const userData = props.userData;
  const [state, setState] = useState([]);
  const [uid, setUid] = useState('');
  const propslist = props;

  let data = propslist.boraddata;
  const navigate = useNavigate();
  const [word, setWord] = useState("");
  const [selectedButton, setSelectedButton] = useState("전체보기"); // Initial selection


  // 게시판 Pagination - 페이지 바꾸기
  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
  };
  const startIndex = (page - 1) * 10;
  const endIndex = startIndex + 10;
  
// console.log(props.userData);
// console.log("data : ", data);

  // 글쓰기 onClick
  const goNew = () => {
    if (isLogin) {
      navigate("/board/new");
    } else {
      alert("로그인이 필요합니다.")
      navigate("/login");
    }
  };

  const goDetail = (a) => {
    navigate(`/board/detail/${a}`);
  };

  // 종류 검색
  const selestkind = (a) => {
    propslist.changekind(a);
    setWord("");
    propslist.changename("");
    propslist.selectboard();
  }
  // 전체글보기
  const selectall = () => {
    propslist.changekind();
    setWord("");
    propslist.allboard();
  }

  const handleSearchChange = (e) => {
    setWord(e.target.value);
  };

  const selestkindandname = (a) => {
    propslist.changename(a);
    propslist.selectboard();

  }

  

  // 카테고리
  const menus = [
    { text: "전체보기", onClick: () => { selectall() } },
    { text: "공지", onClick: () => selestkind(1) },
    { text: "자유", onClick: () => selestkind(2) },
    { text: "맛집", onClick: () => selestkind(3) },
    // { text: "후기", onClick: () => selestkind(4) },
  ];

  // 테이블 카테고리 컬러
  const labelColors = {
    1: "#BD2C19",
    2: "#3F5370",
    3: "#3169BD",
    // 4: "#1D3E70",
  };

  useEffect(()=>{
    
    if (userData) {
      setUid(userData.uid);
    } else {
      setUid('');
    }
    const fetchListData = () => {
      setState(data);
    }
  },[data]);

  // useEffect(()=>{
  //   selectall();
  // },[data]);

  if (!data) {
    return <div>데이터를 불러오는 중입니다.</div>;
  } else {
    const paginatedBoardData = data.slice(startIndex, endIndex);
    return (
      <div id="board" className="BoardHome">
        <div className="container">
          <BoardHead />
          <div className="board__body">
            <div className="board__list">
              {/* <Button text={"인기글 "} onClick={onChangeSortType}/> */}
            </div>
            <div className="board__list_wrap">
              <div className="board__list_menu">
                {menus.map((button, i) => (
                  <Button
                    key={i}
                    text={button.text}
                    onClick={() => {
                      setSelectedButton(button.text);
                      button.onClick();
                    }}
                    type={selectedButton === button.text ? "positive active" : "positive"}
                  />
                ))}
              </div>
              <div className="board__list_form">
                <div action="" className="board__list_search">
                  <input type="text"
                    value={word}
                    className="BoardSearch"
                    onChange={handleSearchChange}
                  />
                  <button type="text" onClick={() => selestkindandname(word)}>검색</button>
                </div>
                <div className="board__list_new">
                  {/* <Button text={"글쓰기"} onClick={goNew} /> */}
                  <a onClick={() => goNew()} style={{ cursor: "pointer" }} >
                    글쓰기<i className="ico_write"></i>
                  </a>
                </div>
              </div>
              <div className="board__list_content">
                <table className="board__table">
                  <caption>
                    <p>게시판리스트 : 번호, 게시판이름, 제목, 작성자, 조회수, 작성일</p>
                  </caption>
                  <colgroup>
                    <col style={{ width: "5%" }} />
                    <col style={{ width: "9%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "8%" }} />
                    <col style={{ width: "10%" }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>번호</th>
                      <th>게시판</th>
                      <th>제목</th>
                      <th>작성자</th>
                      <th>조회수</th>
                      <th>작성일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedBoardData.map((it) => (
                      <tr key={it.bid} >
                        <td>{it.bid}</td>
                        <td className="label_box" style={{ cursor: "pointer" }} >
                          <span style={{ backgroundColor: labelColors[it.kind] }}>
                            {it.kind == 1
                              ? "공지"
                              : it.kind == 2
                                ? "자유"
                                : it.kind == 3
                                  ? "맛집"
                                  : it.kind == 4
                                    ? "리뷰" : null}
                          </span>
                        </td>
                        <td className="title" style={{ cursor: "pointer" }} onClick={() => goDetail(it.bid)} >{it.title} ({it.cnt})</td>
                        <td className="title" style={{ cursor: "pointer" }} >{it.writer}</td>
                        <td>{it.hits}</td>
                        <td className="title">{it.cdatetime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="sub-info__paging">
            {<Pagination
              activePage={page} // 현재 페이지
              itemsCountPerPage={10} // 한 페이지랑 보여줄 아이템 갯수
              totalItemsCount={data.length} // 총 아이템 갯수
              pageRangeDisplayed={5} // paginator의 페이지 범위
              firstPageText={<AiOutlineDoubleLeft />} // "처음"을 나타낼 텍스트
              prevPageText={<AiOutlineLeft />} // "이전"을 나타낼 텍스트
              lastPageText={<AiOutlineDoubleRight />} // "마지막"을 나타낼 텍스트
              nextPageText={<AiOutlineRight />} // "다음"을 나타낼 텍스트
              onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
            />}
          </div>

        </div>

      </div>

    );
  };

};

export default BoardHome;