package org.justdrink.omdb.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.justdrink.omdb.config.jwt.JwtTokenProvider;
import org.justdrink.omdb.model.Members;
import org.justdrink.omdb.model.dto.JwtTokenDto;
import org.justdrink.omdb.model.dto.member.*;
import org.justdrink.omdb.model.enums.Authority;
import org.justdrink.omdb.repository.MemberRepository;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static org.justdrink.omdb.model.enums.Authority.ROLE_USER;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final AuthenticationManagerBuilder managerBuilder;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    private final JavaMailSender javaMailSender;
    private static final String senderEmail= "whalepado100@gmail.com";
    private static int number;


    /** 로그인 */
    public JwtTokenDto login(MemberLoginRequestDto requestDto) {
//        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
//                = requestDto.toAuthentication();
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
                = new UsernamePasswordAuthenticationToken(requestDto.getId(), requestDto.getPassword());
        // 계정정보를 비교하기 전 시큐리티 사용자 정보(principal)를 세팅(loadUserByUsername 메소드 호출)하고
        // 그 이후 UsernamePasswordAuthenticationToken을 사용하여 아이디와 패스워드가 같은지 비교
        Authentication authentication = managerBuilder.getObject().authenticate(usernamePasswordAuthenticationToken);
        JwtTokenDto jwtTokenDto = jwtTokenProvider.generateTokenDto(authentication);

        // 1) 유저가 존재하는지 확인
        boolean isMember = memberRepository.existsById(requestDto.getId());
        if (isMember) {
            // 2) 아이디로 유저 정보 찾기
            Members member = memberRepository.findById(requestDto.getId()).get();
            System.out.println("member:" + member);
            //   3) useflag 가져오기
            int userFlg = member.getUserflag();
            switch (userFlg) {  // 4) userflag 에 따라 메시지 보내주기
                case 0: // 회원
                    member.setAccessToken(jwtTokenDto.getAccessToken());
                    member.setAccessTokenExpireIn(jwtTokenDto.getTokenExpiresIn());
                    memberRepository.save(member);
                    break;
                case 1: // 정지
                    System.out.println("정지된 회원입니다.");
                    throw new RuntimeException("사용 정지된 회원입니다.");
                case 2: // 탈퇴
                    System.out.println("탈퇴한 회원입니다.");
                    throw new RuntimeException("탈퇴한 회원입니다.");
            }
        } else {
            System.out.println("회원정보를 찾을 수 없습니다.");
            throw new RuntimeException("회원정보를 찾을 수 없습니다.");
        }
        return jwtTokenDto;
    }

    /** 회원가입  */
    public MemberResponseDto signup(MemberSignupRequestDto requestDto) {

        // userflag = 0 이면 정상회원(정지, 탈퇴 아님)
        if(memberRepository.existsByIdAndUserflag(requestDto.getId(), 0)) {
            System.out.println("이미 가입됨");
            throw new RuntimeException("이미 가입되어 있는 유저입니다");
        }
        Members member = requestDto.toMember(passwordEncoder);
        member = memberRepository.save(member);
        return MemberResponseDto.of(member);
    }

    /** 아이디 중복 확인 */
    public boolean isMemberIdUnique(String id) {
        return memberRepository.existsByIdAndUserflag(id, 0);
    }

    /** 이메일 인증번호 만들기 */
    public static void createNumber(){
        number = (int)(Math.random() * (90000)) + 100000;// (int) Math.random() * (최댓값-최소값+1) + 최소값
    }

    /** 이메일 내용 생성 */
    public MimeMessage CreateMail(String mail){
        createNumber();
        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            message.setFrom(senderEmail);
            message.setRecipients(MimeMessage.RecipientType.TO, mail);
            message.setSubject("술렁술렁 이메일 인증 : " + number);
            String body = "";
            body += "<h3>" + "술렁술렁 이메일 인증" + "</h3>";
            body += "<h5>" + "술렁술렁 계정에 등록한 이메일 주소가 올바른지 확인하기 위한 인증번호입니다." + "</h5>";
            body += "<h5>" + "아래의 인증번호를 복사하여 이메일 인증을 완료해 주세요." + "</h5>";
            body += "<h1>" + number + "</h1>";
            body += "<h5>" + "향후 비정상적인 계정 접속 등 보안 문제가 발생할 경우" + "</h5>";
            body += "<h5>" + "해당 이메일 주소로 알려드릴 예정입니다." + "</h5>";
            message.setText(body,"UTF-8", "html");
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return message;
    }

    /** 이메일로 인증번호 발송 */
    public int sendMail(MemberSignupRequestDto requestDto){
        MimeMessage message = CreateMail(requestDto.getEmail());
        javaMailSender.send(message);
        return number;
    }

    /** 이메일 인증번호 일치여부 확인 */
    public boolean isSameNumber(int authNumber) {
        return authNumber == number;
    }

    /** 아이디 찾기 */
    public String getUserId(MemberFindIdRequestDto requestDto) {
        if(memberRepository.existsByNameAndEmailAndUserflag(requestDto.getName(), requestDto.getEmail(), 0)) {
            String userId = memberRepository.findByNameAndEmail(requestDto.getName(), requestDto.getEmail()).get().getId();
           return userId;
        } else {
            return "회원정보가 없습니다";
        }
    }

    /** 비밀번호 찾기 과정 */
    public Long getUserPw(MemberFindPwRequestDto requestDto) {
        if(memberRepository.existsByIdAndEmailAndUserflag(requestDto.getId(), requestDto.getEmail(),0)) {
            Long uid = memberRepository.findByIdAndEmail(requestDto.getId(), requestDto.getEmail()).get().getUid();
            return uid;
        } else {
            return 0L;
        }
    }

    /** 비밀번호 변경 */
    @Transactional
    public void updatePw(Long uid, UpdatePwRequestDto request) {
         Members member = memberRepository.findByUid(uid).orElseThrow(() ->
                 new IllegalArgumentException("해당 유저가 존재하지 않습니다."));
         String encodePassword = passwordEncoder.encode(request.getPassword());
         member.updatePassword(encodePassword);
    }

    /** 회원 탈퇴  : userflag 2 로 변경 */
    @Transactional
    public void dropoutMember(String id) {
        int flag = 2;
        Members member = memberRepository.findById(id).orElseThrow(()->
                new IllegalArgumentException("상태 변경 불가"));
        member.updateUserState(flag);
    }






    /**
     * 관리자 로그인
     * 문상혁 작업
     **/
    public JwtTokenDto adminLogin(MemberLoginRequestDto requestDto) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
                = new UsernamePasswordAuthenticationToken(requestDto.getId(), requestDto.getPassword());

        Authentication authentication = managerBuilder.getObject().authenticate(usernamePasswordAuthenticationToken);
        JwtTokenDto jwtTokenDto = jwtTokenProvider.generateTokenDto(authentication);

        // 1) 유저가 존재하는지 확인
        boolean isMember = memberRepository.existsById(requestDto.getId());
        if(isMember) {
            // 2) 아이디로 유저 정보 찾기
            Members member = memberRepository.findById(requestDto.getId()).get();
            System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            System.out.println("member:" + member);
            System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

            // 3) authority 가져와서 검색하기
            Authority authority = member.getAuthority();
            if(authority == ROLE_USER) {
                System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                System.out.println("권한이 없는 계정입니다.");
                System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                throw new RuntimeException("권한이 없는 계정입니다.");
            } else {
                System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                System.out.println("권한있지롱.");
                System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                member.setAccessToken(jwtTokenDto.getAccessToken());
                member.setAccessTokenExpireIn(jwtTokenDto.getTokenExpiresIn());
                memberRepository.save(member);
            }
        } else {
            System.out.println("회원정보를 찾을 수 없습니다.");
            throw new RuntimeException("회원정보를 찾을 수 없습니다.");
        }
        return jwtTokenDto;
    }
}
