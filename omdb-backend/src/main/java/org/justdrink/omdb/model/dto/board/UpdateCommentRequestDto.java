package org.justdrink.omdb.model.dto.board;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@NoArgsConstructor(force = true)
@AllArgsConstructor
@Getter
public class UpdateCommentRequestDto {
    @NonNull
    private String content; // 댓글 내용


}
