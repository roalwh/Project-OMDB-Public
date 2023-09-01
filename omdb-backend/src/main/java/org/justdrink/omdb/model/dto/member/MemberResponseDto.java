package org.justdrink.omdb.model.dto.member;

import org.justdrink.omdb.model.Members;
import org.justdrink.omdb.model.enums.Authority;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberResponseDto {

    private Long uid;
    private String id;
    private String name;
    private String nick;
    private String email;
    private String phone;
    private String address;
    private Authority authority;

//    private String password;


    public static MemberResponseDto of(Members member) {
        return MemberResponseDto.builder()
                .uid(member.getUid())
                .id(member.getId())
                .name(member.getName())
                .nick(member.getNick())
                .email(member.getEmail())
                .phone(member.getPhone())
                .address(member.getAddress())
                .authority(member.getAuthority())
                .build();
    }
}
