import React from "react";
import testImg from "../static/img/subItem.jpg";

function TestItem({ name, num, imageUrl, description, did, url }) {
  return (
    <>
      <div className="img">
        {/* <p>{name}</p> */}
        <img src={url} />
      </div>
      <div className="dringInfo">
        {/* 추천 술1에 대한
        <br />
        간단한설명 */}
        <h3>{name}</h3>
        <p>{num}</p>
      </div>
    </>
  );
}

export default TestItem;
