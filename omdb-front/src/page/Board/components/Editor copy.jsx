// // import './Editor.css';
// import { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getFormattedDate } from './util'; 
// import Button from './Button';

// const sortByCategory = [
//   {value : "free", name: "자유"},
//   {value : "yummyplace", name: "맛집"},
//   {value : "review", name: "리뷰"},
//   {value : "notice", name: "공지"}, //운영자만 공지 쓸수 있게 하기
// ]

// const Editor = ({ initData, onSubmit }) => {

//   const navigate = useNavigate();

//   const [state, setState] = useState({
//     kind: "",
//     title: "",
//     content: "",
//     // date: getFormattedDate(new Date()),
//     // writer: "",  // ${userNick} 
//   })

//   // //initData가 바뀔 때마다 날짜 업데이트... 백단에 있는지 확인해야함
//   // useEffect(() => { 
//   //   if (initData) {
//   //       setState({
//   //           ...initData,
//   //           date : getFormattedDate(new Date(parseInt(initData.date))),
//   //       });
//   //     }
//   // }, [initData]);

    
//   // 게시글 입력 기능
//   const handleChangeContent = (e) => {
//     setState({
//         ...state,
//         content : e.target.value,
//     });
//   };

//   // <작성 완료> 버튼 기능
//     const handleSubmit = () => {
//       onSubmit(state);
//   };

//   // <취소하기> 버튼 기능
//   const handleOnGoBack = () => {
//       navigate(-1);
//   };


//   return (
//     <div className="Editor">
//       <div className="editor_section">
//         {/* 말머리 */}
//         <span className='editor_label'>카테고리</span>
//       </div>
//       <div className="editor_section">
//         {/* 작성자 */}
//       </div>
//       <div className="editor_section">
//         {/* 제목 */}
//       </div>
//       <div className="editor_section">
//         <span>본문</span>
//         <span className="input_wrapper">
//           <textarea
//             placeholder="여러분의 이야기를 들려주세요"
//             value={state.content}
//             onChange={handleChangeContent}
//           />
//         </span>
//       </div>
//       <div className="editor_section">
//         <span>첨부파일</span>
//         <span><input/></span>
//         <span><Button text={"찾아보기"} type={"positive"} onClick={handleSubmit} /></span>
//         <span><Button text={"+ 추가"} onClick={handleSubmit} /></span>
//       </div>
//       <div className="editor_section bottom_section">
//         {/* 작성완료, 취소 */}
//         <Button text={"이전"} onClick={handleOnGoBack} />
//         <Button text={"저장"} type={"positive"} onClick={handleSubmit} />
//       </div>
//     </div>
//   )
// }

// export default Editor
