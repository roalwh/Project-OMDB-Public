import React from "react";
import { useState, useEffect } from "react";
import "../static/js/header.js";

export default function DrinkTestStep02(props) {
  // 막걸리 탁주일때 질문
  // 단맛(sweet), 신맛(sour), 탄산(cool), 바디감(body), 도수(alc)
  const list01 = [
    {
      quiz: "당신이 선호하는 복숭아의 상태는?!",
      ans01: "과즙이 넘치는 물렁 복숭아!",
      ans02: "흉기로도 사용 가능한 딱딱 복숭아!",
    },
    {
      quiz: "추운 겨울 이불 속에서 까먹는 귤의 상태는?!",
      ans01: "귤은 살짝 덜 익어 상큼해야지!",
      ans02: "귤은 제대로 익어야지;",
    },
    {
      quiz: "여름날 목이 마를 때 당신이 마시는 음료는?!",
      ans01: "그냥 탄산 음료",
      ans02: "한모금만 마셔도 행복한 이온 음료!",
    },
    {
      quiz: "카페에서 주문할 때 당신의 선택은?!",
      ans01: "깔끔하고 어른스러운 아메리카노!",
      ans02: "보기만해도 텁텁한 카페라떼",
    },
    {
      quiz: "바쁜 한 주를 견딘 당신의 불금은?!",
      ans01: "어른스럽게 간단한 맥주 한잔!",
      ans02: "코가 삐뚤어지게 마시고 만취 엔딩",
    },
  ];

  // 증류주 기타 일때 질문
  // 단맛(sweet), 향(insense), 탄산(cool), 바디감(body), 도수(alc)
  const list02 = [
    {
      quiz: "당신이 선호하는 복숭아의 상태는?!",
      ans01: "과즙이 넘치는 물렁 복숭아!",
      ans02: "흉기로도 사용 가능한 딱딱 복숭아!",
    },
    {
      quiz: "길을 가다 좋은 향이 난다 이 향은 어떤 향인가?!",
      ans01: "코 끝에 진하게 남는 달달한 향",
      ans02: "은은하게 퍼지는 코튼 향!",
    },
    {
      quiz: "여름날 목이 마를 때 당신이 마시는 음료는?!",
      ans01: "그냥 탄산 음료",
      ans02: "한모금만 마셔도 행복한 이온 음료!",
    },
    {
      quiz: "카페에서 주문할 때 당신의 선택은?!",
      ans01: "보기만해도 텁텁한 카페라떼",
      ans02: "깔끔하고 어른스러운 아메리카노!",
    },
    {
      quiz: "바쁜 한 주를 견딘 당신의 불금은?!",
      ans01: "코가 삐뚤어지게 마시고 만취 엔딩",
      ans02: "어른스럽게 간단한 맥주 한잔!",
    },
  ];

  const [num, setNum] = useState(0);
  const [per, setPer] = useState(0);
  const [ansArr, setAnsArr] = useState([]);

  const nextAns = (ans) => {
    setPer(per + 20);
    setAnsArr([ans, ...ansArr]);
    props.setAnsArr([ans, ...ansArr]);
    if (num < 4) {
      setNum(num + 1);
    }
  };

  useEffect(() => {
    if (per === 100) {
      props.setAnsChk(true);
    }
    // console.log(ansArr);
  }, [props.ansArr]);

  return (
    <>
      <div className="testStep2">
        <div className="qBox">
          <p>
            {props.kindName !== "SPI" ? list01[num].quiz : list02[num].quiz}
          </p>
        </div>
        <ul className="ansBox">
          <li onClick={() => nextAns("선호")}>
            <a>
              {props.kindName !== "SPI" ? list01[num].ans01 : list02[num].ans01}
            </a>
          </li>
          <li onClick={() => nextAns("비선호")}>
            <a>
              {props.kindName !== "SPI" ? list01[num].ans02 : list02[num].ans02}
            </a>
          </li>
        </ul>
        <div className="testStep">
          <div className="stepBg">
            <div className="stepLine" style={{ width: per + "%" }}>
              <p className="perCount">{per}%</p>
            </div>
          </div>
          {/* <p>
            <b>{num}</b> / {list.length}
          </p> */}
        </div>
      </div>
    </>
  );
}
