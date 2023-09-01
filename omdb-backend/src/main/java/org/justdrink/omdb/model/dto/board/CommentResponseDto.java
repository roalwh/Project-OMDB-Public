package org.justdrink.omdb.model.dto.board;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.justdrink.omdb.model.Board;
import org.justdrink.omdb.model.Comments;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentResponseDto {
    private Long cid; // 댓글 고유 아이디
    private String writer; // 댓글 작성자 닉네임
    private Long uid; // 댓글 작성자 회원번호
    private Long boardNo; // 게시글 번호
    private String boardTitle; // 게시글 제목
    private String content; // 댓글 내용
    @JsonFormat(pattern = "yyyy.MM.dd hh:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime cdatetime; // 댓글 작성일
    private Long commentLikeCnt; // 댓글 추천수

    public CommentResponseDto(Comments comment) {
        this.cid = comment.getCid();
        this.content = comment.getContent();
        this.uid = comment.getMembers().getUid();
        this.boardNo = comment.getBoard().getBid();
        this.writer = comment.getMembers().getNick();
        this.cdatetime = comment.getCdatetime();
    }

    public static CommentResponseDto my(Comments comment) {
        return  CommentResponseDto.builder()
                .boardNo(comment.getBoard().getBid())
                .boardTitle(comment.getBoard().getTitle())
                .content(comment.getContent())
                .cdatetime(comment.getCdatetime())
                .commentLikeCnt(10L)
                .build();
    }

}
