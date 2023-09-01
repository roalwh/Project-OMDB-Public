package org.justdrink.omdb.model.dto.board;

import java.time.LocalDateTime;
import java.util.List;

import org.justdrink.omdb.model.Board;
import org.justdrink.omdb.model.Comments;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Builder;
import lombok.Getter;
import org.justdrink.omdb.model.Files;

@Getter
@Builder
public class BoardResponseDto {
    private int kind;  // 게시글 종류
    private String title;  // 게시글 제목
    private String content; // 게시글 내용
    private Long hits; // 게시글 조회수
    private Long cnt; // 게시글 댓글수
    @JsonFormat(pattern = "yyyy.MM.dd hh:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime cdatetime; // 게시글 작성일
    @JsonFormat(pattern = "yyyy.MM.dd hh:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime udatetime; // 게시글 수정일
    private Long bid;
    private String writer;  // 글쓴이 닉네임
    private Long uid;//
    private List<Comments> comments; // 게시글 댓글
    private List<Files> files; // 파일
    private String filePath; // 파일 경로


    /** 게시글 상세보기 반환 */
    public static BoardResponseDto of(Board board) {
        BoardResponseDto.BoardResponseDtoBuilder builder = BoardResponseDto.builder()
                .uid(board.getMembers().getUid())
                .writer(board.getMembers().getNick())
                .cnt(Long.valueOf(board.getComments().size()))
                .comments(board.getComments())
//             .comments(board.getComments().stream().filter(item -> item.getDyn() == "N").toList()
                .bid(board.getBid())
                .kind(board.getKind())
                .title(board.getTitle())
                .content(board.getContent())
                .hits(board.getHits())
                .cdatetime(board.getCdatetime())
                .udatetime(board.getUdatetime());
//                .filePath(board.getFiles().get(0).getPath())
//                .build();
        if (board.getFiles().size() != 0) {
            builder.filePath(board.getFiles().get(0).getPath());
        }
        return builder.build();
    }

    /** 게시글 전체보기 반환 */
    public static BoardResponseDto view(Board board) {
        return BoardResponseDto.builder()
                .writer(board.getMembers().getNick())
                .cnt(Long.valueOf(board.getComments().size()))
                .bid(board.getBid())
                .kind(board.getKind())
                .title(board.getTitle())
                .content(board.getContent())
                .hits(board.getHits())
                .cdatetime(board.getCdatetime())
                .udatetime(board.getUdatetime())
                .build();
    }

    /** 회원 게시글 반환 */
    public static BoardResponseDto my(Board board) {
        return BoardResponseDto.builder()
                .cnt(Long.valueOf(board.getComments().size()))
                .bid(board.getBid())
                .kind(board.getKind())
                .title(board.getTitle())
                .content(board.getContent())
                .hits(board.getHits())
                .cdatetime(board.getCdatetime())
                .build();
    }

}
