import React from "react";
import { Link } from "react-router-dom";

function ProductItem({ name, description, imageUrl, did, type }) {
  const itemStyle = {
    backgroundImage: `url(${imageUrl})`,
  };

  return (
    <div className={type === "mypage" ? "product mypage" : "product"}>
      <Link
        to={{
          pathname: `/${did}`,
          state: { itemStyle: itemStyle }, // Pass the itemStyle here
        }}
        key={did}
      >
        <div style={itemStyle} className="product_img"></div>
      </Link>
      <div className="product__details">
        <p className="product__text">{description}</p>
        <h3>{name}</h3>
      </div>
    </div>
  );
}

export default ProductItem;
