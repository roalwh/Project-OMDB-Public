package org.justdrink.omdb.controller;

import org.justdrink.omdb.model.dto.JwtTokenDto;
import org.justdrink.omdb.model.dto.member.MemberFindIdRequestDto;
import org.justdrink.omdb.model.dto.member.MemberFindIdResponseDto;
import org.justdrink.omdb.model.dto.member.MemberFindPwRequestDto;
import org.justdrink.omdb.model.dto.member.MemberLoginRequestDto;
import org.justdrink.omdb.model.dto.member.MemberResponseDto;
import org.justdrink.omdb.model.dto.member.MemberSignupRequestDto;
import org.justdrink.omdb.model.dto.member.UpdatePwRequestDto;
import org.justdrink.omdb.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

  private final AuthService authService;

  /**
   * 로그인
   * @param requestDto
   * @return 응답
   */
  @PostMapping("/login")
  public ResponseEntity<JwtTokenDto> login(@RequestBody MemberLoginRequestDto requestDto) {
    return ResponseEntity.ok(authService.login(requestDto));
  }

  /**
   * 회원가입
   * @param requestDto (회원정보)
   * @return 이메일, 닉네임
   */
  @PostMapping("/signup")
  public ResponseEntity<MemberResponseDto> signup(@Valid @RequestBody MemberSignupRequestDto requestDto) {
    MemberResponseDto memberResponseDto = null;
    try {
      memberResponseDto = authService.signup(requestDto);
    } catch(RuntimeException e) {
      ResponseEntity.status(HttpServletResponse.SC_CONFLICT).body(requestDto.toMemberResponseDto(requestDto));
    }

    return ResponseEntity.ok(memberResponseDto);
  }

  /**
   * 아이디 중복 확인
   * @param id
   * @return 중복되면 true
   */
  @GetMapping("/check-id/{id}")
  public boolean checkUsername(@PathVariable String id) {
    boolean isUnique = authService.isMemberIdUnique(id);
    return isUnique;
  }

  /**
   * 이메일 발송
   * @param reqeustDto
   * @return 인증번호
   */
  @PostMapping("/email")
  public String MailSend(@RequestBody MemberSignupRequestDto reqeustDto){

    int number = authService.sendMail(reqeustDto);
    return "이메일 발송";
  }

  /**
   * 이메일 인증번호 확인
   * @param authNumber
   * @return 인증번호 동일하면 true
   */
  @GetMapping("/check-email/{authNumber}")
  public boolean checkEmailNumber(@PathVariable int authNumber) {
    return authService.isSameNumber(authNumber);
  }

  /**
   * 아이디 찾기
   * @param requestDto 이름, 이메일
   * @return 유저 아이디
   */
  @PostMapping("/find-id")
  public ResponseEntity<MemberFindIdResponseDto> findMemberId(@RequestBody MemberFindIdRequestDto requestDto) {
   String userId = authService.getUserId(requestDto);
   MemberFindIdResponseDto responseDto = new MemberFindIdResponseDto(userId);

    return ResponseEntity.ok(responseDto);
  }

  /**
   * 비밀번호 찾기
   * @param requestDto 유저 아이디, 이메일
   * @return 두 개가 유저정보로 일치하면 true
   */
  @PostMapping("/find-pw")
  public ResponseEntity<Long> findMemberPw(@RequestBody MemberFindPwRequestDto requestDto) {
    return ResponseEntity.ok(authService.getUserPw(requestDto));
  }

  /**
   * 비밀번호 변경
   * @param uid
   * @param request
   * @return
   */
  @PutMapping("/change-pw/{uid}")
  public void updateUserPw(
          @PathVariable Long uid,
          @RequestBody UpdatePwRequestDto request) {
    authService.updatePw(uid, request);
  }

  /**
   * 회원 탈퇴
   * @param id
   */
  @PutMapping("/drop/{id}")
  public void withdrawMember(@PathVariable String id) {
    authService.dropoutMember(id);
  }


}
