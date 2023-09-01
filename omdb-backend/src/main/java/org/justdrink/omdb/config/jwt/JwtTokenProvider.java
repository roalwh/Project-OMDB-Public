package org.justdrink.omdb.config.jwt;

import org.justdrink.omdb.model.dto.JwtTokenDto;
import org.justdrink.omdb.model.enums.Authority;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
@Slf4j
public class JwtTokenProvider {
    private static final String AUTHORITIES_KEY = "auth";
    private static final String BEARER_TYPE = "bearer";
    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * (60 * 8);    // 8시간의 유효기간

    private String jwtSecretKey;

    public JwtTokenProvider(@Value("${jwt.secret}") String secretKey) {
        this.jwtSecretKey = secretKey;
    }

    private Date getTokenExpirationTime() {
        long now = (new Date()).getTime();
        return new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
    }

    // 토큰 생성 by oauth2(ex)구글 로그인) member id 생성 기준
    public JwtTokenDto generateTokenDto(String id) {
        Date expireDate = getTokenExpirationTime();

        String accessToken = Jwts.builder()
                .setExpiration(expireDate)
                .setSubject(id)
                // 현재는 ROLE_USER만 가져옴
                .claim(AUTHORITIES_KEY, Authority.ROLE_USER.name())
//                .claim("aaaaaaa", "bbbbb")  // test로 함 만들어봤수다~
                .signWith(SignatureAlgorithm.HS256, jwtSecretKey)
                .compact();

        return JwtTokenDto.builder()
                .grantType(BEARER_TYPE)
                .accessToken(accessToken)
                .tokenExpiresIn(expireDate.getTime())
                .build();
    }

    // 토큰 생성 by authentication
    public JwtTokenDto generateTokenDto(Authentication authentication) {
        // 현재는 ROLE_USER만 가져옴
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        Date expireDate = getTokenExpirationTime();
        String name = authentication.getName();

        String accessToken = Jwts.builder()
                .setSubject(name)
                .claim(AUTHORITIES_KEY, authorities)
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS256, jwtSecretKey)
                .compact();

        return JwtTokenDto.builder()
                .grantType(BEARER_TYPE)
                .accessToken(accessToken)
                .tokenExpiresIn(expireDate.getTime())
                .build();
    }

    /**
     * jwt토큰으로 권한 정보 가져온다.
     * @param accessToken
     * @return
     */
    public Authentication getAuthentication(String accessToken) {
        Claims claims = null;
        try {
            claims = parseClaims(accessToken);
        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰입니다.");
        }

        if (Objects.isNull(claims)
                || Objects.isNull(claims.get(AUTHORITIES_KEY))
        ) {
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());
        UserDetails principal = new User(claims.getSubject(), "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    public boolean validateToken(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            log.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            log.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }

    private Claims parseClaims(String accessToken) {
        return Jwts.parser()
                .setSigningKey(jwtSecretKey)
                .parseClaimsJws(accessToken)
                .getBody();
    }
}