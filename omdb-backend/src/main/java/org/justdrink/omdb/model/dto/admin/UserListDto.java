package org.justdrink.omdb.model.dto.admin;


import java.util.List;

import lombok.Getter;

@Getter
public class UserListDto {
  private Long orderuid;
  private int userflag;
  List<ListDto> userlist;
}
