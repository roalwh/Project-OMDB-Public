package org.justdrink.omdb.model.dto.board;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.justdrink.omdb.model.Board;
import org.justdrink.omdb.model.Comments;
import org.justdrink.omdb.model.Members;
@AllArgsConstructor
@NoArgsConstructor(force = true)
@Getter
@Setter
public class AddCommentRequestDto {


    private Long uid;  // 댓글 작성자 id
    private Long bid;  // 게시글 번호 id
    private String content;  // 댓글 내용
    private String dyn; // 삭제여부

    public Comments toEntityComment(Members member, Board board) {
        return Comments.builder()
                .members(member)
                .board(board)
                .content(content)
                .dyn("N")
                .build();
    }

}
