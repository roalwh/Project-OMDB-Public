import React, { useEffect } from "react";

const Content = ({ kind, title, writer, cdatetime, hits, content, filePath }) => {
  
  const Span_ = ({space = 5}) => {
    return (
      <span style = {{paddingRight: space}}></span>
    )
  };

  return (
    <div>
      <div className="board__body">
        {/* 상세페이지 제목 섹터 */}
        <div className="board_view">
          <div className="board_view__tit">
            <p className="board_view__type">
              { kind == 1
                ? "공지"
                : kind == 2
                ? "자유"
                : kind == 3
                ? "맛집"
                : kind == 4
                ? "리뷰"
                : null }
            </p>
            <h3>{title}</h3>
          </div>
          <div className="board_view__info">
            <p className="board_view__id">글쓴이<Span_/> {writer}</p>
            <p className="board_view__date">
              <span className="date">작성일<Span_/> {cdatetime}</span>
              <span className="insert">조회수<Span_/> {hits}</span>
            </p>
          </div>
        </div>

        {/* 콘텐츠 섹터 */}
        <div className="board_view__content">
           {content}
            {filePath ? (
                <div 
                    className="board_img"
                    style={{backgroundImage: `url(${filePath})`}}>
                </div>  
            ): null}
        </div>
      </div>
    </div>
  );
};

export default Content;
