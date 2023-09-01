import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BoardHead from "./components/BoardHead";
import Content from "./components/Content";
import axios from "axios";

const BoardDetail = ({allboard}) => {
  // const isLogin = sessionStorage.getItem("isLogin");
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  const [uid, setUid] = useState("");
  const [authority, setAuthority] = useState("");

  useEffect(() => {
    if (userData) {
      setUid(userData.uid);
      setAuthority(userData.authority);
    } else {
      setUid("");
      setAuthority("");
    }
  }, [userData]);

  const [detailView, setDetailView] = useState(); //리스트아이템 데이터
  const [replyList, setReplyList] = useState([]); // 댓글리스트 데이터 (기존)
  const [reLength, setReLength] = useState(0); // 댓글리스트 갯수
  const [editReFlg, setEditReFlg] = useState(false);

  const params = useParams(); //게시글 파라미터
  const BItemId = params.bid;
  // console.log("params : ", params);

  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  // 목록으로
  const goBack = () => {
    navigate("/board/home");
  };

  // 게시글 번호 들어오면 데이터 호출하기
  useEffect(() => {
    fetchDetailBItem();
    console.log("detailView",detailView);
    fetchReplyData();
  }, [BItemId]);

  /* 게시글 호출 */
  const fetchDetailBItem = async () => {
    try {
      console.log()
      const response = await axios.get(`/board/view/${BItemId}`);
      setDetailView(response.data);
    } catch (error) {
      alert("게시물이 존재하지 않습니다.");
      console.error("Error", error);
      navigate(-1);
    }
  };

  /* 댓글 호출 */
  const fetchReplyData = async () => {
    try {
      const res = await axios.get(`/board/comment/no/${BItemId}`);
      setReplyList(res.data);
      setReLength(res.data.length);
    } catch (error) {
      alert("댓글이 존재하지 않습니다.");
      console.error("Error", error);
    }
  };

  // ----데이터 나오는 거 확인용 -------
  // useEffect(() => {
  //   console.log("게시판 댓글 데이터:", replyList);
  // }, [replyList]);
  // useEffect(() => {
  //   console.log("게시판 상세보기 데이터:", detailView);
  // }, [detailView]);
  // ---------------------------------

  // 게시글 삭제
  const Delete_board = async () => {
 
      if (window.confirm("게시글을 정말 삭제하시겠습니까?")) {
        axios
          .put(`/board/inactive/${BItemId}`)
          .then((res) => {
            if (res.data) {
              console.log(res.status);
              allboard();
          navigate("/board/home");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
  };

  // 게시글 수정 버튼
  const goEdit = () => {
    // console.log(BItemId);
    navigate(`/board/edit/${BItemId}`);
  };

  /** 댓글 입력 */
  const onClickPost_reply = async (e) => {
    e.preventDefault();

    if (!uid) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }

    const data = {
      uid: uid,
      bid: parseInt(BItemId),
      content: comment,
    };
    // console.log("댓글 입력 데이터", data);

    const url = "/board/comment/add";

    axios
      .post(url, data)
      .then((res) => {
        if (res.data) {
          fetchReplyData();
          setComment("");
          alert("댓글이 등록되었습니다.");
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };


  //--------------------------------------
  //             댓글 수정
  //--------------------------------------
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [editCommentId, setEditCommentId] = useState(null);
	const [editComment, setEditComment] = useState("");

  // 댓글 수정 클릭 이벤트를 처리하는 함수
  const handleEditClick = (commentId, commentContent) => {
    setEditCommentId(commentId); // 수정 중인 댓글의 ID 설정
    setEditComment(commentContent); // 수정 중인 댓글 내용을 수정 필드에 설정
    setIsEditModalOpen(true); // 수정 모달 열기
  };

  // 댓글 수정 모달 컴포넌트
	const EditCommentModal = ({ commentContent}) => {
		const [editComment, setEditComment] = useState(commentContent);

		const handleEditSubmit = () => {
			if (!editComment.trim()) {
				return;
			}

			axios
				.put(`/board/comment/update/${editCommentId}`, { content: editComment })
				.then((response) => {
					// 수정된 댓글 정보로 화면 업데이트
					const updatedReplys = replyList.map((comment) =>
						comment.cid === editCommentId
							? { ...comment, content: editComment,}
							: comment,
					);
					setReplyList(updatedReplys);
					closeEditModal();

					alert("수정되었습니다!");
				})
				.catch((error) => {
					console.error(error);
				});
		};

		useEffect(() => {
			setEditComment(commentContent);
		}, [commentContent]);

		const closeEditModal = () => {
			setIsEditModalOpen(false);
			setEditComment(""); // 모달 닫을 때 상태 초기화
			setEditCommentId(null);
		};

		useEffect(() => {
			setEditComment(commentContent);
		}, [commentContent]);

		return (
			<div className="modal">
				<div className="modal-content">
					<textarea
						value={editComment}
						onChange={(e) => setEditComment(e.target.value)}
					/>
          <div className="board_comment__btn">
            <button className="btn_comment" onClick={handleEditSubmit}>수정</button>
            <button className="btn_comment" onClick={closeEditModal}>닫기</button>
          </div>
				</div>
			</div>
		);
	};

  /* 댓글 삭제 */
  const onClickDelete_reply = async (replyId) => {
    if (window.confirm("댓글을 정말 삭제하시겠습니까?")) {
      axios
        .put(`/board/comment/inactive/${replyId}`)
        .then((res) => {
          if (res.data) {
            console.log(res.status);
            fetchReplyData();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // 댓글 수정하기 버튼

  const editReply = () => {
    setEditReFlg(true);
    console.log("editReFlg", editReFlg);
  };
  // const cntReply = () => {

  // }

  if (!detailView) {
    return <div>게시글을 불러오는 중입니다</div>;
  } else {
    const { kind, title, writer, content, hits, cdatetime, filePath } = detailView;
    // const { r_writer, boardNo, boardTitle, r_content, r_cdatetime, r_likeCnt } = replyList;

    return (
      <div id="board">
        <div className="container">
          <BoardHead />
          <div className="board__body">
            <Content
              kind={kind}
              title={title}
              writer={writer}
              content={content}
              hits={hits}
              cdatetime={cdatetime}
              {...filePath && { filePath: `${process.env.REACT_APP_API_HOST}${filePath}` }}
            />
          </div>
          {/* 댓글섹터 */}
          <div className="board_comment">
            <div className="board_comment__top">
              <h4>댓글 {replyList.length}개</h4>
            </div>
            {/* {replyList.some((it)=> )} */}

            <div className="board_comment__body">
              {/* 댓글 입력 폼 */}
              <div className="board_comment__form">
                <form onSubmit={onClickPost_reply}>
                  <textarea
                    placeholder="댓글 내용을 입력해주세요."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <button className="gray_btn" type="submit">
                    확인
                  </button>
                </form>
              </div>
              {/* 댓글 리스트 */}
              {replyList &&
                replyList.map((reply, index) => (
                  <div className="board_comment__inner" key={index}>
                    <div className="board_comment__nick">{reply.writer}</div>
                    <div className="board_comment__date">{reply.cdatetime}</div>
                    {
                      // 본인이 쓴 리플의 <수정> 버튼 누르면 텍스트박스로 전환
                      isEditModalOpen && editCommentId === reply.cid ? (
                        <EditCommentModal
															commentId={reply.cid}
															commentContent={reply.content}
														/>
                      ) : (
                        // 수정버튼 누르기 전, 최초 렌더링시 보이는 댓글 내용박스
                        <div className="board_comment__content">
                          {reply.content}
                        </div>
                      )
                    }

                    {/* 본인 댓글에만 수정 삭제 보이도록  */}
                    {reply.uid === userData.uid ? isEditModalOpen == true ? null : (
                      <div className="board_comment__btn">
                        <button
                          type="text"
                          className="btn_comment"
                          onClick={() => handleEditClick(reply.cid, reply.comment)}
                        >
                          수정
                        </button>
                        <button
                          className="btn_comment"
                          onClick={() => {
                            onClickDelete_reply(reply.cid);
                          }}
                        >
                          삭제
                        </button>
                      </div>
                    ) : null}
                    {/* {// 수정버튼 누르면 댓글입력창이 뜨도록
                    editReFlg == true && reply.cid == index ? (
                      <div className="board_comment__form">
                        <form>
                          <textarea
                            value={reply.content}
                            onChange={(e) => setComment(e.target.value)}
                          ></textarea>
                          <button
                            className="gray_btn"
                            type="submit"
                            onClick={onClickEdit_reply(reply.cid)}
                          >
                            수정
                          </button>
                        </form>
                      </div>
                    ) : null} */}
                  </div>
                ))}
            </div>
          </div>

          <div className="board__foot">
            {
              // 글쓴이 && 관리자만 게시글 수정삭제 버튼 클릭 가능하게 -- 글쓴이: 아이디// 관리자: 아이디
              detailView.uid === uid || authority === "ROLE_ADMIN" ? (
                <div className="board__foot">
                  <button className="btn_form" onClick={goEdit}>
                    수정
                  </button>
                  <button className="btn_form" onClick={Delete_board}>
                    삭제
                  </button>
                  <button className="btn_form" onClick={goBack}>
                    목록
                  </button>
                </div>
              ) : (
                <button className="btn_form" onClick={goBack}>
                  목록
                </button>
              )
            }
          </div>
        </div>
      </div>
    );
  }
};

export default BoardDetail;
