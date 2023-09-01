package org.justdrink.omdb.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.justdrink.omdb.model.Board;
import org.justdrink.omdb.model.Files;
import org.justdrink.omdb.model.Members;
import org.justdrink.omdb.model.dto.board.AddBoardFileRequestDto;
import org.justdrink.omdb.model.dto.board.AddBoardRequestDto;
import org.justdrink.omdb.model.dto.board.UpdateBoardRequestDto;
import org.justdrink.omdb.repository.BoardRepository;
import org.justdrink.omdb.repository.CommentsRepository;
import org.justdrink.omdb.repository.FilesRepository;
import org.justdrink.omdb.repository.MemberRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class BoardService {

  private final BoardRepository boardRepository;
  private final MemberRepository memberRepository;
  private final FilesRepository filesRepository;
  private final CommentsRepository commentsRepository;


  /** 게시글 등록 */
  @Transactional
  public Board saveBoard(AddBoardRequestDto request) {
    Optional<Members> member = memberRepository.findByUid(request.getUid());
    return boardRepository.save(request.toEntityBoard(member.get()));
  }

  /** 게시판 파일 저장 */
  @Transactional
  public Files addFiles(AddBoardFileRequestDto requestDto) {
    Optional<Board> board = boardRepository.findById(requestDto.getBid());
    return filesRepository.save(requestDto.toEntityFiles(board.get()));
  }

  /** 게시글 수정 */
  @Transactional
  public Board updateBoard(long bid, UpdateBoardRequestDto request) {
    Board board = boardRepository.findByBidAndDyn(bid, "N")
            .orElseThrow(() -> new IllegalArgumentException("not found : " + bid));
//    authorizeBoardWriter(board);
    board.update(request);
    return board;
  }

  /** 게시글 비활성화(삭제) */
  @Transactional
  public void inactivateBoard(Long bid) {
    Optional<Board> optionalBoard = boardRepository.findByBidAndDyn(bid,"N");

    if (optionalBoard.isPresent()) {
      Board board = optionalBoard.get();
      board.setDyn("Y");
      boardRepository.save(board);
    } else {
      throw new EntityNotFoundException("Board not found with ID: " + bid);
    }
  }

  /** 게시글 전체 조회 - 삭제여부 N 인것 */
  public List<Board> findAll(String sorting) {
    return switch (sorting) {
      case "hits" -> boardRepository.findByDynOrderByHitsDesc("N");
      default -> boardRepository.findByDynOrderByCdatetimeDesc("N");
    };
  }

  /** 게시글별 댓글 갯수 */
  public Long boardCommentCnt(Long bid) {
    return commentsRepository.countByBoard_BidAndDyn(bid,"N");
  }


  /** 게시글 상세 보기 + 조회수 1 증가 */
  @Transactional
  public Board findBoard(Long bid) {
    boardRepository.updateViewCount(bid); // 조회수 증가
    Optional<Board> board = boardRepository.findByBidAndDyn(bid, "N");
    return  board.orElseThrow(()-> new IllegalArgumentException("not found : " + bid));
  }

  /** 게시글 목록별 조회 */
  public List<Board> findByKind(Integer kind,String title, String sorting) {
    
    if(sorting.equals("hits")){
      if(title==null){
        return boardRepository.findByKindAndDynOrderByHitsDesc(kind, "N");
      }else if(kind==null){
        return boardRepository.findByTitleContainingAndDynOrderByHitsDesc(title, "N");
      }else{
        return boardRepository.findByKindAndTitleContainingAndDynOrderByHitsDesc(kind,title, "N");
      }
    }else{
      if(title==null){
        return boardRepository.findByKindAndDynOrderByCdatetimeDesc(kind, "N");
      }else if(kind==null){
        return boardRepository.findByTitleContainingAndDynOrderByCdatetimeDesc(title, "N");
      }else{
        return boardRepository.findByKindAndTitleContainingAndDynOrderByCdatetimeDesc(kind,title, "N");
      }
      
    }
  }


  // 게시글을 작성한 유저인지 확인
  private static void authorizeBoardWriter(Board board) {
    String userName = SecurityContextHolder.getContext().getAuthentication().getName();
    System.out.println(userName);
//    if (!board.getMembers().getUid().equals(userName)) {
//      throw new IllegalArgumentException("not authorized");
//    }
  }

}
