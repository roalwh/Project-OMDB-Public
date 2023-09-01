import React from "react";
import Pagination from "react-js-pagination";

const Paging = ({ page, count, setPage, type }) => {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={type === "admin" ? 7 : 12}
      totalItemsCount={count}
      pageRangeDisplayed={10}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={setPage}
    />
  );
};

export default Paging;
