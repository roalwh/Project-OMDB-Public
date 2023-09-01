import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import LoadingBar from "../../components/LoadingBar";
import LoadingTimer from "../../components/LoadingTimer";

function MyReview(prop) {

  const uid = prop.uid;

  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `/member/review/${uid}`
    };

    axios.request(config)
      .then((res) => {
        const data = res.data;
        // console.log(data);
        const reviewData = data.map((item) => ({
          did: item.did,
          drinkCate: item.drinkcate,
          drinkName: item.drinkname,
          score: item.score,
          title: item.title,
          content: item.content,
          cdatetime: item.cdatetime,
        }));
        setReviewList(reviewData);
        // console.log("reviewData",reviewData);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [uid]);

  // 로딩 시간
  const { timer } = LoadingTimer();

  return (
    <>
      <h2 className="mypage_cont__title">내가 작성한 리뷰 ({reviewList.length})</h2>
      <table className="mypage_cont__table">
        <colgroup>
          <col width="10%" />
          <col width="12%" />
          <col width="5%" />
          <col width="13%" />
          <col width="17%" />
          <col width="12%" />
        </colgroup>
        <thead>
          <tr>
            <th>분류</th>
            <th>술 이름</th>
            <th>평가</th>
            <th>제목</th>
            <th>내용</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {
            !timer ? (
              <tr className='table_nodata'>
                <td colSpan={6}>
                  <LoadingBar text="리뷰를 불러오고 있습니다.." />
                </td>
              </tr>
            ) : reviewList.length > 0 ? (
              reviewList.map((item, i) => (
                <tr key={i}>
                  <td className='title'>{item.drinkCate}</td>
                  <td className='title'>{item.drinkName}</td>
                  <td>{item.score}</td>
                  <td className='title'> <Link to={`/${item.did}`}>{item.title} </Link></td>
                  <td className='content'>{item.content}</td>
                  <td>{item.cdatetime}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <div className="nodata">
                    <p className="nodata_text">등록된 댓글이 없습니다.</p>
                  </div>
                </td>
              </tr>
            )
          }
          {/* <tr>
              <td>탁주</td>
              <td>대대포 블루</td>
              <td>별</td>
              <th>다대포 추천합니다</th>
              <td>깔끔하고 탄산감이 강한 막걸리_식전, 식후술로 추천</td>
              <td>2023.02.15.</td>
          </tr> */}
        </tbody>
      </table>
    </>
  )
}

export default MyReview