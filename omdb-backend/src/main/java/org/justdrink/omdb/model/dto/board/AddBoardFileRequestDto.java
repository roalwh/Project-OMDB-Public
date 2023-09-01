package org.justdrink.omdb.model.dto.board;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.justdrink.omdb.model.Board;
import org.justdrink.omdb.model.Files;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AddBoardFileRequestDto {
    private Long bid;
    private String orgname;
    private String savename;
    private String path;
    private String dyn;

    public Files toEntityFiles(Board board) {
        return Files.builder()
                .board(board)
                .orgname(orgname)
                .savename(savename)
                .path(path)
                .dyn("N")
                .build();
    }
}
