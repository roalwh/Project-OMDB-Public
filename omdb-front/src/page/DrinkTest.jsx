import React from "react";
import { useState } from "react";
import Step01 from "../components/DrinkTestStep01";
import Step02 from "../components/DrinkTestStep02";
import Step03 from "../components/DrinkTestStep03";
export default function DrinkTest() {
  const [kindNum, setKindNum] = useState(0);
  const [kindName, setKindName] = useState("");
  const [ansArr, setAnsArr] = useState([]);
  const [ansChk, setAnsChk] = useState(false);

  return (
    <>
      <div className="container">
        <div className="testInfo">
          <h2>나만의 전통주 테스트</h2>
          <p>
            선호하는 주종을 선택 후 간단한 테스트를 통해
            <br />
            나만의 우리술을 찾아보세요!
          </p>
        </div>
        {kindNum === 0 ? (
          <Step01
            kindNum={kindNum}
            setKindNum={setKindNum}
            kindName={kindName}
            setKindName={setKindName}
          />
        ) : null}
        {kindName !== "" && !ansChk ? (
          <Step02
            kindName={kindName}
            ansArr={ansArr}
            setAnsArr={setAnsArr}
            ansChk={ansChk}
            setAnsChk={setAnsChk}
          />
        ) : null}
        {ansChk ? <Step03 kindName={kindName} ansArr={ansArr} /> : null}
      </div>
    </>
  );
}
