import React from "react"
import { Link } from "react-router-dom"
import mainLogo from "../static/img/mainLogo.png"

export default function Footer() {

  return <>
    <footer id="footer">
      <div className="container">
        <div className="foot_inner">
          <h1 className="logo">
            <Link to="/">
              <img src={mainLogo} />
              <p>술렁술렁</p>
            </Link>
          </h1>
          {/* <div className="foot_text">
            <p className="foot_text_top">
              제작 : 술렁술렁팀 <br />
              주소 : 서울특별시 구로구 디지털로 306 대륭포스트타워 2차 203호<br />
              문의 : 02-838-1680
            </p>
            <p className="copyright">Copyright©2023 by OMDB all rights reserved.</p>
          </div> */}
          <div className="foot_content">
            <div className="foot_text">
              <p className="foot_text_top">
                제작 : 술렁술렁팀 <br />
                주소 : 서울특별시 구로구 디지털로 306 대륭포스트타워 2차 203호<br />
                문의 : 02-838-1680
              </p>
            </div>
            <div className="foot_kakao">
              <Link to="https://open.kakao.com/o/sdlPSPCf">
                <i className="ico_kakao"></i>
                <p>카카오톡 문의</p>
              </Link>
            </div>
          </div>
        </div>
        <p className="copyright">Copyright©2023 by OMDB all rights reserved.</p>
      </div>
    </footer>
  </>;
}
