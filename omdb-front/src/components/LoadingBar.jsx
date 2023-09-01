import React from "react";
import { ScaleLoader } from "react-spinners";

function LoadingBar({ text }) {
  return (
    <div className="loading">
      <ScaleLoader color="#61a0ff" className="loading_icon" />
      <p className="loading_text">{text}</p>
    </div>
  )
}

export default LoadingBar