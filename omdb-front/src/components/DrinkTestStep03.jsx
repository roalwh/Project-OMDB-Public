import React from "react";
import { useState, useEffect } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import axios from "axios";
import "../static/js/header.js";
import TestItem from "./TestItem.jsx";

export default function DrinkTestStep03(props) {
  const [count, setCount] = useState(4);
  const [timer, setTimer] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setCount((count) => count - 1);
    }, 1000);
    if (count === 0) {
      setTimer(true);
      clearInterval(id);
    }
    return () => clearInterval(id);
  }, [count]);

  // useEffect(() => {
  //   console.log(timer);
  // }, [timer]);

  const [menuArr, setMenuArr] = useState([]);
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const res = await axios.get(
          `dri/tasteView?drinkName=${props.kindName}&sweetLow=${
            props.ansArr[4] === "선호" ? (props.kindName === "SPI" ? 2 : 3) : 0
          }&sweetHigh=${
            props.ansArr[4] === "선호" ? 5 : props.kindName === "SPI" ? 2 : 3
          }&sourLow=${
            props.kindName === "SPI" ? 0 : props.ansArr[3] === "선호" ? 3 : 0
          }&sourHigh=${
            props.kindName === "SPI" ? 5 : props.ansArr[3] === "선호" ? 5 : 3
          }&coolLow=${
            props.ansArr[2] === "선호" ? (props.kindName === "SPI" ? 1 : 3) : 0
          }&coolHigh=${
            props.ansArr[2] === "선호" ? 5 : props.kindName === "SPI" ? 0 : 3
          }&bodyLow=${
            props.ansArr[1] === "선호" ? (props.kindName === "SPI" ? 2 : 3) : 0
          }&bodyHigh=${
            props.ansArr[1] === "선호" ? 5 : props.kindName === "SPI" ? 2 : 3
          }&insenseLow=${
            props.kindName === "SPI" ? (props.ansArr[3] === "선호" ? 2 : 0) : 0
          }&insenseHigh=${
            props.kindName === "SPI" ? (props.ansArr[3] === "선호" ? 5 : 2) : 5
          }&alcLow=${
            props.ansArr[0] === "선호"
              ? props.kindName === "TAK"
                ? 6.1
                : props.kindName === "SPI"
                ? 20.0
                : 12.1
              : 0
          }&alcHigh=${
            props.ansArr[0] === "선호"
              ? 99.0
              : props.kindName === "TAK"
              ? 6.1
              : props.kindName === "SPI"
              ? 19.9
              : 12.0
          }`
        );
        const menuData = res.data.map((item) => ({
          name: item.name,
          did: item.did,
          description: item.desclist.drename,
          info: item.info,
          sweet: item.sweet,
          sour: item.sour,
          cool: item.cool,
          body: item.body,
          insense: item.insense,
          alc: item.alc,
          url: `${process.env.REACT_APP_API_HOST}${item.dimgs[0].path}`,
        }));
        // console.log(res);
        setMenuArr(menuData);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };
    fetchMenuData();
  }, []);
  // console.log(props.ansArr[4]);
  // console.log(menuArr);

  return (
    <>
      {!timer ? (
        <div className="testStep3">
          <div className="container1">
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
          </div>
          <p className="testLoading">
            톡톡 튀는 당신의 전통주 취향을 분석 중입니다!
          </p>
        </div>
      ) : null}
      {timer ? (
        <div className="testStep4">
          <div className="resultArea">
            <div className="resultTop">
              <div className="resultTitle">
                <h2>당신의 전통주 유형은?!</h2>
              </div>
              <ul>
                {props.ansArr[4] === "선호" ? (
                  <li>
                    <b>#달콤한 </b>술을 좋아해요!
                  </li>
                ) : (
                  <li>
                    <b>#달지않은 </b>술을 좋아해요!
                  </li>
                )}
                {props.kindName === "SPI" ? (
                  props.ansArr[3] === "선호" ? (
                    <li>
                      <b>#향긋한 향</b>을 선호해요
                    </li>
                  ) : (
                    <li>
                      향이 나지 않는 <b>깔끔함</b>을 선호해요
                    </li>
                  )
                ) : props.ansArr[3] === "선호" ? (
                  <li>
                    과일처럼 <b>#새콤한</b> 술이 좋아요
                  </li>
                ) : (
                  <li>
                    과일처럼 <b>상큼한</b> 술이 좋아요
                  </li>
                )}
                {props.ansArr[0] === "선호" ? (
                  <li>
                    지친 일과로 <b>#취하고 싶은 </b>오늘!
                  </li>
                ) : (
                  <li>
                    지친 일과로 <b>#취하고 싶지 않은 </b>오늘
                  </li>
                )}
                {props.ansArr[1] === "선호" ? (
                  <li>
                    거칠고 <b>#묵직한</b> 목넘김!
                  </li>
                ) : (
                  <li>
                    거칠기보단 <b>#부드러운</b> 목넘김!
                  </li>
                )}
                {props.ansArr[2] === "선호" ? (
                  <li>
                    무더운 날에는 <b>#탄산이 있고 </b>시원한게 끌려요!
                  </li>
                ) : (
                  <li>
                    무더운 날에는 <b>#청량하고 </b>시원한게 끌려요!
                  </li>
                )}
              </ul>
            </div>
            <div className="resultBot">
              <div className="cont">
                <h2>
                  술은 <b>달콤하고 시원해야</b> 한다고 생각하는 당신을 위한
                  추천!
                </h2>
                <Swiper
                  spaceBetween={16}
                  slidesPerView={1}
                  navigation={true}
                  modules={[Navigation]}
                  breakpoints={{
                    550: {
                      spaceBetween: 16,
                      slidesPerView: 2,
                    },
                    780: {
                      spaceBetween: 18,
                      slidesPerView: 3,
                    },
                  }}
                >
                  {menuArr.map((testItem, idx) => (
                    <SwiperSlide key={idx}>
                      <Link to={`/${testItem.did}`}>
                        <TestItem
                          name={testItem.name}
                          sweet={testItem.sweet}
                          sour={testItem.sour}
                          cool={testItem.cool}
                          body={testItem.body}
                          insense={testItem.insense}
                          alc={testItem.alc}
                          url={testItem.url}
                        />
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
