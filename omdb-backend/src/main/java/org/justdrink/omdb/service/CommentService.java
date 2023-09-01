package org.justdrink.omdb.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.justdrink.omdb.model.Board;
import org.justdrink.omdb.model.Comments;
import org.justdrink.omdb.model.Members;
import org.justdrink.omdb.model.dto.board.AddCommentRequestDto;
import org.justdrink.omdb.model.dto.board.UpdateCommentRequestDto;
import org.justdrink.omdb.repository.BoardRepository;
import org.justdrink.omdb.repository.CommentsRepository;
import org.justdrink.omdb.repository.MemberRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentsRepository commentsRepository;
    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;

    /** 댓글 조회 : 게시글 번호 */
    @Transactional
    public List<Comments> findCommentList(Long bid) {
        List<Comments> commentsList = commentsRepository.findByBoard_BidAndDyn(bid, "N");
        return commentsList;
    }

    /** 댓글 등록 */
    public Comments saveComment(AddCommentRequestDto request) {
        Optional<Members> optUid = memberRepository.findById(request.getUid());
        Optional<Board> optBid = boardRepository.findById(request.getBid());

        return commentsRepository.save(request.toEntityComment(optUid.get(), optBid.get()));
    }

    /** 댓글 수정 */
    @Transactional
    public Comments updateComment(long cid, UpdateCommentRequestDto request) {
        Comments comment = commentsRepository.findByCidAndDyn(cid, "N")
                .orElseThrow(() -> new IllegalArgumentException("not found comment : " + cid));
//        authorizeCommentWriter(comment);
        comment.update(request);

        return comment;
    }

    /** 댓글 비활성화(삭제) */
    @Transactional
    public void inactivateComment(Long cid) {
        Optional<Comments> optComment = commentsRepository.findByCidAndDyn(cid,"N");
        if (optComment.isPresent()) {
            Comments comment = optComment.get();
            comment.setDyn("Y");
        } else {
            throw new EntityNotFoundException("Comment not found with ID : " + cid);
        }
    }

    // 게시글을 작성한 유저인지 확인
    private static void authorizeCommentWriter(Comments comment) {
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println(userName);
//    if (!comment.getMembers().getUid().equals(userName)) {
//      throw new IllegalArgumentException("not authorized");
//    }
    }



}
