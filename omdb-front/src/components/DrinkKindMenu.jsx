import React from "react";

function DrinkKindMenu({ setTab, setSelectedTab, setSearchResult,
  setNoResult, setWord, setCategoryName, setCurrentPage, tab, selectedTab }) {
  // 탭메뉴 이벤트
  const selectMenuHandler = (i) => {
    setTab(i);
    setSelectedTab(i === 0 ? "ALL" : i);
    setSearchResult([]);
    setNoResult(false);
    setWord("");

    let newCategoryName = "";

    switch (i) {
      case 0:
        newCategoryName = 0;
        break;
      case 1:
        newCategoryName = "TAK";
        break;
      case 2:
        newCategoryName = "CHE";
        break;
      case 3:
        newCategoryName = "SPI";
        break;
      case 4:
        newCategoryName = "WIN";
        break;
      case 5:
        newCategoryName = "ETC";
        break;
      default:
        break;
    }
    setCategoryName(newCategoryName);
    // setCurrentPage(1); // Reset the current page when changing the category
  };

  return (
    <div className="mainInner">
      <ul className="quickBtn">
        <li
          className={selectedTab === "ALL" ? "is-active" : ""}
          onClick={() => selectMenuHandler(0)}
        >
          <a>
            <span>전체</span>
          </a>
        </li>
        <li
          className={tab === 1 ? "is-active" : ""}
          onClick={() => selectMenuHandler(1)}
        >
          <a>
            <span>탁주(막걸리)</span>
          </a>
        </li>
        <li
          className={tab === 2 ? "is-active" : ""}
          onClick={() => selectMenuHandler(2)}
        >
          <a>
            <span>청주</span>
          </a>
        </li>
        <li
          className={tab === 3 ? "is-active" : ""}
          onClick={() => selectMenuHandler(3)}
        >
          <a>
            <span>증류주</span>
          </a>
        </li>
        <li
          className={tab === 4 ? "is-active" : ""}
          onClick={() => selectMenuHandler(4)}
        >
          <a>
            <span>과실주</span>
          </a>
        </li>
        <li
          className={tab === 5 ? "is-active" : ""}
          onClick={() => selectMenuHandler(5)}
        >
          <a>
            <span>기타주류</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default DrinkKindMenu;
