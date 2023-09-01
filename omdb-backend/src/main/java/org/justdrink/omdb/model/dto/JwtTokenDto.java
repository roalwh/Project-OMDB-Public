package org.justdrink.omdb.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JwtTokenDto {
    private String grantType;       // token 타입(Bearer)
    private String accessToken;     // 접근 토큰
    private Long tokenExpiresIn;    // 토큰 유효기간
}
