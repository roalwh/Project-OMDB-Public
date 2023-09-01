import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import LoadingBar from "../components/LoadingBar";
import LoadingTimer from "../components/LoadingTimer";

// swiper import
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';

import mainBanner1_m from "../static/img/mainBanner_m.jpg"
import mainBanner2_m from "../static/img/mainBanner2_m.jpg"
import mainBanner from "../static/img/mainBanner.png"
import mainBanner2 from "../static/img/mainBanner2.jpg"
import mainTestBanner from "../static/img/main_testBanner.jpg"
import mainInfoBanner1 from "../static/img/img_main_infoBanner1.png"
import mainInfoBanner2 from "../static/img/img_main_infoBanner2.png"

export default function Main() {

  const [recommendedData, setRecommendedData] = useState([]);
  const [randomRecommendedData, setRandomRecommendedData] = useState([]);

  // 로딩 시간
  const { timer } = LoadingTimer();

  // 목록 데이터 호출
  const fetchRecommendedData = async () => {
    try {
      const res = await axios.get("cate/all");
      const menuData = res.data.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.desclist.drename,
        imageUrl: `${process.env.REACT_APP_API_HOST}${item.path}`,
      }));
      setRecommendedData(menuData);

      // console.log(menuData[1].desclist.drename);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    fetchRecommendedData();
  }, []);

  // 상세페이지 데이터 호출
  const [detailData, setDetailData] = useState([]);
  useEffect(() => {
    const fetchDetailData = async (did) => {
      try {
        const res = await axios.get(`/cate/info/${did}`);
        const itemData = {
          name: res.data.name,
          alc: res.data.alc,
          price: res.data.price,
          did: res.data.did,
        };
        setDetailData(itemData);
        // console.log(itemData.name);
        fetchDetailData(detailData);
      } catch (error) {
        console.error("Error", error);
      }
    };
  }, []);

  // 랜덤 데이터 생성 및 업데이트
  useEffect(() => {
    const newRandomData = recommendedData
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    setRandomRecommendedData(newRandomData);
  }, [recommendedData]);

  // 버튼 클릭 시 목록 데이터 다시 불러오기
  const handleResetClick = () => {
    fetchRecommendedData();
  };


  return (
    <>
      <div className="mainBanner">
        <div className="imgArea">
          <Swiper
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="main_slide main_slide1">
                <img src={mainBanner2} />
              </div>
              <div className="main_slide main_slide2">
                <img src={mainBanner2_m} />
              </div>

            </SwiperSlide>
            <SwiperSlide>
              <div className="main_slide main_slide1">
                <img src={mainBanner} />
              </div>
              <div className="main_slide main_slide2">
                <img src={mainBanner1_m} />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="mainInner">
        <ul className="quickBtn">
          <li><Link to="/find">
            <span>전체</span>
          </Link></li>
          <li><Link to="/find">
            <span>탁주(막걸리)</span>
          </Link></li>
          <li><Link to="/find">
            <span>청주</span>
          </Link></li>
          <li><Link to="/find">
            <span>증류주</span>
          </Link></li>
          <li><Link to="/find">
            <span>과실주</span>
          </Link></li>
          <li><Link to="/find">
            <span>기타주류</span>
          </Link></li>
        </ul>
      </div>
      <div className="mainContent">
        <div className="container">
          <div className="main__recommed">
            <div className="main__recommed_head">
              <h2 className="main__recommed_title">이런 술은 어떠세요?</h2>
              <button className="btn_reset" onClick={handleResetClick}>
                <i className="ico_reset"></i>
              </button>
            </div>

            <div className="sub-info__inner main">
              {!timer ? (
                <LoadingBar text="데이터를 불러오는 중입니다.." />
              ) : randomRecommendedData.length > 0 ? (
                randomRecommendedData.map((item, i) => (
                  <div className="product_inner" key={i}>
                    <ProductItem
                      name={item.name}
                      description={item.description}
                      imageUrl={item.imageUrl}
                      did={item.id}
                    />
                  </div>
                ))
              ) : (
                <div className="nodata">
                  <p className="nodata_text">등록된 전통주가 없습니다.</p>
                </div>
              )}

            </div>
          </div>
          <div className="main_testBanner">
            <Link to="/drinktest">
              <img src={mainTestBanner} alt="우리술 취향 배너 이미지" />
            </Link>
          </div>
          <div className="main_infomation">
            <h2 className="main_infomation_title">우리술 News </h2>
            <div className="main_infomation_list">
              <article>
                <Link to="/">
                  <img
                    src={mainInfoBanner1}
                    alt="제주곶밭 천혜향 탁주 이미지"
                  />
                  <p>제주곶밭 천혜향 탁주</p>
                </Link>
              </article>
              <article>
                <Link to="https://www.sool-fest.com/home/index.php" target="_blank">
                  <img
                    src={mainInfoBanner2}
                    alt="우리술 대축제 이벤트 이미지"
                  />
                  <p>우리술 대축제</p>
                </Link>
              </article>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
