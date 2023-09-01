import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import BoardDetail from "./BoardDetail";
import BoardEdit from "./BoardEdit";
import BoardHome from "./BoardHome";
import BoardNew from "./BoardNew"


export const BoardStateContext = React.createContext();
export const BoardDispatchContext = React.createContext();

function BoardPage() {
  // 
  const isLogin = sessionStorage.getItem("isLogin");
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  // 검색한 데이터
  const [boraddata, setboraddata] = useState();

  // kind 값
  const [selectkind, setkind] = useState();
  // orderby 값
  const [orderby, setorderby] = useState("");
  // name 값
  const [selectname, setselectname] = useState("");

  // const [filteredData, setFilteredData] = useState();

  const changekind = (value) => {
    setkind(value);
  }

  const changeorderby = (value) => {
    setorderby(value);
  }
  const changename = (value) => {
    setselectname(value);
  }


  // 전채 게시글 가져오기
  const allboard = () => {
    axios.get("/board/view/all")
      .then((response) => {
        setboraddata(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }
  // 조건 검색
  const selectboard = () => {
    if(!selectkind && !selectname){
      return allboard();
    }
    if (!orderby) {
      if (!selectname) {
        axios.get(`/board/view?kind=${selectkind}`)
          .then((response) => {
            setboraddata(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (!selectkind) {
        axios.get(`/board/view?title=${selectname}`)
          .then((response) => {
            setboraddata(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios.get(`/board/view?kind=${selectkind}&title=${selectname}`)
          .then((response) => {
            setboraddata(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      if (!selectname) {
        axios.get(`/board/view?kind=${selectkind}&orderby=${orderby}`)
          .then((response) => {
            setboraddata(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (!selectkind) {
        axios.get(`/board/view?title=${selectname}&orderby=${orderby}`)
          .then((response) => {
            setboraddata(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios.get(`/board/view?kind=${selectkind}&title=${selectname}&orderby=${orderby}`)
          .then((response) => {
            setboraddata(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (selectkind || selectname) {
        selectboard();
      } else {
        allboard();
      }  
    }, 50);
    
    console.log("게시판데이터 : ", boraddata);
  }, [selectkind,selectname]);

  return (
    <BoardStateContext.Provider value={boraddata}>
                <div className="BoardPage">
      <Routes>
        <Route path="/home" element={
        <BoardHome isLogin={isLogin} userData={userData} allboard={allboard} selectboard={selectboard}
         boraddata={boraddata} selectkind={selectkind} changekind={changekind} changeorderby={changeorderby} 
         changename={changename} />
        } />
        <Route path="/new" element={<BoardNew allboard={allboard}/>} />
        <Route path="/detail/:bid" element={<BoardDetail allboard={allboard} selectboard={selectboard}
         boraddata={boraddata} selectkind={selectkind} changekind={changekind} changeorderby={changeorderby} 
         changename={changename}/>} />
        {/* <Route path="/comment/no/:cid" element={<Reply />} /> */}
        <Route path="/edit/:bid" element={<BoardEdit allboard={allboard} selectboard={selectboard}
         boraddata={boraddata} selectkind={selectkind} changekind={changekind} changeorderby={changeorderby} 
         changename={changename}/>} />
      </Routes>
    </div>
    </BoardStateContext.Provider>



  );

}

export default BoardPage;