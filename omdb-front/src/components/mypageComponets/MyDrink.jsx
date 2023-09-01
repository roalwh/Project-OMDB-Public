import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductItem from "../ProductItem";
import LoadingBar from "../../components/LoadingBar";
import LoadingTimer from "../../components/LoadingTimer";


function MyDrink(prop) {
  const uid = prop.uid;

  const [dLikeArr, setdLikeArr] = useState([]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const res = await axios.get(`dlike/userList?uid=${uid}`);
        console.log(res);
        // 멤버 uid 를 보냄
        const dLikeArr = res.data.map((item) => ({
          did: item.did,
          name: item.dname,
          dimgs: item.imgPath,
        }));
        setdLikeArr(dLikeArr);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };
    fetchMenuData();
  }, [uid]);

  // 로딩 시간
  const { timer } = LoadingTimer();

  return (
    <>
      <h2 className="mypage_cont__title">
        찜한 술({dLikeArr.length})
      </h2>

      <div className="sub-info__inner">
        {
          !timer ? (
            <div className='table_nodata position'>
              <div className="table_nodata_inner nodata">
                <LoadingBar text="댓글을 불러오고 있습니다.." />
              </div>
            </div>
          ) : dLikeArr.length > 0 ?
            dLikeArr.map((dlikeItem, i) => (
              <div className="product_inner" key={i}>
                <ProductItem
                  name={dlikeItem.name}
                  did={dlikeItem.did}
                  imageUrl={`${process.env.REACT_APP_API_HOST}${dlikeItem.dimgs}`}
                  description={dlikeItem.description}
                  type="mypage"
                />
              </div>
            )) : (
              <div className="table_nodata position">
                <div className="table_nodata_inner">
                  <div className="nodata">
                    <p className="nodata_text">찜한 술이 없습니다.</p>
                  </div>
                </div>
              </div>
            )
        }


      </div>
    </>
  )
}

export default MyDrink