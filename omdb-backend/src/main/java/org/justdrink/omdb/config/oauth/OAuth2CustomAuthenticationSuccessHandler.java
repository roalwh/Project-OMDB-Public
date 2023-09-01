package org.justdrink.omdb.config.oauth;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.justdrink.omdb.model.Members;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
@RequiredArgsConstructor
@Component
public class OAuth2CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
//    public static final String REDIRECT_URI = "http://localhost:3000/oauth2login/callback";
    public static final String REDIRECT_HOME_URI = "http://roalwh.iptime.org:20108/";
    public static final String REFRESH_TOKEN_COOKIE_NAME = "refresh_token";

    private final OAuth2CustomUserService oAuth2CustomUserService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String loginEmail = (String) oAuth2User.getAttributes().get("email");
        Members member = oAuth2CustomUserService.getMemberByEmail(loginEmail);

        // response.sendRedirect(UriComponentsBuilder.fromUriString(REDIRECT_HOME_URI)
        response.sendRedirect(UriComponentsBuilder.fromUriString(REDIRECT_HOME_URI)
                .queryParam("accessToken", member.getAccessToken())
                .queryParam("expirationTimeIn", member.getAccessTokenExpireIn())
                .queryParam("refreshToken", REFRESH_TOKEN_COOKIE_NAME)
                .build()
                .encode(StandardCharsets.UTF_8)
                .toUriString());
    }

}
