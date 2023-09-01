import React from "react";
import { useState } from "react";
import DetailImg01 from "../static/img/DetailImg01.png";
import DetailImg02 from "../static/img/DetailImg02.png";
import InfoDetailBg from "../static/img/infoDetailBg.png";

export default function InfoDetailPage() {
  return (
    <>
      <div className="infoBg">
        <img src={InfoDetailBg} />
        <p>
          술렁술렁은 <b>‘술’</b>과 <b>‘슬렁슬렁’</b>의 합성어로
          <b> 우리술을 찾아 떠나보자</b>는 의미를 담고 있습니다.
          <br />
          술렁술렁과 함께 우리 전통주를 찾아 떠나보아요.
        </p>
      </div>
      <div className="container">
        <div className="infoText">
          <h2>우리술 이야기</h2>
          <div className="contArea">
            <div className="imgBox">
              <img src={DetailImg01} />
            </div>
            <div className="txtBox">
              <div className="titleBox">
                <h2 className="one">오래 전부터 우리와</h2>
                <h2>
                  함께 한 <b>우리 술의 역사</b>
                </h2>
              </div>
              <p>
                ‘우리의 술문화는 역사가 매우 깊습니다’
                <br />
                삼국시대 이전부터 맑은 곡주를 빚어 조상께 바치고
                <br />
                춤과 노래와 술마시기를 즐겼다고 합니다.
              </p>
              <p>
                고려시대에는 송나라와 원나라의 양조법이 도입되었고,
                <br />
                전래의 주류양조법이 발전되어 주류제품이 다양해졌습니다.
              </p>
              <p>
                중국으로부터 증류주가 유입된 것도 이 때였고,
                <br />
                황금주, 백자주, 송주 등 술의 재료와 특성을 나타내는
                <br />
                술이 나타나기 시작한 것도 이 시기였습니다.
              </p>
            </div>
          </div>
          <div className="contArea second">
            <div className="txtBox">
              <div className="titleBox">
                <h2 className="one">
                  한국의 <b>정서</b>와 <b>문화</b>가
                </h2>
                <h2>
                  담긴 <b>우리 술</b>
                </h2>
              </div>
              <p>
                ‘우리의 술문화는 역사가 매우 깊습니다’
                <br />
                삼국시대 이전부터 맑은 곡주를 빚어 조상께 바치고
                <br />
                춤과 노래와 술마시기를 즐겼다고 합니다.
              </p>
              <p>
                고려시대에는 송나라와 원나라의 양조법이 도입되었고,
                <br />
                전래의 주류양조법이 발전되어 주류제품이 다양해졌습니다.
              </p>
              <p>
                중국으로부터 증류주가 유입된 것도 이 때였고,
                <br />
                황금주, 백자주, 송주 등 술의 재료와 특성을 나타내는
                <br />
                술이 나타나기 시작한 것도 이 시기였습니다.
              </p>
            </div>
            <div className="imgBox">
              <img src={DetailImg02} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
