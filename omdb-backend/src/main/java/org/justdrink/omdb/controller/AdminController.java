package org.justdrink.omdb.controller;

import java.util.List;

import org.justdrink.omdb.model.dto.JwtTokenDto;
import org.justdrink.omdb.model.dto.admin.*;
import org.justdrink.omdb.model.dto.member.MemberLoginRequestDto;
import org.justdrink.omdb.model.dto.member.MemberResponseDto;
import org.justdrink.omdb.service.AdminService;
import org.justdrink.omdb.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/admin")
public class AdminController {

  @Autowired
  AdminService adminService;

  @Autowired
  AuthService authService;

  // 관리자 리뷰 삭제 기준 : rid
  @DeleteMapping("/reviewdel/{rid}")
  public ResponseEntity<String> deleteReview(@PathVariable Long rid,
      @RequestParam(value = "userId") Long userId) {
    String delreview = adminService.deleteReview(rid, userId);
    return ResponseEntity.ok().body(delreview);
  }

  // 관리자 리뷰 삭제 기준 : did
  @DeleteMapping("/drinkdel/{did}")
  public ResponseEntity<String> deleteDrink(@PathVariable Long did,
      @RequestParam(value = "userId") Long userId) {
    String delreview = adminService.deleteDrink(did, userId);
    return ResponseEntity.ok().body(delreview);
  }

  // 관리자 목록 조회
  @GetMapping("/adminlist")
  public ResponseEntity<List<AdminSelectResponseDto>> selectAdmin() {
    List<AdminSelectResponseDto> adminmember = adminService.adminList()
        .stream().map(AdminSelectResponseDto::new)
        .toList();
    return ResponseEntity.ok().body(adminmember);
  }

  // 일반사용자 목록 조회
  @GetMapping("/userlist")
  public ResponseEntity<List<AdminSelectResponseDto>> selectUser() {
    List<AdminSelectResponseDto> usermember = adminService.userList()
        .stream().map(AdminSelectResponseDto::new)
        .toList();
    return ResponseEntity.ok().body(usermember);
  }

  // 관리자 등록
  @PostMapping("/signup")
  public ResponseEntity<MemberResponseDto> signup(@Valid @RequestBody AdminSignupRequestDto requestDto) {
    MemberResponseDto memberResponseDto = null;
    try {
      memberResponseDto = adminService.adminsignup(requestDto);
    } catch (RuntimeException ee) {
      ResponseEntity.status(HttpServletResponse.SC_CONFLICT).body(requestDto.toMemberResponseDto(requestDto));
    }
    return ResponseEntity.ok(memberResponseDto);
  }

  // 관리자 등록 첫 생성시
  @PostMapping("/signup/new")
  public ResponseEntity<MemberResponseDto> newsignup(@Valid @RequestBody NewAdminSignupRequestDto requestDto) {
    MemberResponseDto memberResponseDto = null;
    try {
      memberResponseDto = adminService.newadminsignup(requestDto);
    } catch (RuntimeException ee) {
      ResponseEntity.status(HttpServletResponse.SC_CONFLICT).body(requestDto.toMemberResponseDto(requestDto));
    }
    return ResponseEntity.ok(memberResponseDto);
  }

  // 관리자 ->사용자 상태 변경
  @PutMapping("/userset")
  public ResponseEntity<String> setUserFlag(@RequestBody List<UserListDto> reqeust) {

    boolean sadminCheck = adminService.findadmin(reqeust.get(0).getOrderuid());
    if (sadminCheck == false) {
      return ResponseEntity.ok("권한이 없습니다.");
    }
    // 변경,삭제대상 확인
    boolean userCheck = adminService.finduser(reqeust.get(0).getUserlist());
    if (userCheck == false) {
      return ResponseEntity.ok("삭제 대상이 없습니다.");
    }
    // 권한이 맞으면 유저상태변경 진행
    adminService.setUserFlag(reqeust);
    String reqeustlist = "";
    for (int i = 0; i < reqeust.get(0).getUserlist().size(); i++) {
      if (reqeust.get(0).getUserlist().size() == 1) {
        reqeustlist += (reqeust.get(0).getUserlist().get(i).getUserid() + " ");
      } else if (i == reqeust.get(0).getUserlist().size() - 1) {
        reqeustlist += (reqeust.get(0).getUserlist().get(i).getUserid() + " ");
      } else {
        reqeustlist += (reqeust.get(0).getUserlist().get(i).getUserid() + ", ");
      }
    }
    return ResponseEntity.ok(reqeustlist + "계정상태가 변경되었습니다.");

  }

  // 관리자 권한 변경
  @PutMapping("/adminset")
  public ResponseEntity<String> setAdmin(@RequestBody List<AdminListDto> reqeust) {

    boolean sadminCheck = adminService.findSadmin(reqeust.get(0).getOrderuid());
    if (sadminCheck == false) {
      return ResponseEntity.ok("권한이 없습니다.");
    }

    boolean userCheck = adminService.finduser(reqeust.get(0).getUserlist());
    if (userCheck == false) {
      return ResponseEntity.ok("변경 대상이 없습니다.");
    }
    adminService.setAdminAuth(reqeust);
    return ResponseEntity.ok("변경완료");

  }


  // 최상위 관리자-> 일반관리자 삭제시
  @DeleteMapping("/admindel")
  public ResponseEntity<String> deleteAdmin(@RequestBody List<AdminListDto> reqeust) {

    boolean sadminCheck = adminService.findSadmin(reqeust.get(0).getOrderuid());
    if (sadminCheck == false) {
      return ResponseEntity.ok("권한이 없습니다.");
    }
    // 변경,삭제대상 확인
    boolean userCheck = adminService.finduser(reqeust.get(0).getUserlist());
    if (userCheck == false) {
      return ResponseEntity.ok("변경 대상이 없습니다.");
    }
    // 권한이 맞으면 삭제 진행
    adminService.deleteAdmin(reqeust);
    String reqeustlist = "";
    for (int i = 0; i < reqeust.get(0).getUserlist().size(); i++) {
      if (reqeust.get(0).getUserlist().size() == 1) {
        reqeustlist += (reqeust.get(0).getUserlist().get(i).getUserid() + " ");
      } else if (i == reqeust.get(0).getUserlist().size() - 1) {
        reqeustlist += (reqeust.get(0).getUserlist().get(i).getUserid() + " ");
      } else {
        reqeustlist += (reqeust.get(0).getUserlist().get(i).getUserid() + ", ");
      }
    }
    return ResponseEntity.ok(reqeustlist + "관리자가 삭제되었습니다.");
  }



  // 술 등록 area 정보 가져오기
  @GetMapping("/area")
  public ResponseEntity<List<AreaSelectResponseDto>> selectArea() {
    List<AreaSelectResponseDto> drinkArea = adminService.areasList().stream().map(AreaSelectResponseDto::new).toList();
    return ResponseEntity.ok().body(drinkArea);
  }




  // 관리자 로그인 시켜버리기!
  @PostMapping("/login")
  public ResponseEntity<JwtTokenDto> login(@RequestBody MemberLoginRequestDto requestDto) {
    return ResponseEntity.ok(authService.adminLogin(requestDto));
  }





}
