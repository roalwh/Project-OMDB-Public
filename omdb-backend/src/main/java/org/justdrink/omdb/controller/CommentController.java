package org.justdrink.omdb.controller;

import lombok.RequiredArgsConstructor;
import org.hibernate.Hibernate;
import org.justdrink.omdb.model.Board;
import org.justdrink.omdb.model.Comments;
import org.justdrink.omdb.model.dto.board.AddCommentRequestDto;
import org.justdrink.omdb.model.dto.board.CommentResponseDto;
import org.justdrink.omdb.model.dto.board.UpdateBoardRequestDto;
import org.justdrink.omdb.model.dto.board.UpdateCommentRequestDto;
import org.justdrink.omdb.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("/board/comment/")
public class CommentController {

    private final CommentService commentService;

    /** 댓글 조회 */
    @GetMapping("/no/{bid}")
    public ResponseEntity<List<CommentResponseDto>> findCommentList(@PathVariable long bid) {
        List<CommentResponseDto> commentList = commentService.findCommentList(bid)
                .stream()
                .map(CommentResponseDto::new)
                .toList();
        return ResponseEntity.ok().body(commentList);
    }

    /** 댓글 작성 등록 */
    @PostMapping("/add")
    public ResponseEntity<Comments> addComment(@RequestBody AddCommentRequestDto request) {
        Comments saveComment = commentService.saveComment(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(saveComment);
    }

    /** 댓글 수정 */
    @PutMapping("/update/{cid}")
    public ResponseEntity<Comments> updateComment(@PathVariable long cid,
                                             @RequestBody UpdateCommentRequestDto request) {
        Comments updatedComment = commentService.updateComment(cid, request);
        // 강제 초기화
        Hibernate.initialize(updatedComment.getMembers());
        return ResponseEntity.ok()
                .body(updatedComment);
    }

    /** 댓글 삭제 - 삭제여부 Y 로 변경 */
    @PutMapping("/inactive/{cid}")
    public ResponseEntity<String> inactivateComment(@PathVariable Long cid) {
        commentService.inactivateComment(cid);
        return ResponseEntity.ok("comment inactivated successfully.");
    }


}
