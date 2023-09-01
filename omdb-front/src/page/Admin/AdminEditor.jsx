import React, { useState, useEffect } from "react";
import axios from "axios";
import Radio from "../Board/components/Radio";
import { Link, useNavigate } from "react-router-dom";

import RadioGroup from "../Board/components/RadioGroup";

const AdminEditor = ({ drinkData, onSubmit }) => {
  // 수정하기

  useEffect(() => {
    if (drinkData.desclist !== undefined) {
      const regionCut = drinkData.address.split(" ");
      const addressCut = drinkData.address.split(regionCut[1] + " ");
      setState({
        ...state,
        files: drinkData.dimgs[0].iname,
        name: drinkData.name,
        alc: drinkData.alc,
        ingre: drinkData.ingre,
        maker: drinkData.maker,
        address: addressCut[1],
        region: `${regionCut[0]} ${regionCut[1]}`,
        price: drinkData.price,
        // food: drinkData.food,
        info: drinkData.info,
        category: drinkData.desclist.dname,
        sweet: drinkData.sweet,
        sour: drinkData.sour,
        cool: drinkData.cool,
        body: drinkData.body,
        balance: drinkData.balance,
        insense: drinkData.insense,
        throat: drinkData.throat,
      });
      setSweet(`${drinkData.sweet}`);
      setSweet(`${drinkData.sour}`);
      setSour(`${drinkData.cool}`);
      setCool(`${drinkData.body}`);
      setBody(`${drinkData.balance}`);
      setBalance(`${drinkData.insense}`);
      setInsense(`${drinkData.throat}`);
      setRegion(regionCut[0]);
      setSecRegion(regionCut[1]);
    }
    // console.log(drinkData);
  }, [drinkData]);

  // 전송할 데이터 목록
  const [state, setState] = useState({
    files: "",
    name: "",
    alc: "",
    ingre: "",
    maker: "",
    address: "",
    region: "서울특별시 종로구",
    price: "",
    food: "",
    info: "",
    category: "TAK",
    sweet: "",
    cool: "",
    sour: "",
    body: "",
    balance: "",
    insense: "",
    throat: "",
  });

  // area 목록 호출
  const [areaArr, setAreaArr] = useState([]);
  const [region1, setRegion1] = useState([]);
  const [region2, setRegion2] = useState([]);

  // areas 데이터 초기 호출
  useEffect(() => {
    const fetchAreaData = async () => {
      try {
        const res = await axios.get("admin/area");
        const areaData = res.data.map((item) => ({
          araid: item.araid,
          region1: item.region1,
          region2: item.region2,
        }));
        setAreaArr(areaData);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };
    fetchAreaData();
  }, []);

  // region1 선택 시
  const [region, setRegion] = useState("서울특별시");
  const [secRegion, setSecRegion] = useState("종로구");

  const handleChangeRegion = (e) => {
    setRegion(e.target.value);
  };

  useEffect(() => {
    const result = [areaArr.filter((item) => item.region1 === region)];
    setRegion2(result[0]);
  }, [region]);

  // region1 값 select에 출력
  useEffect(() => {
    const result = [...new Set(areaArr.map((item) => item.region1))];
    const result2 = [areaArr.filter((item) => item.region1 === region)];
    setRegion1(result);
    setRegion2(result2[0]);
  }, [areaArr]);

  const dKind = [
    { value: "TAK", name: "막걸리/탁주" },
    { value: "CHE", name: "약주/청주" },
    { value: "WIN", name: "과실주/와인" },
    { value: "SPI", name: "증류주/소주/리큐르" },
    { value: "ETC", name: "기타주류" },
  ];

  //맛 설정
  const [sweet, setSweet] = useState("0");
  const [sour, setSour] = useState("0");
  const [cool, setCool] = useState("0");
  const [body, setBody] = useState("0");
  const [balance, setBalance] = useState("0");
  const [insense, setInsense] = useState("0");
  const [throat, setThroat] = useState("0");

  // 맛 설정 시
  useEffect(() => {
    setState({
      ...state,
      sweet: sweet,
    });
  }, [sweet]);
  useEffect(() => {
    setState({
      ...state,
      sour: sour,
    });
  }, [sour]);
  useEffect(() => {
    setState({
      ...state,
      cool: cool,
    });
  }, [cool]);
  useEffect(() => {
    setState({
      ...state,
      body: body,
    });
  }, [body]);
  useEffect(() => {
    setState({
      ...state,
      balance: balance,
    });
  }, [balance]);
  useEffect(() => {
    setState({
      ...state,
      insense: insense,
    });
  }, [insense]);
  useEffect(() => {
    setState({
      ...state,
      throat: throat,
    });
  }, [throat]);

  // 파일업로드 상태
  const [filename, setFilename] = useState("");
  // 파일업로드 기능
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const setfile = event.target.files[0];
    if (selectedFile) {
      if (window.FileReader) {
        setFilename(selectedFile.name);
      } else {
        const filenameParts = event.target.value.split("\\");
        setFilename(filenameParts[filenameParts.length - 1]);
      }
      setState({
        ...state,
        files: setfile,
      });
    } else {
      setFilename("");
    }
  };

  // 제목 입력 시
  const setName = (e) => {
    setState({
      ...state,
      name: e.target.value,
    });
  };

  // 가격 입력 시
  const setPrice = (e) => {
    setState({
      ...state,
      price: e.target.value,
    });
  };

  // 도수 입력 시
  const setAlc = (e) => {
    setState({
      ...state,
      alc: e.target.value,
    });
  };

  // 상호명 입력 시
  const setMaker = (e) => {
    setState({
      ...state,
      maker: e.target.value,
    });
  };

  // 주종 입력 시
  const setCategory = (e) => {
    setState({
      ...state,
      category: e.target.value,
    });
  };

  // 재료 입력 시
  const setIngre = (e) => {
    setState({
      ...state,
      ingre: e.target.value,
    });
  };

  // 안주 입력 시
  const setFood = (e) => {
    setState({
      ...state,
      food: e.target.value,
    });
  };

  // 주소 입력 시
  const setReg = (e) => {
    const reg = region + " " + e.target.value;
    setSecRegion(e.target.value);
    setState({
      ...state,
      region: reg,
    });
  };

  // 상세주소
  const setAddress = (e) => {
    setState({
      ...state,
      address: e.target.value,
    });
  };

  // 상세주소
  const setInfo = (e) => {
    setState({
      ...state,
      info: e.target.value,
    });
  };

  // <작성 완료> 버튼 기능
  const handleSubmit = () => {
    onSubmit(state);
  };

  // <작성 완료> test 기능
  const handletest = () => {
    // console.log(state);
    onSubmit(state);
  };

  const handleFalse = () => {
    // navigate(-1);
    window.location.replace("/admin");
  };

  return (
    <>
      <div className="Editor">
        <form className="board__body">
          <table className="board__table">
            <colgroup>
              <col style={{ width: "15%" }} />
              <col style={{ width: "35%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "35%" }} />
            </colgroup>
            <tbody>
              {/* 제목 */}
              <tr>
                <th scope="row">제품명</th>
                <td colSpan={3}>
                  <input
                    type="text"
                    name="name"
                    defaultValue={state.name}
                    placeholder="전통주 제품명"
                    onChange={setName}
                  />
                </td>
              </tr>
              {/* 가격, 알코올 도수 */}
              <tr>
                <th scope="row">가격</th>
                <td>
                  <input
                    type="text"
                    name="price"
                    defaultValue={state.price}
                    placeholder="전통주 가격"
                    onChange={setPrice}
                  />
                </td>
                <th scope="row">알코올 도수</th>
                <td>
                  <input
                    type="text"
                    name="alc"
                    defaultValue={state.alc}
                    placeholder="알코올 도수"
                    onChange={setAlc}
                  />
                </td>
              </tr>

              {/* 가격, 알코올 도수 area */}
              <tr>
                <th scope="row">상호명</th>
                <td>
                  <input
                    type="text"
                    name="maker"
                    defaultValue={state.maker}
                    placeholder="전통주 상호명"
                    onChange={setMaker}
                  />
                </td>
                <th scope="row">주종</th>
                <td>
                  {/* 카테고리 셀렉 kind */}
                  <div className="category_select">
                    <select
                      // onChange={handleChangeRegion}
                      name="setKind"
                      className="selectBox"
                      onChange={setCategory}
                      value={state.category}
                    >
                      {dKind.map((item, index) => (
                        <option key={index} value={item.value}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
              </tr>
              {/* 재료 area */}
              <tr>
                <th scope="row">재료</th>
                <td>
                  <input
                    type="text"
                    name="ingre"
                    defaultValue={state.ingre}
                    placeholder="전통주 재료"
                    onChange={setIngre}
                  />
                </td>

                {/* 주종 정하기 */}
                <th scope="row">어울리는 안주</th>
                <td>
                  <input
                    type="text"
                    name="food"
                    defaultValue={state.food}
                    placeholder="전통주와 어울리는 안주"
                    onChange={setFood}
                  />
                </td>
              </tr>

              {/* 지역 정하기 */}
              <tr>
                <th scope="row">지역</th>
                <td>
                  {/* 카테고리 셀렉 region1 */}
                  <div className="category_select">
                    <select
                      onChange={handleChangeRegion}
                      name="setRegion1"
                      className="selectBox"
                      value={region}
                    >
                      {region1.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    {/* region2 */}
                    <select
                      // onChange={handleChangeRegion}
                      name="setRegion2"
                      className="selectBox"
                      onChange={setReg}
                      value={secRegion}
                      disabled={region2.length === 1 ? true : false}
                    >
                      {region2.map((item, index) => (
                        <option key={index} value={item.region2}>
                          {item.region2}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
                <th scope="row">상세 지역</th>
                <td>
                  <input
                    type="text"
                    name="addr"
                    defaultValue={state.address}
                    placeholder="상세지역"
                    onChange={setAddress}
                  />
                </td>
              </tr>

              {/* 맛 정하기 단맛, 신맛*/}
              <tr>
                <th scope="row">단맛</th>
                <td>
                  <RadioGroup label="sweet" value={sweet} onChange={setSweet}>
                    <Radio label="sweet0" value="0">
                      0
                    </Radio>
                    <Radio label="sweet1" value="1">
                      1
                    </Radio>
                    <Radio label="sweet2" value="2">
                      2
                    </Radio>
                    <Radio label="sweet3" value="3">
                      3
                    </Radio>
                    <Radio label="sweet4" value="4">
                      4
                    </Radio>
                    <Radio label="sweet5" value="5">
                      5
                    </Radio>
                  </RadioGroup>
                </td>
                <th scope="row">신맛</th>
                <td>
                  <RadioGroup label="sour" value={sour} onChange={setSour}>
                    <Radio label="sour0" value="0">
                      0
                    </Radio>
                    <Radio label="sour1" value="1">
                      1
                    </Radio>
                    <Radio label="sour2" value="2">
                      2
                    </Radio>
                    <Radio label="sour3" value="3">
                      3
                    </Radio>
                    <Radio label="sour4" value="4">
                      4
                    </Radio>
                    <Radio label="sour5" value="5">
                      5
                    </Radio>
                  </RadioGroup>
                </td>
              </tr>

              {/* 맛 정하기 탄산/청량감, 바디감*/}
              <tr>
                <th scope="row">탄산</th>
                <td>
                  <RadioGroup label="cool" value={cool} onChange={setCool}>
                    <Radio label="cool0" value="0">
                      0
                    </Radio>
                    <Radio label="cool1" value="1">
                      1
                    </Radio>
                    <Radio label="cool2" value="2">
                      2
                    </Radio>
                    <Radio label="cool3" value="3">
                      3
                    </Radio>
                    <Radio label="cool4" value="4">
                      4
                    </Radio>
                    <Radio label="cool5" value="5">
                      5
                    </Radio>
                  </RadioGroup>
                </td>
                <th scope="row">바디감</th>
                <td>
                  <RadioGroup label="body" value={body} onChange={setBody}>
                    <Radio label="body0" value="0">
                      0
                    </Radio>
                    <Radio label="body1" value="1">
                      1
                    </Radio>
                    <Radio label="body2" value="2">
                      2
                    </Radio>
                    <Radio label="body3" value="3">
                      3
                    </Radio>
                    <Radio label="body4" value="4">
                      4
                    </Radio>
                    <Radio label="body5" value="5">
                      5
                    </Radio>
                  </RadioGroup>
                </td>
              </tr>

              {/* 맛 정하기 밸런스, 향 */}
              <tr>
                <th scope="row">밸런스</th>
                <td>
                  <RadioGroup
                    label="balance"
                    value={balance}
                    onChange={setBalance}
                  >
                    <Radio label="balance0" value="0">
                      0
                    </Radio>
                    <Radio label="balance1" value="1">
                      1
                    </Radio>
                    <Radio label="balance2" value="2">
                      2
                    </Radio>
                    <Radio label="balance3" value="3">
                      3
                    </Radio>
                    <Radio label="balance4" value="4">
                      4
                    </Radio>
                    <Radio label="balance5" value="5">
                      5
                    </Radio>
                  </RadioGroup>
                </td>
                <th scope="row">향</th>
                <td>
                  <RadioGroup
                    label="insense"
                    value={insense}
                    onChange={setInsense}
                  >
                    <Radio label="insense0" value="0">
                      0
                    </Radio>
                    <Radio label="insense1" value="1">
                      1
                    </Radio>
                    <Radio label="insense2" value="2">
                      2
                    </Radio>
                    <Radio label="insense3" value="3">
                      3
                    </Radio>
                    <Radio label="insense4" value="4">
                      4
                    </Radio>
                    <Radio label="insense5" value="5">
                      5
                    </Radio>
                  </RadioGroup>
                </td>
              </tr>

              {/* 맛 정하기 목넘김,  */}
              <tr>
                <th scope="row">목넘김</th>
                <td>
                  <RadioGroup
                    label="throat"
                    value={throat}
                    onChange={setThroat}
                  >
                    <Radio label="throat0" value="0">
                      0
                    </Radio>
                    <Radio label="throat1" value="1">
                      1
                    </Radio>
                    <Radio label="throat2" value="2">
                      2
                    </Radio>
                    <Radio label="throat3" value="3">
                      3
                    </Radio>
                    <Radio label="throat4" value="4">
                      4
                    </Radio>
                    <Radio label="throat5" value="5">
                      5
                    </Radio>
                  </RadioGroup>
                </td>
                <th scope="row"></th>
                <td></td>
              </tr>

              {/* 콘텐츠 area */}
              <tr>
                <th scope="row">전통주 설명</th>
                <td className="write_editor" colSpan={3}>
                  <div className="form_element"></div>
                  <textarea
                    name="info"
                    cols="20"
                    rows="10"
                    defaultValue={state.info}
                    onChange={setInfo}
                  ></textarea>
                </td>
              </tr>

              {/* 첨부파일 area */}
              <tr>
                <th scope="row" onClick={handletest}>
                  이미지 첨부
                </th>
                <td className="uploadBox" colSpan={3}>
                  <div className="file-upload">
                    <input
                      type="text"
                      className="upload-name"
                      defaultValue={filename === "" ? state.files : filename}
                      title="파일 첨부하기"
                      readOnly
                    />
                    <label htmlFor="ex_filename">업로드</label>
                    <input
                      type="file"
                      name="files"
                      id="ex_filename"
                      className="upload-hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="board__foot">
            <Link to="/admin">
              <button className="btn_form type-2" onClick={handleFalse}>
                취소
              </button>
            </Link>

            <button className="btn_form" onClick={handleSubmit}>
              저장
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminEditor;
