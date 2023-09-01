import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import mapImg01 from "../static/img/mapDrink01.png";

function MapItem({ name, region, description, info, price, url, type }) {
  return (
    <>
      {type === "list" ? (
        <>
          <div className="chartTop">
            <div className="img">
              <img src={url} />
            </div>
            <div className="txt">
              <h2>{name}</h2>
              <p className="location">
                <span className="locName">{region}</span>
              </p>
              <p className="kind">{description}</p>
              <p className="price">{price}원</p>
            </div>
          </div>
          <p className="chartInfo">{info}</p>
        </>
      ) : (
        <Link to={"/find"} className="moreBtn">
          더 보러 가기
        </Link>
      )}
    </>
  );
}

export default MapItem;
