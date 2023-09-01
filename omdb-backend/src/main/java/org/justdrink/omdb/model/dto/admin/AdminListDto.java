package org.justdrink.omdb.model.dto.admin;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.justdrink.omdb.model.enums.Authority;


@Getter
public class AdminListDto {
    private Long orderuid;
    private Authority authority;
    List<ListDto> userlist;
}
