package org.justdrink.omdb.model.dto.member;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberLoginRequestDto {
    private String id;
    private String password;
    private String nick;

/*    public MemberResponseDto toMemberResponseDto(MemberLoginRequestDto loginRequestDto) {
        System.out.println("login_MemberResponseDto");
        return MemberResponseDto.builder()
                .id(id)
                .password(password)
                .nick(nick)
                .build();
    }*/

    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(id, password);
    }

}
