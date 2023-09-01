package org.justdrink.omdb.controller;


import org.justdrink.omdb.model.Board;
import org.justdrink.omdb.model.dto.board.BoardResponseDto;
import org.justdrink.omdb.model.dto.board.CommentResponseDto;
import org.justdrink.omdb.model.dto.cate.ReviewResponseDto;
import org.justdrink.omdb.model.dto.member.MemberResponseDto;
import org.justdrink.omdb.model.dto.member.UpdateMemberRequestDto;
import org.justdrink.omdb.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import java.util.List;

//@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

  private final MemberService memberService;

  /** 회원정보 가져오기 */
  @GetMapping("/me")
  public ResponseEntity<MemberResponseDto> getMyMemberInfo() {
    MemberResponseDto myInfoBySecurity = memberService.getMyInfoBySecurity();
    return ResponseEntity.ok(myInfoBySecurity);
  }
  
  /** 회원정보 수정 */
  @PutMapping("change-info")
  public void updateUserInfo(@RequestBody UpdateMemberRequestDto requestDto) {
      memberService.updateMemberInfo(requestDto);
  }

  /** 유저 글 들고 가져오기 */
  @GetMapping("/board/{uid}")
  public ResponseEntity<List<BoardResponseDto>> getMyBoard(@PathVariable Long uid) {
    List<BoardResponseDto> boardList = memberService.getMyBoard(uid)
            .stream()
            .map(BoardResponseDto::my)
            .toList();
    return ResponseEntity.ok(boardList);
  }
  
  /** 유저 댓글 가져오기 */
  @GetMapping("/comment/{uid}")
  public ResponseEntity<List<CommentResponseDto>> getMyComment(@PathVariable Long uid) {
    List<CommentResponseDto> commentList = memberService.getMyComment(uid)
            .stream()
            .map(CommentResponseDto::my)
            .toList();
    return ResponseEntity.ok(commentList);
  }

  /** 유저 술리뷰 가져오기 */
  @GetMapping("/review/{uid}")
  public ResponseEntity<List<ReviewResponseDto>> getMyReview(@PathVariable Long uid) {
    List<ReviewResponseDto> reviewList = memberService.getMyReview(uid)
            .stream()
            .map(ReviewResponseDto::my)
            .toList();
    return ResponseEntity.ok(reviewList);
  }

  
}
