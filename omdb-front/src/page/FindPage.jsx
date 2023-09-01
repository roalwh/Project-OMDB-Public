import { useState, useEffect } from "react";
import subFindBanner from "../static/img/subFindBanner.jpg";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import DrinkKindMenu from "../components/DrinkKindMenu";
import Paging from "../components/Paging";

function FindPage() {
  const [tab, setTab] = useState(false);
  const [selectedTab, setSelectedTab] = useState("ALL");
  const [categoryName, setCategoryName] = useState(0);
  const [menuArr, setMenuArr] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [word, setWord] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 12;


    // 목록 데이터 호출
  const fetchMenuData = async () => {
    try {
      const res = await axios.get("cate/all");
      const menuData = res.data.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.desclist.drename,
        type: item.desclist.dname,
        imageUrl: `${process.env.REACT_APP_API_HOST}${item.path}`,
      }));
      setMenuArr(menuData);
    } catch (error) {
      console.error("Error", error);
    }
  };

  // 목록 데이터 호출
  useEffect(() => {
    fetchMenuData();
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

  // 전체메뉴 데이터
  const renderAllMenus = () => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;

    return menuArr.slice(startIndex, endIndex).map((menuItem, i) => (
      <div className="product_inner" key={i}>
        <ProductItem
          name={menuItem.name}
          description={menuItem.description}
          imageUrl={menuItem.imageUrl}
          did={menuItem.id}
        />
      </div>
    ));
  };

  // 탭메뉴 데이터
  const renderFilteredMenus = () => {
    const filteredMenus = menuArr.filter(
      (menuItem) => menuItem.type === categoryName
    );

    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;

    return filteredMenus.slice(startIndex, endIndex).map((menuItem, i) => (
      <div className="product_inner" key={i}>
        <ProductItem
          name={menuItem.name}
          description={menuItem.description}
          imageUrl={menuItem.imageUrl}
          did={menuItem.id}
        />
      </div>
    ));
  };

  // 검색어 입력
  const handleSearchChange = (e) => {
    console.log(word);
    setWord(e.target.value);
  };

  // 전송버튼
  const handleWordSearch = (e) => {
    console.log(e)
    e.preventDefault();
    console.log(categoryName);
    console.log(word);
    if(categoryName==0){
      axios
      .get(`cate/search?&name=${word}`)
      .then((res) => {
        const searchData = res.data;
        setSearchResult(searchData);
        setNoResult(searchData.length === 0);
        // setSelectedTab("ALL");
        // setTab(0);
        setCurrentPage(1);
        console.log(searchData);
      })
      .catch((error) => {
        console.log("오류");
        setSearchResult([]);
        setNoResult(true);
      });
    }
    else if(categoryName!=0){
      axios
      .get(`cate/search?&category=${categoryName}&name=${word}`)
      .then((res) => {
        const searchData = res.data;
        setSearchResult(searchData);
        setNoResult(searchData.length === 0);
        // setSelectedTab("ALL");
        // setTab(0);
        setCurrentPage(1);
        console.log(searchData);
      })
      .catch((error) => {
        console.log("오류");
        setSearchResult([]);
        setNoResult(true);
      });
    }else{
      axios
      .get(`cate/search?&name=${word}`)
      .then((res) => {
        const searchData = res.data;
        setSearchResult(searchData);
        setNoResult(searchData.length === 0);
        // setSelectedTab("ALL");
        // setTab(0);
        setCurrentPage(1);
        console.log(searchData);
      })
      .catch((error) => {
        console.log("오류");
        setSearchResult([]);
        setNoResult(true);
      });
    }
    
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalCount = noResult
    ? 0
    : searchResult.length > 0
      ? searchResult.length
      : selectedTab === "ALL"
        ? menuArr.length
        : menuArr.filter((item) => item.type === categoryName).length;

  
  return (
    <>
      <div className="container sub">
        <img
          src={subFindBanner}
          alt="서브페이지 배너"
          className="search_banner"
        />
        <div className="container_inner">
          <div className="mainInner sub">
            <DrinkKindMenu
              setTab={setTab}
              setSelectedTab={setSelectedTab}
              setSearchResult={setSearchResult}
              setNoResult={setNoResult}
              setWord={setWord}
              setCategoryName={setCategoryName}
              setCurrentPage={setCurrentPage}
              tab={tab}
              selectedTab={selectedTab}
            />
          </div>
          <div className="sub_search" >
            <div className="sub_search__inner">
              <form className="search-form">
                <input
                  type="search"
                  value={word}
                  className="search-form__input int"
                  placeholder="전통주 이름을 검색하세요"
                  onChange={handleSearchChange}
                />
                <button type="submit" className="search-form__button" onClick={handleWordSearch}>
                  검색
                </button>
              </form>
              <div className="search-tag">
                <ul>
                  <li>
                    <a href="#">#선물하기좋은</a>
                  </li>
                  <li>
                    <a href="#">#달콤한</a>
                  </li>
                  <li>
                    <a href="#">#도수낮은</a>
                  </li>
                  <li>
                    <a href="#">#깔끔한</a>
                  </li>
                  <li>
                    <a href="#">#탄산있는</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="sub-info">
            <div className="sub-info__top">
              <h2 className="sub-info__title">
                {selectedTab === "ALL" && !word
                  ? `우리술 정보(${menuArr.length})`
                  : noResult
                    ? "우리술 정보(0)"
                    : `우리술 정보(${totalCount})`}
              </h2>
              {/* <select name="" id="" className="sub-info__select">
                <option value="1">최신순</option>
                <option value="1">평점순</option>
              </select> */}
            </div>

            <div className="sub-info__inner">
              {noResult ? (
                <div className="no_data">
                  <i className="ico_error"></i>
                  <p className="no_data_text">
                    검색어가 포함된 우리술 정보가 없습니다.
                  </p>
                </div>
              ) : searchResult.length > 0 ? (
                searchResult
                  .slice(
                    (currentPage - 1) * POSTS_PER_PAGE,
                    currentPage * POSTS_PER_PAGE
                  )
                  .map((menuItem, i) => (
                    <div className="product_inner" key={i}>
                      <ProductItem
                        name={menuItem.name}
                        description={menuItem.desclist.drename}
                        imageUrl={`${process.env.REACT_APP_API_HOST}${menuItem.path}`}
                        did={menuItem.id}
                      />
                    </div>
                  ))
              ) : selectedTab === "ALL" ? (
                renderAllMenus()
              ) : (
                renderFilteredMenus()
              )}
            </div>
            <div className="sub-info__paging">
              <Paging
                page={currentPage}
                count={totalCount}
                setPage={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FindPage;
