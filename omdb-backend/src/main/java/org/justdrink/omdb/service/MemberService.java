package org.justdrink.omdb.service;

import java.util.List;
import java.util.Optional;

import jakarta.transaction.Transactional;
import org.justdrink.omdb.model.Board;
import org.justdrink.omdb.model.Comments;
import org.justdrink.omdb.model.Members;
import org.justdrink.omdb.model.Review;
import org.justdrink.omdb.model.dto.member.MemberResponseDto;
import org.justdrink.omdb.model.dto.member.UpdateMemberRequestDto;
import org.justdrink.omdb.repository.BoardRepository;
import org.justdrink.omdb.repository.CommentsRepository;
import org.justdrink.omdb.repository.MemberRepository;
import org.justdrink.omdb.repository.ReviewRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
  private final MemberRepository memberRepository;
  private final BoardRepository boardRepository;
  private final CommentsRepository commentsRepository;
  private final ReviewRepository reviewRepository;

  /** 회원정보 가져오기 */
  public MemberResponseDto getMyInfoBySecurity() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    Optional<MemberResponseDto> optionalMember = null;

    if (authentication.getName().length() > 10) {  // 구글 로그인 시
      String email = authentication.getName();
      System.out.println("getMyInfoBySecurity: " + email);
      optionalMember = memberRepository.findByEmail(email).map(MemberResponseDto::of);
    } else {  // 일반 로그인 시
      Long uid = Long.valueOf(authentication.getName());
      System.out.println("getMyInfoBySecurity : " + uid); // uid 로 수정
      optionalMember = memberRepository.findByUid(uid).map(MemberResponseDto::of);
    }
    if (optionalMember.isEmpty())
      return null;
    return optionalMember.get();
  }

  /** 회원정보 수정 */
  @Transactional
  public void updateMemberInfo(UpdateMemberRequestDto requestDto) {
    Members member = memberRepository.findById(requestDto.getId()).orElseThrow(() ->
            new IllegalArgumentException("해당 아이디가 존재하지 않습니다."));

    member.updateMember(
            requestDto.getUid(),
            requestDto.getNick(),
            requestDto.getName(),
            requestDto.getEmail(),
            requestDto.getPhone(),
            requestDto.getAddress()
    );
  }

  // 마이페이지
  /** 회원 게시글 가져오기 */
  public List<Board> getMyBoard(Long uid) {
    List<Board> boardList = boardRepository.findByMembers_UidAndDyn(uid,"N");
    return boardList;
  }

  /** 회원 댓글 가져오기 */
  public List<Comments> getMyComment(Long uid) {
    List<Comments> commentsList = commentsRepository.findByMembers_UidAndDyn(uid,"N");
    return  commentsList;
  }

  /** 회원 리뷰 가져오기 */
  public List<Review> getMyReview(Long uid) {
    List<Review> reviewList = reviewRepository.findByMembers_UidAndDyn(uid,"N");
    return  reviewList;
  }





}
