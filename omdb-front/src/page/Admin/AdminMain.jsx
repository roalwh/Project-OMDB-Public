import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import Paging from "../../components/Paging";
import DrinkNew from "./DrinkNew";
import DrinkEdit from "./DrinkEdit";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../Admin";

function AdminMain() {
  const { userData, handleLogin, inputUserData } = useContext(UserContext);
  const isLogin = sessionStorage.getItem("isLogin");

  const [name, setName] = useState("");
  const [uid, setUid] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const sessionToken = sessionStorage.token;

  const toggleLogoutHandler = () => {
    alert("로그아웃 하였습니다.");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("expirationTime");
    sessionStorage.removeItem("isLogin");
    sessionStorage.removeItem("userData");
    handleLogin(false);
    inputUserData(null);
    navigate("/admin/login", true);
  };

  useEffect(() => {
    if (isLogin) {
      const accessToken = "Bearer " + sessionToken;

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "/member/me",
        headers: {
          Authorization: accessToken,
        },
      };
      axios
        .request(config)
        .then((res) => {
          // console.log("header - res.data", res.data);
          if (res.data) {
            // console.log(res.data);
            // if (res.data.authority === "ROLE_USER") {
            //   toggleLogoutHandler("관리자 권한이 없습니다.");
            // }
            setUid(res.data.uid);
            setName(res.data.name);
            setStatus(res.data.authority);
            inputUserData(res.data);
            sessionStorage.setItem("userData", JSON.stringify(res.data));
            // sessionStorage.setItem("userData",res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLogin]);

  const [tab, setTab] = useState(0);

  // 페이징

  const [pageData, setPageData] = useState([]);
  const [count, setCount] = useState(0); //아이템 총 개수
  const [currentpage, setCurrentpage] = useState(1); //현재페이지
  const [postPerPage] = useState(7); //페이지당 아이템 개수

  const [indexOfLastPost, setIndexOfLastPost] = useState(0);
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);
  const [currentPosts, setCurrentPosts] = useState(0);

  const setPage = (e) => {
    setCurrentpage(e);
    setCheckItems([]);
  };

  // 관리자 유저 정보
  const [adminArr, setAdminArr] = useState([]);

  const fetchAdminData = async () => {
    try {
      const res = await axios.get("admin/adminlist");
      const adminData = res.data.map((item) => ({
        id: item.uid,
        userid: item.id,
        name: item.name,
        nick: item.nick,
        email: item.email,
        phone: item.phone,
        userflag: item.userflag,
        authority: item.authority,
      }));
      setAdminArr(adminData);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };
  useEffect(() => {
    fetchAdminData();
  }, []);

  // 초기 데이터 호출
  useEffect(() => {
    setPageData(adminArr);
  }, [adminArr]);

  // 일반 유저 정보
  const [userArr, setUserArr] = useState([]);

  const fetchUserData = async () => {
    try {
      const res = await axios.get("admin/userlist");
      const userData = res.data.map((item) => ({
        id: item.uid,
        userid: item.id,
        name: item.name,
        nick: item.nick,
        email: item.email,
        phone: item.phone,
        userflag: item.userflag,
      }));
      setUserArr(userData);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // 전통주 데이터
  const [menuArr, setMenuArr] = useState([]);
  const fetchMenuData = async () => {
    try {
      const res = await axios.get("dri/all");
      const menuData = res.data.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.desclist.drename,
        region: item.region,
        price: item.price,
        alc: item.alc,
        dname: item.desclist.dname,
      }));
      setMenuArr(menuData);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };
  useEffect(() => {
    fetchMenuData();
  }, []);

  // 게시판 데이터
  const [boardArr, setBoardArr] = useState([]);
  const fetchBoardData = async () => {
    try {
      const res = await axios.get("board/view/all");
      const boardData = res.data.map((item) => ({
        id: item.bid,
        kind: item.kind,
        title: item.title,
        content: item.content,
        hits: item.hits,
        cnt: item.cnt,
        writer: item.writer,
        cdatetime: item.cdatetime,
      }));
      setBoardArr(boardData);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };
  useEffect(() => {
    fetchBoardData();
  }, []);

  useEffect(() => {
    // console.log(pageData);
    setCount(pageData.length);
    setIndexOfLastPost(currentpage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(pageData.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentpage, indexOfFirstPost, indexOfLastPost, pageData, postPerPage]);

  // 체크된 아이템을 담을 배열
  const [checkItems, setCheckItems] = useState([]);

  // 체크박스 단일 선택
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems((prev) => [...prev, id]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };
  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      const idArray = [];
      currentPosts.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  };

  // 계정 상태에 따른 회원 데이터 조회
  const [userStatus, setUserStatus] = useState("All");
  const viewStatus = () => {
    setCurrentpage(1);
    if (userStatus === "All") {
      setUserStatus("normal");
      const filterData = userArr.filter((userItem) => userItem.userflag === 0);
      setPageData(filterData);
    } else if (userStatus === "normal") {
      setUserStatus("ban");
      const filterData = userArr.filter((userItem) => userItem.userflag === 1);
      setPageData(filterData);
    } else if (userStatus === "ban") {
      setUserStatus("out");
      const filterData = userArr.filter((userItem) => userItem.userflag === 2);
      setPageData(filterData);
    } else {
      setUserStatus("All");
      setPageData(userArr);
    }
  };

  // 전통주 검색 기능
  const [word, setWord] = useState("");
  // const [searchResult, setSearchResult] = useState([]);

  // 검색어 구분
  const [search, setSearch] = useState("");

  // 검색어 입력
  const handleSearchChange = (e) => {
    setWord(e.target.value);
  };

  // 전송버튼
  const handleWordSearch = (e) => {
    e.preventDefault();
    if (search === "drink") {
      axios
        .get(`dri/search?name=${word}`)
        .then((res) => {
          const searchData = res.data.map((item) => ({
            id: item.did,
            name: item.name,
            description: item.desclist.drename,
            region: item.region,
            price: item.price,
            alc: item.alc,
          }));
          setDrinkStatus("All");
          setPageData(searchData);
          // setNoResult(searchData.length === 0);
          setCurrentpage(1);
          // console.log(res);
        })
        .catch((error) => {
          console.log("오류");
        });
    } else {
      axios
        .get(`board/view?title=${word}`)
        .then((res) => {
          const searchData = res.data.map((item) => ({
            id: item.bid,
            kind: item.kind,
            title: item.title,
            content: item.content,
            hits: item.hits,
            cnt: item.cnt,
            writer: item.writer,
            cdatetime: item.cdatetime,
          }));
          setBoardStatus("All");
          setPageData(searchData);
          // setNoResult(searchData.length === 0);
          setCurrentpage(1);
          // console.log(res);
        })
        .catch((error) => {
          console.log("오류");
        });
    }
  };

  // 전통주 종류에 따른 회원 데이터 조회
  const [drinkStatus, setDrinkStatus] = useState("All");
  const dStatus = () => {
    setCurrentpage(1);
    if (drinkStatus === "All") {
      setDrinkStatus("TAK");
      const filterData = menuArr.filter((menuItem) => menuItem.dname === "TAK");
      setPageData(filterData);
    } else if (drinkStatus === "TAK") {
      setDrinkStatus("CHE");
      const filterData = menuArr.filter((menuItem) => menuItem.dname === "CHE");
      setPageData(filterData);
    } else if (drinkStatus === "CHE") {
      setDrinkStatus("WIN");
      const filterData = menuArr.filter((menuItem) => menuItem.dname === "WIN");
      setPageData(filterData);
    } else if (drinkStatus === "WIN") {
      setDrinkStatus("SPI");
      const filterData = menuArr.filter((menuItem) => menuItem.dname === "SPI");
      setPageData(filterData);
    } else {
      setDrinkStatus("All");
      setPageData(menuArr);
    }
  };

  // 게시판 종류에 따른 회원 데이터 조회
  const [boardStatus, setBoardStatus] = useState("All");
  const bStatus = () => {
    setCurrentpage(1);
    if (boardStatus === "All") {
      setBoardStatus("notice");
      const filterData = boardArr.filter((bItem) => bItem.kind === 1);
      setPageData(filterData);
    } else if (boardStatus === "notice") {
      setBoardStatus("free");
      const filterData = boardArr.filter((bItem) => bItem.kind === 2);
      setPageData(filterData);
    } else if (boardStatus === "free") {
      setBoardStatus("last");
      const filterData = boardArr.filter((bItem) => bItem.kind === 3);
      setPageData(filterData);
    } else {
      setBoardStatus("All");
      setPageData(boardArr);
    }
  };

  //////////////////////////////////////////
  // 이제부터 버튼 이벤트 제발 한번에 되길//
  //////////////////////////////////////////

  // 계정 복구 처리 //
  const userBack = async (e) => {
    if (checkItems.length === 0) {
      return alert("계정을 복구하려는 회원을 선택해주세요.");
    }
    e.preventDefault();
    const backList = userArr.filter((uItem) => checkItems.includes(uItem.id));
    const backData = [
      {
        orderuid: uid,
        userflag: 0,
        userlist: backList.map((item) => ({
          uid: item.id,
          userid: item.userid,
        })),
      },
    ];

    if (
      window.confirm(
        backList.map((item) => item.userid) + " 계정을 정말  복구시키겠습니까?"
      )
    ) {
      axios
        .put("/admin/userset", backData)
        .then((res) => {
          // console.log(res.data);
          alert(
            backList.map((item) => item.userid) + " 계정이 복구되었습니다."
          );
          setCheckItems([]);
          const fetchUserData = async () => {
            try {
              const res = await axios.get("admin/userlist");
              const userData = res.data.map((item) => ({
                id: item.uid,
                userid: item.id,
                name: item.name,
                nick: item.nick,
                email: item.email,
                phone: item.phone,
                userflag: item.userflag,
              }));
              setPageData(userData);
            } catch (error) {
              console.error("Error fetching menu data:", error);
            }
          };
          fetchUserData();
          setCurrentpage(1);
        })
        .catch((error) => {
          alert("계정 복구 실패");
          console.error("Error while signing up:", error);
        });
    } else {
      alert("취소하였습니다.");
      setCheckItems([]);
    }
  };

  // 계정 정지 처리 //
  const userBan = async (e) => {
    if (checkItems.length === 0) {
      return alert("계정을 정지하려는 회원을 선택해주세요.");
    }
    e.preventDefault();
    const banlist = userArr.filter((uItem) => checkItems.includes(uItem.id));
    const banData = [
      {
        orderuid: uid,
        userflag: 1,
        userlist: banlist.map((item) => ({
          uid: item.id,
          userid: item.userid,
        })),
      },
    ];
    if (
      window.confirm(
        banlist.map((item) => item.userid) + " 계정을 정말 정지시키겠습니까?"
      )
    ) {
      axios
        .put("/admin/userset", banData)
        .then((res) => {
          // console.log(res.data);
          alert(banlist.map((item) => item.userid) + " 계정이 정지되었습니다.");
          setCheckItems([]);
          const fetchUserData = async () => {
            try {
              const res = await axios.get("admin/userlist");
              const userData = res.data.map((item) => ({
                id: item.uid,
                userid: item.id,
                name: item.name,
                nick: item.nick,
                email: item.email,
                phone: item.phone,
                userflag: item.userflag,
              }));
              setPageData(userData);
            } catch (error) {
              console.error("Error fetching menu data:", error);
            }
          };
          fetchUserData();
          setCurrentpage(1);
        })
        .catch((error) => {
          alert("계정 정지 실패");
          console.error("Error while signing up:", error);
        });
    } else {
      alert("취소하였습니다.");
      setCheckItems([]);
    }
  };

  // 관리자 권한 해제
  const adminDel = async (e) => {
    if (checkItems.length === 0) {
      return alert("권한을 해제하려는 관리자를 선택해주세요.");
    }
    e.preventDefault();
    const adminDelList = adminArr.filter((uItem) =>
      checkItems.includes(uItem.id)
    );
    const adminDelData = [
      {
        orderuid: uid,
        authority: "ROLE_USER",
        userlist: adminDelList.map((item) => ({
          uid: item.id,
          userid: item.userid,
        })),
      },
    ];
    // console.log(adminDelData);
    if (
      window.confirm(
        adminDelList.map((item) => item.userid) +
          " 계정의 관리자 권한을 해제하겠습니까?"
      )
    ) {
      axios
        .put("/admin/adminset", adminDelData)
        .then((res) => {
          // console.log(res.data);
          alert(
            adminDelList.map((item) => item.userid) +
              " 계정의 관리자 권한이 해제되었습니다."
          );
          setCheckItems([]);
          const fetchAdminData = async () => {
            try {
              const res = await axios.get("admin/adminlist");
              const adminData = res.data.map((item) => ({
                id: item.uid,
                userid: item.id,
                name: item.name,
                nick: item.nick,
                email: item.email,
                phone: item.phone,
                userflag: item.userflag,
                authority: item.authority,
              }));
              setPageData(adminData);
            } catch (error) {
              console.error("Error fetching menu data:", error);
            }
          };
          const fetchUserData = async () => {
            try {
              const res = await axios.get("admin/userlist");
              const userData = res.data.map((item) => ({
                id: item.uid,
                userid: item.id,
                name: item.name,
                nick: item.nick,
                email: item.email,
                phone: item.phone,
                userflag: item.userflag,
              }));
              setUserArr(userData);
            } catch (error) {
              console.error("Error fetching menu data:", error);
            }
          };
          fetchUserData();
          fetchAdminData();
          setCurrentpage(1);
        })
        .catch((error) => {
          alert("권한 해제 정지 실패");
          console.error("Error while signing up:", error);
        });
    } else {
      alert("취소하였습니다.");
      setCheckItems([]);
    }
  };

  // 관리자 권한 부여
  const adminSubmit = async (e) => {
    if (checkItems.length === 0) {
      return alert("관리자 권한을 부여할 회원을 선택해주세요.");
    }
    e.preventDefault();
    const adminSubList = userArr.filter((uItem) =>
      checkItems.includes(uItem.id)
    );
    const adminSubData = [
      {
        orderuid: uid,
        authority: "ROLE_ADMIN",
        userlist: adminSubList.map((item) => ({
          uid: item.id,
          userid: item.userid,
        })),
      },
    ];
    // console.log(adminSubData);
    if (
      window.confirm(
        adminSubList.map((item) => item.userid) +
          " 계정의 관리자 권한을 부여하겠습니까?"
      )
    ) {
      axios
        .put("/admin/adminset", adminSubData)
        .then((res) => {
          // console.log(res.data);
          alert(
            adminSubList.map((item) => item.userid) +
              " 계정의 관리자 권한이 부여되었습니다."
          );
          setCheckItems([]);
          window.location.replace("/admin");
        })
        .catch((error) => {
          alert("권한 부여 실패");
          console.error("Error while signing up:", error);
        });
    } else {
      alert("취소하였습니다.");
      setCheckItems([]);
    }
  };

  const [drinkNew, setDrinkNew] = useState("list");

  // 전통주 삭제
  const delDrink = async (e) => {
    if (checkItems.length === 0) {
      return alert("삭제를 희망하는 전통주를 선택해주세요.");
    }
    if (checkItems.length > 1) {
      setCheckItems([]);
      return alert("삭제를 원하는 하나의 전통주만 선택해주세요.");
    }
    if (window.confirm("정통주를 삭제하시겠습니까?")) {
      axios
        .delete(`/admin/drinkdel/${checkItems[0]}`, {
          params: {
            userId: uid,
          },
        })
        .then((res) => {
          // console.log(res.data);
          alert(checkItems[0] + "번째 전통주가 삭제되었습니다.");
          window.location.replace("/admin");
        })
        .catch((error) => {
          alert("삭제 실패");
          window.location.replace("/admin");
          console.error("Error while signing up:", error);
        });
    }
  };

  // 전통주 수정
  const [drinkData, setDrinkData] = useState({});
  const editDrink = () => {
    if (checkItems.length === 0) {
      return alert("수정을 원하는 전통주를 선택해주세요.");
    }
    if (checkItems.length > 1) {
      setCheckItems([]);
      return alert("수정을 원하는 하나의 전통주만 선택해주세요.");
    }
    const fetchDetailData = async () => {
      try {
        const res = await axios.get(`/dri/${checkItems[0]}`);
        console.log(res);
        setDrinkData(res.data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchDetailData();

    setDrinkNew("edit");
  };

  // 게시글 삭제
  const delBorad = async () => {
    if (checkItems.length === 0) {
      return alert("삭제를 희망하는 게시글을 선택해주세요.");
    }
    if (checkItems.length > 1) {
      setCheckItems([]);
      return alert("삭제를 원하는 하나의 게시글을 선택해주세요.");
    }

    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      fetch(`/board/inactive/${checkItems[0]}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          alert(checkItems[0] + "번째 게시글이 삭제되었습니다.");
          window.location.replace("/admin");
        })
        .catch((error) => {
          alert(checkItems[0] + "번째 게시글이 삭제되었습니다.");
          window.location.replace("/admin");
          console.error(error);
        });
    }
  };

  const [sendData, setSendData] = useState({});
  useEffect(() => {
    // console.log(drinkData);
    setSendData(drinkData);
  }, [drinkData]);

  return (
    <>
      {!sessionToken ? (
        navigate("/admin/login", true)
      ) : (
        <div id="admin">
          <div className="container">
            <div className="adminTop">
              <div className="leftArea">
                <h3>술렁술렁 관리자페이지</h3>
              </div>
              <div className="rightArea">
                <p>관리자명 : {name}</p>
                <p>
                  등급 :
                  {status === "ROLE_SADMIN" ? " 최상위 관리자" : " 일반 관리자"}
                </p>
                <a onClick={toggleLogoutHandler}>로그아웃</a>
              </div>
            </div>
            <div className="adminBottom">
              <div className="adminMenu">
                <dl>
                  <dt className="title">회원 관리</dt>
                  <dd className="name">
                    <a
                      href="#tab1"
                      onClick={() => {
                        setTab(0);
                        setPageData(adminArr);
                        setCheckItems([]);
                        setCurrentpage(1);
                        setDrinkStatus("All");
                        setWord("");
                        setUserStatus("All");
                      }}
                    >
                      <i className="ico_menu1"></i>
                      관리자 회원 관리
                    </a>
                  </dd>
                  <dd className="name">
                    <a
                      href="#tab2"
                      onClick={() => {
                        setTab(1);
                        setPageData(userArr);
                        setCurrentpage(1);
                        setCheckItems([]);
                        setUserStatus("All");
                        setWord("");
                        setDrinkStatus("All");
                      }}
                    >
                      <i className="ico_menu1"></i>
                      일반 회원 관리
                    </a>
                  </dd>
                </dl>
                <dl>
                  <dt className="title">컨텐츠 관리</dt>
                  <dd className="name">
                    <a
                      href="#tab3"
                      onClick={() => {
                        setTab(2);
                        setPageData(menuArr);
                        setCurrentpage(1);
                        setCheckItems([]);
                        setUserStatus("All");
                        setDrinkStatus("All");
                        setWord("");
                        setSearch("drink");
                      }}
                    >
                      <i className="ico_menu1"></i>
                      전통주 관리
                    </a>
                  </dd>
                  <dd className="name">
                    <a
                      href="#tab4"
                      onClick={() => {
                        setTab(3);
                        setPageData(boardArr);
                        setCheckItems([]);
                        setCurrentpage(1);
                        setDrinkStatus("All");
                        setUserStatus("All");
                        setSearch("board");
                        setWord("");
                      }}
                    >
                      <i className="ico_menu1"></i>
                      게시판 관리
                    </a>
                  </dd>
                </dl>
              </div>
              <div className="adminContent">
                {tab === 0 ? (
                  <div className="adminCont">
                    <div className="btnWrap">
                      <a className="levelUp" onClick={adminDel}>
                        관리자 해제
                      </a>
                    </div>
                    <h2 className="adminTitle">관리자 회원 관리</h2>
                    <table className="mypage_cont__table">
                      <thead>
                        <tr>
                          <th className="chkBox">
                            <input
                              type="checkbox"
                              name="select-all"
                              onChange={(e) => handleAllCheck(e.target.checked)}
                              // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                              checked={
                                checkItems.length === currentPosts.length
                                  ? true
                                  : false
                              }
                              disabled={true}
                            />
                          </th>
                          <th className="uname">아이디</th>
                          <th className="uname">닉네임</th>
                          <th>이름</th>
                          <th className="email">이메일</th>
                          <th>휴대폰번호</th>
                          <th className="status">관리자 등급</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentPosts && adminArr.length > 0 ? (
                          currentPosts.map((adminItem, i) => (
                            <tr key={i}>
                              <td className="chkBox">
                                <input
                                  type="checkbox"
                                  name={`admin-${i}`}
                                  onChange={(e) =>
                                    handleSingleCheck(
                                      e.target.checked,
                                      adminItem.id
                                    )
                                  }
                                  // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                                  checked={
                                    checkItems.includes(adminItem.id)
                                      ? true
                                      : false
                                  }
                                  disabled={
                                    adminItem.authority === "ROLE_SADMIN" ||
                                    status === "ROLE_ADMIN"
                                      ? true
                                      : false
                                  }
                                />
                              </td>
                              <td className="left">{adminItem.userid}</td>
                              <td className="left">{adminItem.nick}</td>
                              <td>{adminItem.name}</td>
                              <td className="left">{adminItem.email}</td>
                              <td>{adminItem.phone}</td>
                              <td
                                className={
                                  adminItem.authority === "ROLE_ADMIN"
                                    ? ""
                                    : "normal"
                                }
                              >
                                {adminItem.authority === "ROLE_ADMIN"
                                  ? "일반 관리자"
                                  : "최상위 관리자"}
                              </td>
                            </tr>
                          ))
                        ) : pageData.length === 0 ? (
                          <tr>
                            <td colSpan={7}>데이터가 없습니다.</td>
                          </tr>
                        ) : (
                          <tr>
                            <td colSpan={7}>데이터가 없습니다.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    <div className="sub-info__paging">
                      <Paging
                        page={currentpage}
                        count={count}
                        setPage={setPage}
                        type="admin"
                      />
                    </div>
                  </div>
                ) : null}
                {tab === 1 ? (
                  <div className="adminCont">
                    <div className="btnWrap">
                      <a className="levelUp" onClick={adminSubmit}>
                        관리자 지정
                      </a>
                      <a className="normal" onClick={userBack}>
                        회원 복구
                      </a>
                      <a className="ban" onClick={userBan}>
                        회원 정지
                      </a>
                    </div>
                    <h2 className="adminTitle">일반 회원 관리</h2>
                    <table className="mypage_cont__table">
                      <thead>
                        <tr>
                          <th className="chkBox">
                            <input
                              type="checkbox"
                              name="select-all"
                              onChange={(e) => handleAllCheck(e.target.checked)}
                              // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                              checked={
                                checkItems.length === currentPosts.length
                                  ? true
                                  : false
                              }
                            />
                          </th>
                          <th className="uname">아이디</th>
                          <th className="uname">닉네임</th>
                          <th>이름</th>
                          <th className="email">이메일</th>
                          <th>휴대폰번호</th>
                          <th className="status" onClick={viewStatus}>
                            계정 상태
                            <span
                              className={userStatus !== "All" ? "active" : ""}
                            >
                              (
                              {userStatus === "All"
                                ? "전체"
                                : userStatus === "normal"
                                ? "정상"
                                : userStatus === "ban"
                                ? "정지"
                                : "탈퇴"}
                              )
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentPosts && userArr.length > 0
                          ? currentPosts.map((userItem, i) => (
                              <tr key={i}>
                                <td className="chkBox">
                                  <input
                                    type="checkbox"
                                    name={`select-${i}`}
                                    onChange={(e) =>
                                      handleSingleCheck(
                                        e.target.checked,
                                        userItem.id
                                      )
                                    }
                                    // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                                    checked={
                                      checkItems.includes(userItem.id)
                                        ? true
                                        : false
                                    }
                                  />
                                </td>
                                <td className="left">{userItem.userid}</td>
                                <td className="left">{userItem.nick}</td>
                                <td>{userItem.name}</td>
                                <td className="left">{userItem.email}</td>
                                <td>{userItem.phone}</td>
                                <td
                                  className={
                                    userItem.userflag === 0
                                      ? "normal"
                                      : userItem.userflag === 1
                                      ? "ban"
                                      : "out"
                                  }
                                >
                                  {userItem.userflag === 0
                                    ? "정상"
                                    : userItem.userflag === 1
                                    ? "정지"
                                    : "탈퇴"}
                                </td>
                              </tr>
                            ))
                          : "게시물이 없습니다"}
                      </tbody>
                    </table>
                    <div className="sub-info__paging">
                      <Paging
                        page={currentpage}
                        count={count}
                        setPage={setPage}
                        type="admin"
                      />
                    </div>
                  </div>
                ) : null}
                {tab === 2 ? (
                  <div className="adminCont">
                    {drinkNew !== "list" ? null : (
                      <div className="btnWrap">
                        <a
                          className="levelUp"
                          onClick={() => setDrinkNew("new")}
                        >
                          전통주 등록
                        </a>
                        <a className="normal" onClick={editDrink}>
                          전통주 수정
                        </a>
                        <a className="ban" onClick={delDrink}>
                          전통주 삭제
                        </a>
                      </div>
                    )}
                    <h2 className="adminTitle">
                      전통주{" "}
                      {drinkNew === "list"
                        ? "관리"
                        : drinkNew === "new"
                        ? "등록"
                        : "수정"}
                    </h2>
                    {drinkNew === "list" ? (
                      <>
                        <table className="mypage_cont__table">
                          <thead>
                            <tr>
                              <th className="chkBox">
                                <input
                                  type="checkbox"
                                  name="select-all"
                                  onChange={(e) =>
                                    handleAllCheck(e.target.checked)
                                  }
                                  // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                                  checked={
                                    checkItems.length === currentPosts.length
                                      ? true
                                      : false
                                  }
                                />
                              </th>
                              <th className="numBox">술 ID</th>
                              <th className="dname">제품명</th>
                              <th>지역</th>
                              <th className="priceBox">가격</th>
                              <th className="numBox">도수</th>
                              <th className="status drink" onClick={dStatus}>
                                종류
                                <span
                                  className={
                                    drinkStatus !== "All" ? "active" : ""
                                  }
                                >
                                  (
                                  {drinkStatus === "All"
                                    ? "전체"
                                    : drinkStatus === "TAK"
                                    ? "막걸리/탁주"
                                    : drinkStatus === "CHE"
                                    ? "약주/청주"
                                    : drinkStatus === "WIN"
                                    ? "과실주/와인"
                                    : drinkStatus === "SPI"
                                    ? "증류주"
                                    : "기타"}
                                  )
                                </span>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentPosts && menuArr.length > 0
                              ? currentPosts.map((menuItem, i) => (
                                  <tr key={i}>
                                    <td className="chkBox">
                                      <input
                                        type="checkbox"
                                        name={`drink-${i}`}
                                        onChange={(e) =>
                                          handleSingleCheck(
                                            e.target.checked,
                                            menuItem.id
                                          )
                                        }
                                        // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                                        checked={
                                          checkItems.includes(menuItem.id)
                                            ? true
                                            : false
                                        }
                                      />
                                    </td>
                                    <td>{menuItem.id}</td>
                                    <td className="left">{menuItem.name}</td>
                                    <td>{menuItem.region}</td>
                                    <td>{menuItem.price}</td>
                                    <td>{menuItem.alc}%</td>
                                    <td>{menuItem.description}</td>
                                  </tr>
                                ))
                              : "게시물이 없습니다"}
                          </tbody>
                        </table>
                        <div className="sub-info__paging">
                          <Paging
                            page={currentpage}
                            count={count}
                            setPage={setPage}
                            type="admin"
                          />
                        </div>

                        <form
                          className="sub_search"
                          onSubmit={handleWordSearch}
                        >
                          <div className="sub_search__inner">
                            <div className="search-form">
                              <input
                                type="search"
                                value={word}
                                className="search-form__input int"
                                placeholder="전통주 이름을 검색하세요"
                                onChange={handleSearchChange}
                              />
                              <button
                                type="submit"
                                className="search-form__button"
                              >
                                검색
                              </button>
                            </div>
                          </div>
                        </form>
                      </>
                    ) : drinkNew === "new" ? (
                      <DrinkNew uid={uid} />
                    ) : (
                      <DrinkEdit drinkData={drinkData} uid={uid} />
                    )}
                  </div>
                ) : null}
                {tab === 3 ? (
                  <div className="adminCont">
                    <div className="btnWrap">
                      {/* <a className="levelUp">관리자 해제</a>
                    <a className="normal">회원 복구</a>
                    <a className="ban">회원 정지</a> */}
                      <a className="out" onClick={delBorad}>
                        게시글 삭제
                      </a>
                    </div>
                    <h2 className="adminTitle">게시판 관리</h2>
                    <table className="mypage_cont__table">
                      <thead>
                        <tr>
                          <th className="chkBox">
                            <input
                              type="checkbox"
                              name="select-all"
                              onChange={(e) => handleAllCheck(e.target.checked)}
                              // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                              checked={
                                checkItems.length === currentPosts.length
                                  ? true
                                  : false
                              }
                            />
                          </th>
                          <th className="numBox">글 ID</th>
                          <th className="title">제목</th>
                          <th className="uname">작성자</th>
                          <th>작성일</th>
                          <th className="status" onClick={bStatus}>
                            게시판 종류
                            <span
                              className={boardStatus !== "All" ? "active" : ""}
                            >
                              (
                              {boardStatus === "All"
                                ? "전체"
                                : boardStatus === "notice"
                                ? "공지"
                                : boardStatus === "free"
                                ? "자유"
                                : "맛집"}
                              )
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentPosts && boardArr.length > 0
                          ? currentPosts.map((boardItem, i) => (
                              <tr key={i}>
                                <td className="chkBox">
                                  <input
                                    type="checkbox"
                                    name={`drink-${i}`}
                                    onChange={(e) =>
                                      handleSingleCheck(
                                        e.target.checked,
                                        boardItem.id
                                      )
                                    }
                                    // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                                    checked={
                                      checkItems.includes(boardItem.id)
                                        ? true
                                        : false
                                    }
                                  />
                                </td>
                                <td>{boardItem.id}</td>
                                <td className="left title">
                                  {boardItem.title}
                                </td>
                                <td>{boardItem.writer}</td>
                                <td>{boardItem.cdatetime}</td>
                                <td>
                                  {boardItem.kind === 1
                                    ? "공지사항"
                                    : boardItem.kind === 2
                                    ? "자유게시판"
                                    : "맛집게시판"}
                                </td>
                              </tr>
                            ))
                          : "게시물이 없습니다"}
                      </tbody>
                    </table>
                    <div className="sub-info__paging">
                      <Paging
                        page={currentpage}
                        count={count}
                        setPage={setPage}
                        type="admin"
                      />
                    </div>

                    <form className="sub_search" onSubmit={handleWordSearch}>
                      <div className="sub_search__inner">
                        <div className="search-form">
                          <input
                            type="search"
                            value={word}
                            className="search-form__input int"
                            placeholder="게시판 제목을 검색하세요"
                            onChange={handleSearchChange}
                          />
                          <button type="submit" className="search-form__button">
                            검색
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminMain;
