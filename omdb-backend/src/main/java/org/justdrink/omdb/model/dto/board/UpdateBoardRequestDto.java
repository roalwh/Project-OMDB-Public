package org.justdrink.omdb.model.dto.board;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@NoArgsConstructor(force = true)
@AllArgsConstructor
@Getter
public class UpdateBoardRequestDto {
    @NonNull
    private int kind;  // 게시글 종류

    @NotBlank(message = "게시글 제목을 입력해주세요.")
    @Size(min=1)
    private String title;  // 게시글 제목

    @NotBlank(message = "게시글 내용을 입력해주세요.")
    @Size(min=10)
    private String content; // 게시글 내용

}
