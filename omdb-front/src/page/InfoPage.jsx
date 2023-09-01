import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import tabImg01 from "../static/img/drinkInfo01.png";
import tabImg02 from "../static/img/drinkInfo02.png";
import tabImg03 from "../static/img/drinkInfo03.png";
import tabImg04 from "../static/img/drinkInfo04.png";

export default function InfoPage() {

  // 카테고리 메뉴
  const [activeIndex, setActiveIndex] = useState(0);
  const tabContArr = [
    {
      tabTitle: (
        <li
          className={activeIndex === 0 ? "is-active" : ""}
          onClick={() => tabClickHandler(0)}
        >
          <a>
            <span>탁주(막걸리)</span>
          </a>
        </li>
      ),
      tabCont: (
        <div className="contentArea">
          <div className="tabImg">
            <img src={tabImg01} alt="탁주이미지" />
          </div>
          <h2>탁주(막걸리)란?</h2>
          <p>
            녹말이 포함된 재료와 국(麴) 및 물을 원료로 하여 발효시킨 술덧을
            <br />
            여과하지 아니하고 혼탁하게 제성한 것
          </p>
          <div className="bubbleBtn">
            {/* <a>자세히 보러가기</a> */}
            <Link to='/find'>자세히 보러가기</Link>
            <div id="liquid">
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 1 ? "is-active" : ""}
          onClick={() => tabClickHandler(1)}
        >
          <a>
            <span>청주</span>
          </a>
        </li>
      ),
      tabCont: (
        <div className="contentArea">
          <div className="tabImg">
            <img src={tabImg02} alt="청주이미지" />
          </div>
          <h2>청주란?</h2>
          <p>
            녹말이 포함된 재료를 원료로 하여
            <br />
            발효시킨 술덧을 여과하여 제성한 것을 약주로,
            <br />
            곡류 중 쌀을 원료로 하여 발효시킨
            <br />
            술덧을 여과해 제성한 것을 청주로 분류합니다.
          </p>

          <div className="bubbleBtn">
            {/* <a>자세히 보러가기</a> */}
            <Link to='/find'>자세히 보러가기</Link>
            <div id="liquid">
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 2 ? "is-active" : ""}
          onClick={() => tabClickHandler(2)}
        >
          <a>
            <span>증류주</span>
          </a>
        </li>
      ),
      tabCont: (
        <div className="contentArea">
          <div className="tabImg">
            <img src={tabImg03} alt="증류주 이미지" />
          </div>
          <h2>증류주란?</h2>
          <p>
            양조주 보다 순도 높은 주정을 얻기 위해
            <br />
            1차 발효된 양조주를 다시 증류시켜 알코올 도수를 높인 술
          </p>

          <div className="bubbleBtn">
            {/* <a>자세히 보러가기</a> */}
            <Link to='/find'>자세히 보러가기</Link>
            <div id="liquid">
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      tabTitle: (
        <li
          className={activeIndex === 3 ? "is-active" : ""}
          onClick={() => tabClickHandler(3)}
        >
          <a>
            <span>과실주</span>
          </a>
        </li>
      ),
      tabCont: (
        <div className="contentArea">
          <div className="tabImg">
            <img src={tabImg04} alt="과실주 이미지" />
          </div>
          <h2>과실주란?</h2>
          <p>
            포도, 사과, 머루 등의 과실을 원료로 하여
            <br />
            발효시킨 술(한국식 와인)
          </p>

          <div className="bubbleBtn">
            {/* <a>자세히 보러가기</a> */}
            <Link to='/find'>자세히 보러가기</Link>
            <div id="liquid">
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
              <div className="bubble"></div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const tabClickHandler = (index) => {
    setActiveIndex(index);
  };

  return (
    <>
      <div className="container infoWrap">
        {/* 버튼 영역 */}
        <div className="btnArea">
          <ul className="infoBtn">
            {tabContArr.map((section, index) => {
              return <div key={index}>{section.tabTitle}</div>;
            })}
          </ul>
        </div>
        <div className="tabInfo">{tabContArr[activeIndex].tabCont}</div>
      </div>
    </>
  );
}
