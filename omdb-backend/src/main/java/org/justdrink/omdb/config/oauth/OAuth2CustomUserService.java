package org.justdrink.omdb.config.oauth;

import lombok.RequiredArgsConstructor;
import org.justdrink.omdb.config.jwt.JwtTokenProvider;
import org.justdrink.omdb.model.Members;
import org.justdrink.omdb.model.dto.JwtTokenDto;
import org.justdrink.omdb.repository.MemberRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
@Service
@RequiredArgsConstructor
public class OAuth2CustomUserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest); // OAuth 서비스(kakao, google, naver)에서 가져온 유저 정보를 담고있음

        String registrationId = userRequest.getClientRegistration()
                .getRegistrationId(); // OAuth 서비스 이름(ex. kakao, naver, google)
        String userNameAttributeName = userRequest.getClientRegistration()
                .getProviderDetails()
                .getUserInfoEndpoint()
                .getUserNameAttributeName(); // OAuth 로그인 시 키(pk)가 되는 값
        Map<String, Object> attributes = oAuth2User.getAttributes(); // OAuth 서비스의 유저 정보들

        MemberProfile memberProfile = OAuth2Attributes.extract(registrationId, attributes); // registrationId에 따라 유저 정보를 통해 공통된 UserProfile 객체로 만들어 줌
        memberProfile.setProvider(registrationId);
        Members member = saveOrUpdate(memberProfile);

        JwtTokenDto jwtTokenDto = jwtTokenProvider.generateTokenDto(member.getEmail().toString());  // 영은 :getEmail 로 변경함
        saveOrUpdate(member, jwtTokenDto);

        Map<String, Object> customAttribute = customAttribute(attributes, userNameAttributeName, memberProfile, registrationId);
        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority("USER")),
                customAttribute,
                userNameAttributeName);
    }

    private Map customAttribute(Map attributes, String userNameAttributeName, MemberProfile memberProfile, String registrationId) {
        Map<String, Object> customAttribute = new LinkedHashMap<>();
        customAttribute.put(userNameAttributeName, attributes.get(userNameAttributeName));
        customAttribute.put("provider", registrationId);
        customAttribute.put("name", memberProfile.getNick());
        customAttribute.put("email", memberProfile.getEmail());
        return customAttribute;

    }

    // 유저가 있으면 업데이트, 없으면 유저 생성
    private Members saveOrUpdate(MemberProfile memberProfile) {
        Members member = memberRepository.findByEmailAndProvider(memberProfile.getEmail(), memberProfile.getProvider())
                .map(m -> m.update(
                        memberProfile.getNick(),
                        memberProfile.getEmail())) // OAuth 서비스 사이트에서 유저 정보 변경이 있을 수 있기 때문에 우리 DB에도 update
                .orElse(memberProfile.toMember());

        return memberRepository.save(member);
    }

    private Members saveOrUpdate(Members member, JwtTokenDto jwtTokenDto) {
        if (Objects.isNull(member.getEmail()))   // 영은 : getEmail 로 변경함
            return null;

        member.setAccessToken(jwtTokenDto.getAccessToken());
        member.setAccessTokenExpireIn(jwtTokenDto.getTokenExpiresIn());
        return memberRepository.save(member);
    }

    private Members saveOrUpdate(MemberProfile memberProfile, JwtTokenDto jwtTokenDto) {
        Members member = memberRepository.findByEmailAndProvider(memberProfile.getEmail(), memberProfile.getProvider())
                .map(m -> m.update(
//                        memberProfile.getName(),
                        jwtTokenDto.getAccessToken(),
                        jwtTokenDto.getTokenExpiresIn(),
                        memberProfile.getEmail())) // OAuth 서비스 사이트에서 유저 정보 변경이 있을 수 있기 때문에 우리 DB에도 update
                .orElse(memberProfile.toMember(jwtTokenDto));

        return memberRepository.save(member);
    }

    public Members getMemberByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("이메일 검색시 없는 유저입니다."));
    }

    public Members getMemberByEmailAndProvider(String email, String provider) {
        return memberRepository.findByEmailAndProvider(email, provider)
                .orElseThrow(() -> new IllegalArgumentException("이메일 및 외부 oauth지원으로 검색시 없는 유저입니다."));
    }
}
