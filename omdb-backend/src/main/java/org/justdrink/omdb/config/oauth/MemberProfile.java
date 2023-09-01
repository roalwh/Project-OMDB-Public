package org.justdrink.omdb.config.oauth;

import lombok.Getter;
import lombok.Setter;
import org.justdrink.omdb.model.Members;
import org.justdrink.omdb.model.dto.JwtTokenDto;
import org.justdrink.omdb.model.enums.Authority;
@Getter
@Setter
public class MemberProfile {
    private String email;
    private String provider;
    private String nick;

    public Members toMember() {
        return Members.builder()
                .email(email)
                .provider(provider)
                .nick(nick)
                .authority(Authority.ROLE_USER)
                .build();
    }

    public Members toMember(JwtTokenDto jwtTokenDto) {
        return Members.builder()
                .email(email)
                .provider(provider)
                .nick(nick)
                .accessToken(jwtTokenDto.getAccessToken())
                .accessTokenExpireIn(jwtTokenDto.getTokenExpiresIn())
                .authority(Authority.ROLE_USER)
                .build();
    }
}
