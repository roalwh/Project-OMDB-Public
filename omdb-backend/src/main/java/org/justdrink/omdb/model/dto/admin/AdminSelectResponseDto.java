package org.justdrink.omdb.model.dto.admin;

import org.justdrink.omdb.model.Members;
import org.justdrink.omdb.model.enums.Authority;

import lombok.Getter;

@Getter
public class AdminSelectResponseDto {

  private Long uid;
  private String id;
  private String name;
  private String nick;
  private String email;
  private String phone;
  private int userflag;
  private Authority authority;


  public AdminSelectResponseDto(Members member){
    this.uid = member.getUid();
    this.id = member.getId();
    this.name = member.getName();
    this.nick = member.getNick();
    this.email = member.getEmail();
    this.phone = member.getPhone();
    this.userflag = member.getUserflag();
    this.authority = member.getAuthority();
  }

}
