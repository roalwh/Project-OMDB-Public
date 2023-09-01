import React, { useState, useRef, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment/moment";
import { CopyToClipboard } from "react-copy-to-clipboard/src";

// import DrinkReview from "../components/drinkComponents/DrinkReview";

function DetailPage() {
  const location = useLocation();
  const params = useParams();
  const drinkId = params.did;

  const isLogin = sessionStorage.getItem("isLogin");
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const [uid, setUid] = useState('');

  useEffect(() => {
    if (userData) {
      setUid(userData.uid);
    } else {
      setUid('');
    }
  }, [userData]);


  const [detailData, setDetailData] = useState(""); // 술 정보 데이터
  const [detailImage, setDetailImage] = useState(""); // 술 정보 이미지
  const [category, setCategory] = useState(""); // 종류
  const [price, setPrice] = useState(""); // 종류
  const [activeHeart, setActiveHeart] = useState(false); // 좋아요 버튼
  const [activeShare, setActiveShare] = useState(false); // 공유하기 버튼

  // 술 정보 호출
  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        const res = await axios.get(`/cate/info/${drinkId}`);
        console.log(res);
        setDetailData(res.data); // Set the fetched data to the state
        setCategory(res.data.desclist.drename);
        const numberFormatter = new Intl.NumberFormat("en-US", {
          style: "decimal",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        });
        const formattedPrice = numberFormatter.format(res.data.price);
        setPrice(formattedPrice);
        // console.log(formattedPrice);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchDetailData();
  }, [drinkId]);

  // 이미지 데이터 호출
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get(`/dimg/${drinkId}/drink_${drinkId}.png`, {
          responseType: "blob",
        });
        const imageUrl = URL.createObjectURL(res.data);
        setDetailImage(imageUrl);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchImage();
  }, [drinkId]);

  // 시음그래프
  const sweetPercentage = detailData.sweet * 20;
  const sourPercentage = detailData.sour * 20;
  const coolPercentage = detailData.cool * 20;
  const bodyPercentage = detailData.body * 20;
  const balancePercentage = detailData.balance * 20;

  // 스크롤시 메뉴 고정
  const [ScrollY, setScrollY] = useState(0);
  const [scrollActive, setScrollActive] = useState(false);

  const handleScroll = () => {
    if (ScrollY > 777) {
      setScrollY(window.pageYOffset);
      setScrollActive(true);
    } else {
      setScrollY(window.pageYOffset);
      setScrollActive(false);
    }
  };
  useEffect(() => {
    function scrollListener() {
      window.addEventListener("scroll", handleScroll);
    }
    scrollListener();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  // 스크롤시 메뉴 활성화
  const [scrollTab, setScrollTab] = useState(false);
  const [scrollActiveTab, setScrollActiveTab] = useState(false);

  const handleScrollTab = () => {
    if (scrollTab > 1555) {
      setScrollTab(window.pageYOffset);
      setScrollActiveTab(true);
    } else {
      setScrollTab(window.pageYOffset);
      setScrollActiveTab(false);
    }
  };
  useEffect(() => {
    function scrollListener() {
      window.addEventListener("scroll", handleScrollTab);
    }
    scrollListener();
    return () => {
      window.removeEventListener("scroll", handleScrollTab);
    };
  });

  const [reviewData, setReviewData] = useState([]); // 리뷰데이터
  const titleInput = useRef("");
  const contentInput = useRef("");
  const [activeReview, setActiveReview] = useState(false); // 리뷰쓰기 버튼
  // // 리뷰 데이터
  const [rating, setRating] = useState(5); // 리뷰 별점
  const [title, settitle] = useState('');
  const [content, setcontent] = useState('');

  // // 리뷰 추천해요
  const [activeLike, setActiveLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // // 리뷰 이미지 업로드
  const [selectedImage, setSelectedImage] = useState("");
  const imageInput = useRef();

  // // 리뷰 수정
  const [isEdit, setEdit] = useState(false);
  const [localTitle, setLocalTitle] = useState(""); // 리뷰 제목
  const [localContent, setLocalContent] = useState(""); // 리뷰 내용
  const [toggleEdit, setToggleEdit] = useState(false);

  // 내 가상 데이터
  const [state, setState] = useState("");

  // const [state, setState] = useState({
  //   id: "123",
  //   nick: "",
  //   nick: "주",
  //   title: "",
  //   star: "",
  //   content: "",
  // })
  // 리뷰 데이터 입력

  // 리뷰 타이틀
  const handleChangeTitle = (e) => {
    settitle(e.target.value);
  };
  // 리뷰내용
  const handleChangeContent = (e) => {
    setcontent(e.target.value);
  };

  // // 리뷰 이미지 업로드
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };
  const handleReviewin = () => {
    setActiveReview(!activeReview)
    settitle();
    setcontent();
    setSelectedImage();
  }

  // // 리뷰 등록
  const handleSubmit = async () => {

    if (!isLogin) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }

    console.log("id: " + uid);
    console.log("nick: " + userData.nick);
    console.log("title: " + title);
    console.log("content: " + content);
    console.log("rating: " + rating);
    console.log("selectedImage: " + selectedImage);

    if (title && content) {
      const newItem = {
        uid: uid,
        nick: userData.nick,
        title: title,
        star: rating,
        content: content,
        image: selectedImage,
      };
      setReviewData((prevData) => [newItem, ...prevData]);
      // onCreate(state.id, state.nick, title, star, content);
      setActiveReview(false);
      setRating(5);
      console.log(newItem);
    } else {
      alert("모든 항목을 입력해주세요.");
      return null;
    }

    // const axios = require('axios');
    const FormData = require("form-data");

    const data = new FormData();
    data.append("files", selectedImage);
    data.append("drinkId", drinkId);
    data.append("memberId", uid);
    data.append("title", title);
    data.append("content", content);
    data.append("score", rating);
    data.append("dyn", "N");
    console.log(data.get("files"));
    console.log(data);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/cate/reviewin",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    axios
      .request(config)
      .then((res) => {
        console.log(res);
        alert("저장되었습니다.");
        fetchReviewData();  // 리뷰 등록 후 리뷰 전체 데이터 다시 불러오기
      })
      .catch((error) => {
        console.log(error);
      });

  };
  // 리뷰 목록 데이터
  const fetchReviewData = async () => {
    try {
      const res = await axios.get(`/cate/review/${drinkId}`);

      const ListData = res.data.map((item) => ({
        uid: item.uid,
        reviewId: item.rid,
        nick: item.nick,
        title: item.title,
        content: item.content,
        score: item.score,
        data: item.cdatetime,
        // 수정
        rimg: `${process.env.REACT_APP_API_HOST}${item.rimg}`,
        activeLike: false, // 초기값은 추천되지 않은 상태로 설정
        likeCount: 0,
      }));
      setReviewData(ListData);
      setStarArr(ListData.map((item) => item.score));
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    console.log(reviewData);
  }, [reviewData])

  useEffect(() => {
    fetchReviewData();
  }, []);

  useEffect(() => {
    console.log(reviewData);
  }, [reviewData])

  // 리뷰 별점
  const handleStarClick = (score) => {
    setRating(score);
    console.log(score);
  };

  //리뷰 평점 내기
  const [starArr, setStarArr] = useState([]);
  const calcuAverageRating = () => {
    if (starArr.length === 0) {
      return 0;
    }
    const sum = starArr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const averageRating = sum / starArr.length;

    return averageRating.toFixed(1);
  }



  // 리뷰 날짜
  const date = new Date();
  const fomattedDate = moment(date).format("YYYY.MM.DD");

  // 리뷰 추천해요 버튼
  const handleLikeClick = (reviewIndex) => {
    const updatedReviewData = [...reviewData]; // 배열 복사
    const review = updatedReviewData[reviewIndex];

    if (!review.activeLike) {
      review.activeLike = true;
      review.likeCount += 1;
    } else {
      review.activeLike = false;
      review.likeCount -= 1;
    }

    setReviewData(updatedReviewData);
  };

  // 리뷰 수정
  const tiggleIsEdit = () => setEdit(!isEdit);
  const handleQuitEdit = () => {
    setEdit(false);
    setLocalTitle(state.title);
    setLocalContent(state.content);
  };

  // 토글 버튼 클릭 시 동작
  const handleToggleEdit = (review) => {
    setToggleEdit(!toggleEdit);
    handleEditClick(review);
  };
  // 기존 리뷰 수정 버튼 클릭 시 동작
  const handleEditClick = (review) => {
    setEdit(true);
    setLocalTitle(review.title);
    setLocalContent(review.content);
  };

  // 리뷰 수정하기 기능
  const handleSaveEdit = async (rid) => {
    console.log(rating);
    if (!window.confirm("리뷰를 수정하시겠습니까?")) return;
    const updatedReviewData = reviewData.map((review) =>
      review.uid === uid
        ? { ...review, title: localTitle, content: localContent, score: rating }
        : review
    );
    setReviewData(updatedReviewData);
    tiggleIsEdit();

    // 리뷰 수정 데이터 보내기
    let data = new FormData();
    data.append('title', localTitle);
    data.append('content', localContent);
    data.append('score', rating);
    console.log(data.get('score'))


    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `/cate/reviewedit/${rid}`,
      data: data
    };

    try {
      const res = await axios.request(config);
      console.log("리뷰수정 통신상태:", res.status);
      fetchReviewData();
    } catch (error) {
      console.log(error);
    }

  };

  // 리뷰 삭제하기 기능
  const handleDeleteReview = async (rid) => {

    if (!rid) { return; }
    if (!window.confirm("정말 리뷰를 삭제하시겠습니까")) { return; }

    let data = new FormData();
    data.append('reviewdyn', 'Y');

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `/cate/reviewedit/${rid}`,
      data: data
    };

    try {
      const res = await axios.request(config);
      console.log("리뷰삭제 통신상태:", res.status);
      fetchReviewData();
    } catch (error) {
      console.log(error);
    }
  };

  // 찜 목록
  useEffect((e) => {
    if (uid) {
      const fetchMenuData = async () => {
        try {
          const res = await axios.get(
            `/dlike/likeChk?uid=${uid}&did=${drinkId}`
          );
          setActiveHeart(res.data);
        } catch (error) {
          console.error("Error fetching menu data:", error);
        }
      };
      fetchMenuData();
    }
  }, [drinkId, uid]);

  // 찜 버튼 클릭
  const dLikeChkBtn = async (e) => {
    e.preventDefault();
    console.log("isLogin", isLogin);
    if (isLogin) {
      const dlikeData = {
        uid: uid,
        did: drinkId,
      };
      if (!activeHeart) {
        axios
          .post("/dlike/add", dlikeData)
          .then((res) => {
            // console.log(dlikeData);
            // console.log(res.data);
            alert("찜 등록");
          })
          .catch((error) => {
            alert("찜 실패 실패");
            console.error("Error while signing up:", error);
          });
      } else {
        axios
          .put(`/dlike/drop/${uid}/${drinkId}`)
          .then((res) => {
            alert("찜 해제");
          })
          .catch((error) => {
            alert("찜 실패 실패");
            console.error("Error while signing up:", error);
          });
      }
      setActiveHeart(!activeHeart);
    } else {
      alert("로그인 후 사용 가능합니다.");
    }
  };


  return (
    <div className="container">
      <div className="item__detail">
        <div className="item__detail-box">
          <div className="detail-box__img">
            <div
              className="product_img"
              style={{
                backgroundImage: detailImage ? `url(${detailImage})` : "",
              }}
            ></div>
          </div>
          <div className="detail-box__info">
            <div className="detail-box__top">
              <h3 className="detail-box__title">{detailData.name}</h3>
            </div>
            <div className="detail-box__bottom">
              <ul className="detail-box__list">
                <li>
                  <span>평점</span>{calcuAverageRating()}
                </li>
                <li>
                  <span>가격</span>
                  {price}
                </li>
                <li>
                  <span>종류</span>
                  {category}
                </li>
                <li>
                  <span>도수</span>
                  {detailData.alc}%
                </li>
                <li>
                  <span>재료</span>
                  <p>{detailData.ingre}</p>
                </li>
                <li>
                  <span>제조사</span>
                  <p>{detailData.maker}</p>
                </li>
                <li>
                  <span>주소</span>
                  <p>{detailData.region}</p>
                </li>
              </ul>
              <div className="detail-box__btn">
                <div>
                  <button
                    className={`btn_heart ${activeHeart === true ? "active" : ""
                      }`}
                    onClick={dLikeChkBtn}
                  >
                    찜
                  </button>
                </div>
                <div>
                  <CopyToClipboard
                    text={`${process.env.REACT_APP_APP_HOST}${location.pathname}`}
                    onCopy={() => { alert("클립보드에 복사되었습니다."); setActiveShare(!activeShare) }}
                  >
                    <button
                      className={`btn_share ${activeShare ? "active" : ""}`}
                    >
                      공유하기
                    </button>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="item__detail-view">
          <div className="detail-view__icon">
            <i className="ico_arrow"></i>
          </div>
          <div className="detail-view__inner">
            <div className="detail-view__tab">
              <div
                className={
                  scrollActive ? "detail-view__menu fixed" : "detail-view__menu"
                }
              >
                <ul>
                  <li className={scrollActiveTab ? "" : "active"}>
                    <button>우리술 정보</button>
                  </li>
                  <li className={scrollActiveTab ? "active" : ""}>
                    <button>우리술 후기</button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="detail-view__info">
              <article className="detail-view__text">
                <p>"{detailData.info}"</p>
              </article>
              <article className="detail-view__graph">
                <h2>시음 그래프</h2>
                <div className="view_graph__inner">
                  <div className="view_graph__ratio">
                    <span>0</span>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                  </div>
                  <div className="view_graph__item">
                    <div className="graph__item">
                      <div className="graph__item_name">단맛</div>
                      <div className="graph__item_bar">
                        <div
                          className="bar"
                          style={{ width: `${sweetPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="graph__item">
                      <div className="graph__item_name">신맛</div>
                      <div className="graph__item_bar">
                        <div
                          className="bar"
                          style={{ width: `${sourPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="graph__item">
                      <div className="graph__item_name">청량감</div>
                      <div className="graph__item_bar">
                        <div
                          className="bar"
                          style={{ width: `${coolPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="graph__item">
                      <div className="graph__item_name">바디감</div>
                      <div className="graph__item_bar">
                        <div
                          className="bar"
                          style={{ width: `${bodyPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="graph__item">
                      <div className="graph__item_name">균형감</div>
                      <div className="graph__item_bar">
                        <div
                          className="bar"
                          style={{ width: `${balancePercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
              {/* <DrinkReview drinkId={drinkId} /> */}
              <article className="detail-view__review">
                <div className="view__review_title">
                  <h2>{reviewData.length}개의 후기</h2>
                  {reviewData.some((review) => review.uid === uid) ? (
                    // <button className="btn_remove" onClick={handleDeleteReview}>
                    //   내가 쓴 리뷰 삭제하기
                    // </button>
                    <></>
                  ) : (
                    <button onClick={() => handleReviewin()}>
                      리뷰쓰기<i className="ico_write"></i>
                    </button>
                  )}

                </div>
                <div className="view__review_body">
                  {activeReview ? (
                    <div className="view__review_inner">
                      <form className="view__review_left">
                        <div className="view__review_int">
                          <input
                            ref={titleInput}
                            name="title"
                            // value={state.title || ''}
                            value={state.title}
                            className="int"
                            placeholder="제목"
                            onChange={handleChangeTitle}
                          />
                          <div className="review_score" >
                            {Array.from({ length: 5 }).map((_, i) => {
                              const starValue = i + 1;
                              return (
                                <div
                                  key={i}
                                  className={`star ${starValue <= rating ? "active" : ""
                                    }`}
                                  onClick={() => handleStarClick(starValue)}
                                  name="star"
                                  value={rating}
                                >
                                  <i
                                    className={`ico_star${starValue <= rating ? "" : "_b"
                                      }`}
                                  ></i>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <textarea
                          ref={contentInput}
                          name="content"
                          value={state.content}
                          className="int"
                          placeholder="내용"
                          onChange={handleChangeContent}
                        ></textarea>
                      </form>
                      <div className="view__review_right">
                        <div className="review_date">{fomattedDate}</div>
                        <form className="review_file">
                          <input
                            type="file"
                            name="image"
                            ref={imageInput}
                            value={state.image}
                            className="review_upload"
                            onChange={handleImageChange}
                          />
                          <div
                            className="review_img"
                            style={{
                              backgroundImage: selectedImage
                                ? `url(${URL.createObjectURL(selectedImage)})`
                                : ``,
                            }}
                          ></div>
                        </form>
                        <div className="view__review_btn">
                          {isEdit ? (
                            ""
                          ) : (
                            <>
                              <button
                                className="btn_edit"
                                onClick={handleSubmit}
                              >
                                저장
                              </button>
                              <button className="btn_remove">취소</button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {reviewData.length === 0 ? (
                    <div className="view__review_nodata">
                      <i className="ico_nodata"></i>
                      <p>아직 리뷰가 없습니다.</p>
                    </div>
                  ) : (
                    // 리뷰 목록 시작
                    reviewData.map((review, index) => (
                      <div className="view__review_inner" key={index}>
                        <div className="view__review_left">
                          <div style={{ width: "100%" }}>
                            <div className="review_title">
                              {isEdit && review.uid === uid ? (
                                <input
                                  name="title"
                                  value={localTitle}
                                  className="int"
                                  onChange={(e) =>
                                    setLocalTitle(e.target.value)
                                  }
                                />
                              ) : (
                                <>
                                  <p>{review.title}</p>
                                  {review.uid === uid && (
                                    <>
                                      <span>내 리뷰</span>
                                      <button
                                        className="btn_edit"
                                        onClick={() => handleToggleEdit(review)}
                                      >
                                        <i className="ico_edit"></i>
                                      </button>
                                      <button
                                        className="btn_delete"
                                        onClick={() => handleDeleteReview(review.reviewId)} >
                                        삭제
                                      </button>
                                    </>
                                  )}
                                </>
                              )}
                            </div>
                            <div className="review_score">
                              {isEdit && review.uid === uid ? (
                                (Array.from({ length: 5 }).map((_, i) => {
                                  const starValue = i + 1;
                                  return (
                                    <div
                                      key={i}
                                      className={`star ${starValue <= rating ? "active" : ""
                                        }`}
                                      onClick={() => handleStarClick(starValue)}
                                      name="star"
                                      value={rating}
                                    >
                                      <i
                                        className={`ico_star${starValue <= rating ? "" : "_b"
                                          }`}
                                      ></i>
                                    </div>
                                  );
                                }))
                              ) :
                                (
                                  Array.from({ length: 5 }).map((_, i) => (
                                    <div
                                      key={i}
                                      className="star"
                                      name="star"
                                      value={review.score}
                                    >
                                      <i
                                        className={`ico_star${i + 1 <= review.score ? "" : "_b"
                                          }`}
                                      ></i>
                                    </div>
                                  ))
                                )
                              }

                            </div>
                          </div>
                          {isEdit && review.uid === uid ? (
                            <>
                              <textarea
                                className="int edit"
                                value={localContent}
                                onChange={(e) =>
                                  setLocalContent(e.target.value)
                                }
                              ></textarea>
                            </>
                          ) : (
                            <><p className="review_text">{review.content}</p></>
                          )}
                          {isEdit && review.uid === uid ? (
                            null
                          ) : (
                            <div className="review_nick">
                              <>{review.nick}님이 작성하신 리뷰입니다</>
                            </div>
                          )}
                        </div>
                        <div className="view__review_right">
                          <div className="review_date">{review.data}</div>

                          {isEdit && review.uid === uid ? (
                            <form className="review_file">
                              <input
                                type="file"
                                name="image"
                                ref={imageInput}
                                value={state.image}
                                className="review_upload"
                                onChange={handleImageChange}
                              />
                              <div
                                className="review_img"
                                style={{
                                  backgroundImage: selectedImage
                                    ? `url(${URL.createObjectURL(selectedImage)})`
                                    : ``,
                                }}
                              ></div>
                            </form>
                          ) : (
                            <div
                              className="review_img"
                              style={{
                                backgroundImage: `url(${review.rimg})`
                                // backgroundImage: `url(../src/main/resources/img/drink${drinkId}/rimg${review.reviewId})`

                              }}
                            ></div>
                          )}

                          {isEdit && review.uid === uid ? (
                            <div className="view__review_btn">
                              <button
                                className="btn_edit"
                                onClick={() => handleSaveEdit(review.reviewId)}
                              >
                                수정
                              </button>
                              <button
                                className="btn_remove"
                                onClick={handleQuitEdit}
                              >
                                취소
                              </button>
                            </div>
                          ) : (
                            <div className="review_like">
                              <button
                                className={`btn_like ${review.activeLike ? "active" : ""
                                  }`}
                                onClick={() => handleLikeClick(index)}
                              >
                                추천해요<i className="ico_like"></i>(
                                {review.likeCount})
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                  {/* 리뷰 목록 끝 */}
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;