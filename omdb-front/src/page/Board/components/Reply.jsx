import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../../App"; 

const Reply = () => {
  // const { userData } = useContext(UserContext);
  // const params = useParams();

 
  return (
    <div>
      {/* 댓글섹터 */}
      <div className="board_comment">
        <div className="board_comment__top">
          <h4>댓글 49개</h4>
        </div>

        <div className="board_comment__body">
          {/* 댓글 입력 폼 */}
          <div className="board_comment__form">
            <form action="">
              <textarea placeholder="댓글 내용을 입력해주세요."></textarea>
              <button className="gray_btn">확인</button>
            </form>
          </div>

          {/* 댓글 1개 (남이쓴거 - 답글 버튼)*/}
          <div className="board_comment__inner">
            <div className="board_comment__nick">주주가보이세요</div>
            <div className="board_comment__date">2023-12-25</div>
            <div className="board_comment__content">
              주주 왜 혼자보세요. 실망.
            </div>
            <div className="board_comment__btn">
              <button className="btn_comment">답글</button>
            </div>
          </div>

          {/* 댓글 1개 (본인이쓴거 - 수정/삭제 버튼)*/}
          <div className="board_comment__reply">
            <div className="board_comment__nick">주주가보이세요</div>
            <div className="board_comment__date">2023-12-25</div>
            <div className="board_comment__content">
              그니까요. 주주 왜 혼자보세요. 실망.
            </div>
            <div className="board_comment__btn">
              <button className="btn_comment">수정</button>
              <button className="btn_comment">삭제</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reply;
