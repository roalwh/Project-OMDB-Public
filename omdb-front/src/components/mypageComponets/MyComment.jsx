import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import LoadingBar from "../../components/LoadingBar";
import LoadingTimer from "../../components/LoadingTimer";


function MyComment(prop) {

  const uid = prop.uid;

  const [commentList, setCommentList] = useState([]);

  useEffect(() => {

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `/member/comment/${uid}`
    };

    axios.request(config)
      .then((res) => {
        const data = res.data;
        // console.log(data);
        const commentData = data.map((item) => ({
          boardNo: item.boardNo,
          boardTitle: item.boardTitle,
          content: item.content,
          creatAt: item.cdatetime,
          like: item.commentLikeCnt,
        }));
        setCommentList(commentData);
        // console.log("commentData",commentData);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [uid]);

  // 로딩 시간
  const { timer } = LoadingTimer();

  return (
    <>
      <h2 className="mypage_cont__title">내가 쓴 댓글 ({commentList.length})</h2>
      <table className="mypage_cont__table">
        <thead>
          <tr>
            <th>게시글번호</th>
            <th>게시글 제목</th>
            <th>댓글내용</th>
            <th>댓글작성일</th>
            <th>댓글추천수</th>
          </tr>
        </thead>
        <tbody>
          {
            !timer ? (
              <tr className='table_nodata'>
                <td colSpan={5}>
                  <LoadingBar text="댓글을 불러오고 있습니다.." />
                </td>
              </tr>
            ) : commentList.length > 0 ?
              commentList.map((item, i) => (
                <tr key={i}>
                  <td>{item.boardNo}</td>
                  <td className='title'>{item.boardTitle}</td>
                  <td className='content'>  <Link to={`/board/detail/${item.boardNo}`}>{item.content}</Link></td>
                  <td>{item.creatAt}</td>
                  <td>{item.like}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5}>
                    <div className="nodata">
                      <p className="nodata_text">등록된 댓글이 없습니다.</p>
                    </div>
                  </td>
                </tr>
              )
          }

        </tbody>
      </table>
    </>

  )
}

export default MyComment;