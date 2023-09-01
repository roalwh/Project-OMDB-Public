package org.justdrink.omdb.model.dto.board;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.justdrink.omdb.model.Board;

import jakarta.annotation.Nonnull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.justdrink.omdb.model.Members;

@AllArgsConstructor
@NoArgsConstructor(force = true)
@Getter
@Setter
public class AddBoardRequestDto {
    

    private Long uid;  // 글쓴이 아이디
//
//    private Members members;

    @Nonnull
    private int kind;  // 게시글 종류

    @NotBlank(message = "게시글 제목을 입력해주세요.")
    @Size(min=1)
    private String title;  // 게시글 제목

    @NotBlank(message = "게시글 내용을 입력해주세요.")
    @Size(min=10)
    private String content; // 게시글 내용

    private Long hits; // 조회수

    private String dyn; // 삭제여부

    public Board toEntityBoard(Members member) {
        return Board.builder()
                .members(member)
                .kind(kind)
                .content(content)
                .title(title)
                .hits(0L)  // 등록시에는 조회수 0 으로 설정
                .dyn("N")  // 삭제 N 설정
                .build();
    }


}
