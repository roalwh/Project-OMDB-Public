import React, { useState, useEffect } from "react";
import AdminEditor from "./AdminEditor";
import axios from "axios";

export default function DrinkEdit({ drinkData, uid }) {
  const onSubmit = (datas) => {
    const {
      // files,
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
      cool,
      body,
      balance,
      insense,
      throat,
    } = datas;

    const FormData = require("form-data");
    const data = new FormData();

    // console.log(region);
    // console.log(info);
    // console.log(maker);
    // console.log(address);
    // console.log(region + " " + address);

    // data.append("files", files);
    data.append("orderuid", uid);
    data.append("name", name);
    data.append("alc", alc);
    data.append("ingre", ingre);
    data.append("maker", maker);
    data.append("address", region + " " + address);
    data.append("region", region);
    data.append("price", price);
    data.append("food", food);
    data.append("info", info);
    data.append("category", category);
    data.append("sweet", sweet);
    data.append("sour", sour);
    data.append("body", body);
    data.append("cool", cool);
    data.append("balance", balance);
    data.append("insense", insense);
    data.append("throat", throat);

    // console.log(datas);
    // console.log(data.key);

    const config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `/dri/drinkedit/${drinkData.did}`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };
    axios
      .request(config)
      .then((res) => {
        // console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    alert("수정되었습니다.");
  };

  return (
    <>
      <div id="board" className="admin">
        <AdminEditor drinkData={drinkData} onSubmit={onSubmit} type="edit" />
      </div>
    </>
  );
}
