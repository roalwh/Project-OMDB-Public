import React, { useState, useEffect } from "react";
import AdminNewEditor from "./AdminNewEditor";
import axios from "axios";

export default function DrinkNew(uid) {
  // 새 전통주 바로 등록해버리기!
  const onSubmit = (datas) => {
    const {
      files,
      name,
      alc,
      ingre,
      maker,
      address,
      region,
      price,
      food,
      info,
      category,
      sweet,
      sour,
      body,
      balance,
      insense,
      throat,
    } = datas;
    // console.log("data:", datas);

    const FormData = require("form-data");
    const data = new FormData();

    data.append("orderuid", uid.uid);
    data.append("files", files);
    data.append("name", name);
    data.append("alc", alc);
    data.append("ingre", ingre);
    data.append("maker", maker);
    data.append("address", address);
    data.append("region", region);
    data.append("price", price);
    data.append("food", food);
    data.append("info", info);
    data.append("category", category);
    data.append("sweet", sweet);
    data.append("sour", sour);
    data.append("body", body);
    data.append("balance", balance);
    data.append("insense", insense);
    data.append("throat", throat);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/dri/drinkIn",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    axios
      .request(config)
      .then((res) => {
        // console.log(res);
        alert("저장되었습니다.");
      })
      .catch((error) => {
        alert("저장되었습니다.");
        console.log(error);
      });
  };
  return (
    <>
      <div id="board" className="admin">
        <AdminNewEditor onSubmit={onSubmit} type="new" />
      </div>
    </>
  );
}
