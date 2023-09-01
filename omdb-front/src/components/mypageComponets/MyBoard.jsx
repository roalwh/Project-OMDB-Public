import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import moment from "moment/moment";
import LoadingBar from "../LoadingBar";
import LoadingTimer from "../LoadingTimer";


function MyBoard(prop) {

  const uid = prop.uid;
  // console.log("uid",uid);

  const [boardList, setBoardList] = useState([]);

  useEffect(() => {

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `/member/board/${uid}`
    };

    axios.request(config)
      .then((res) => {
        const data = res.data;
        const boardData = data.map((item) => ({
          bid: item.bid,
          kind: item.kind === 1 ? "공지" : item.kind === 2 ? "자유" : item.kind === 3 ? "맛집" : "리뷰",
          title: item.title,
          content: item.content,
          hits: item.hits,
          cnt: item.cnt,
          creatAt: moment(item.cdatetime).format("YYYY.MM.DD")

        }));
        setBoardList(boardData);
        // console.log("boardData", boardData);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [uid]);

  // 로딩 시간
  const { timer } = LoadingTimer();

  return (
    <>
      <h2 className="mypage_cont__title">내가 쓴 글 ({boardList.length})</h2>
      <table className="mypage_cont__table">
        <colgroup>
          <col width="5%" />
          <col width="10%" />
          <col width="17%" />
          <col width="4%" />
          <col width="4%" />
          <col width="10%" />
        </colgroup>
        <thead>
          <tr>
            <th>분류</th>
            <th>제목</th>
            <th>내용</th>
            <th>조회</th>
            <th>댓글수</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {
            !timer ? (
              <tr className='table_nodata'>
                <td colSpan={6}>
                  <LoadingBar text="글을 불러오고 있습니다.." />
                </td>
              </tr>
            ) : boardList.length > 0 ? (
              boardList.map((item, i) => (
                <tr key={i}>
                  <td>{item.kind}</td>
                  <td className='title'> <Link to={`/board/detail/${item.bid}`}>
                    {item.title}</Link> </td>
                  <td className='content'>{item.content}</td>
                  <td>{item.hits}</td>
                  <td>{item.cnt}</td>
                  <td>{item.creatAt}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <div className="nodata">
                    <p className="nodata_text">등록된 글이 없습니다.</p>
                  </div>
                </td>
              </tr>
            )}
        </tbody>
      </table>
    </>
  )
}

export default MyBoard;