package org.justdrink.omdb.config;

import org.justdrink.omdb.config.jwt.JwtAccessDeniedHandler;
import org.justdrink.omdb.config.jwt.JwtAuthenticationEntryPoint;
import org.justdrink.omdb.config.jwt.JwtSecurityConfig;
import org.justdrink.omdb.config.jwt.JwtTokenProvider;
import org.justdrink.omdb.config.oauth.OAuth2CustomAuthenticationSuccessHandler;
import org.justdrink.omdb.config.oauth.OAuth2CustomUserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
// @Slf4j
@Component
// WebSecurityConfigurerAdapter 더이상 사용 안됨
public class WebSecurityConfig {
  private final JwtTokenProvider jwtTokenProvider;
  private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
  private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
  private final OAuth2CustomUserService oAuth2CustomUserService;

  @Bean
  protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    // https://spring.io/blog/2022/02/21/spring-security-without-the-websecurityconfigureradapter
    // https://docs.spring.io/spring-security/reference/servlet/configuration/java.html
    // https://docs.spring.io/spring-security/reference/servlet/authentication/session-management.html

    // WebMvcConfig에서 이미 설정했으므로 기본 cors 설정.
    http.cors(AbstractHttpConfigurer::disable);
    // csrf는 현재 사용하지 않으므로 disable
    http.csrf(AbstractHttpConfigurer::disable);
    // token을 사용하므로 basic 인증 disable
    http.httpBasic(AbstractHttpConfigurer::disable);
    // session 기반이 아님을 선언
    http.sessionManagement((session) -> session
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));
    http.exceptionHandling((exceptionHandling) -> exceptionHandling
            .authenticationEntryPoint(jwtAuthenticationEntryPoint)
            .accessDeniedHandler(jwtAccessDeniedHandler));
    // /와 /auth/** 경로는 인증 안해도 됨.
    http.authorizeHttpRequests((authorize) -> authorize
        // 인증안해도되는 경로
        // .requestMatchers("/", "/auth/**", "/error","/login","/todo").permitAll()
        .requestMatchers("/**").permitAll()
        // /와 /auth/**이외의 모든 경로는 인증 해야됨.
        .anyRequest().authenticated())
        .oauth2Login((auth2Logign) -> auth2Logign
            .loginPage("/login")
            .defaultSuccessUrl("/")
            .successHandler(customAuth2SuccessHandler())
            .userInfoEndpoint((endPoint) -> endPoint // OAuth 2.0 Provider로부터 사용자 정보를 가져오는 엔드포인트를 지정하는 메서드
                .userService(oAuth2CustomUserService))// OAuth 2.0 인증이 처리되는데 사용될 사용자 서비스를 지정하는 메서드
        )
    ;
    http.apply(new JwtSecurityConfig(jwtTokenProvider));
    // http.addFilterAfter(
    // jdJwtAuthenticationFilter,
    // CorsFilter.class);
    return http.build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public OAuth2CustomAuthenticationSuccessHandler customAuth2SuccessHandler() {
    return new OAuth2CustomAuthenticationSuccessHandler(oAuth2CustomUserService);
  }

}