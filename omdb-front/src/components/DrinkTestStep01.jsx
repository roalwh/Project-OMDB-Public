import React from "react";
import { useState } from "react";

export default function DrinkTestStep01(props) {
  const [kind, setKind] = useState(0);
  const drinkName = ["TAK", "CHE", "WIN", "SPI"];

  const tabClickHandler = (index) => {
    setKind(index);
  };

  const setKindNum = () => {
    props.setKindNum(kind);
    // console.log(props);
    props.setKindName(drinkName[kind - 1]);
    // console.log(drinkName[kind - 1]);
  };

  return (
    <div className="testStep1">
      <ul>
        <li
          className={kind === 1 ? "on" : ""}
          onClick={() => tabClickHandler(1)}
        >
          <p>막걸리/탁주</p>
        </li>
        <li
          className={kind === 2 ? "on" : ""}
          onClick={() => tabClickHandler(2)}
        >
          <p>청주</p>
        </li>
        <li
          className={kind === 3 ? "on" : ""}
          onClick={() => tabClickHandler(3)}
        >
          <p>과실주</p>
        </li>
        <li
          className={kind === 4 ? "on" : ""}
          onClick={() => tabClickHandler(4)}
        >
          <p>증류주</p>
        </li>
      </ul>
      <a
        onClick={
          kind > 0 ? setKindNum : () => alert("전통주 주종을 선택해주세요!")
        }
      >
        테스트 시작하기
      </a>
    </div>
  );
}
