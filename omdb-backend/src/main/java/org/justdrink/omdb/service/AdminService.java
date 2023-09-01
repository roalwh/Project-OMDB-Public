package org.justdrink.omdb.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.justdrink.omdb.model.Areas;
import org.justdrink.omdb.model.Drink;
import org.justdrink.omdb.model.Members;
import org.justdrink.omdb.model.dto.admin.AdminListDto;
import org.justdrink.omdb.model.dto.admin.AdminSignupRequestDto;
import org.justdrink.omdb.model.dto.admin.ListDto;
import org.justdrink.omdb.model.dto.admin.NewAdminSignupRequestDto;
import org.justdrink.omdb.model.dto.admin.UserListDto;
import org.justdrink.omdb.model.dto.member.MemberResponseDto;
import org.justdrink.omdb.model.enums.Authority;
import org.justdrink.omdb.repository.AreasRepository;
import org.justdrink.omdb.repository.DrinkRepository;
import org.justdrink.omdb.repository.MemberRepository;
import org.justdrink.omdb.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class AdminService {

  @Autowired
  EntityManager em;

  @Autowired
  MemberRepository memberRepository;

  @Autowired
  DrinkRepository drinkRepository;

  @Autowired
  ReviewRepository reviewRepository;

  @Autowired
  PasswordEncoder passwordEncoder;

  @Autowired
  AreasRepository areasRepository;

  // 관리자 리뷰 삭제 기준 : rid
  @Transactional
  public String deleteReview(Long rid, Long userId) {
    Members member = memberRepository.findById(userId).get();
    Authority optauth = member.getAuthority();

    if (!optauth.equals(Authority.ROLE_ADMIN) | !optauth.equals(Authority.ROLE_SADMIN)) {
      return "권한이 없습니다.";
    }
    if (reviewRepository.countByRid(rid) == 1) {
      reviewRepository.deleteById(rid);
      return rid + "번 리뷰 삭제되었습니다.";
    } else {
      return rid + "번 리뷰가 존재하지 않습니다.";
    }
  }

  // 관리자 술 정보 삭제 기준 : did
  @Transactional
  public String deleteDrink(Long did, Long userId) {
    Members member = memberRepository.findById(userId).get();
    Authority optauth = member.getAuthority();

    if (optauth.equals(Authority.ROLE_ADMIN) || optauth.equals(Authority.ROLE_SADMIN)) {
      Drink drink = drinkRepository.findById(did).get();
      String dirnkname = drink.getName();

      if (drinkRepository.existsById(did)) {
        drinkRepository.deleteById(did);
        return dirnkname + " 정보가 삭제되었습니다.";
      } else {
        return "술 정보가 존재하지 않습니다.";
      }

    }
    else {
      return member.getId() + "권한이 없습니다.";
    }
  }

  // 관리자 리스트
  @Transactional
  public List<Members> adminList() {
    List<Members> members = memberRepository.findByAuthorityOrAuthority(Authority.ROLE_ADMIN, Authority.ROLE_SADMIN);
    return members;
  }

  // 유저 리스트
  @Transactional
  public List<Members> userList() {
    List<Members> members = memberRepository.findByAuthority(Authority.ROLE_USER);
    return members;
  }

  /** 회원가입 */
  public MemberResponseDto adminsignup(AdminSignupRequestDto requestDto) {

    if (memberRepository.existsByIdAndUserflag(requestDto.getId(), 0)) {
      System.out.println("이미 가입됨");
      throw new RuntimeException("이미 가입되어 있는 유저입니다");
    }

    Members member = requestDto.toMember(passwordEncoder);
    member = memberRepository.save(member);
    return MemberResponseDto.of(member);
  }

  // 첫 관리자 생성시 최상위 관리자 생성
  public MemberResponseDto newadminsignup(NewAdminSignupRequestDto requestDto) {

    if (memberRepository.existsByIdAndUserflag(requestDto.getId(), 0)) {
      System.out.println("이미 가입됨");
      throw new RuntimeException("이미 가입되어 있는 유저입니다");
    }

    Members member = requestDto.toMember(passwordEncoder);
    member = memberRepository.save(member);
    return MemberResponseDto.of(member);
  }

  // 요청 권한 확인
  public boolean findSadmin(Long uid) {
    // 1.수정하려는 관리자가 있는지?
    boolean membercheck = memberRepository.existsById(uid);
    if (membercheck == false) {
      return false;
    }
    // 2. 관리자가 있으면 해당 관리자 권한이 SADMIN 인지 확인
    Members member = memberRepository.findById(uid).get();
    if (member.getAuthority() == Authority.ROLE_SADMIN) {
      return true;
    }
    return false;
  }

  // 3. 권한 및 대상이 있으면 삭제 진행
  public void deleteAdmin(List<AdminListDto> reqeust) {

    for (int i = 0; i < reqeust.get(0).getUserlist().size(); i++) {
      memberRepository.deleteById(reqeust.get(0).getUserlist().get(i).getUid());
    }
  }

  // 요청 권한 확인 sadmin?admin
  public boolean findadmin(Long uid) {
    // 1.수정하려는 관리자가 있는지 확인
    boolean membercheck = memberRepository.existsById(uid);
    if (membercheck == false) {
      return false;
    }
    // 2. 관리자가 있으면 해당 관리자 권한이 SADMIN,ADMIN 인지 확인
    Members member = memberRepository.findById(uid).get();
    if (member.getAuthority() == Authority.ROLE_SADMIN || member.getAuthority() == Authority.ROLE_ADMIN) {
      return true;
    }
    return false;
  }

  // 3. 권한이 있으면 사용자 상태변경
  @Transactional
  public void setUserFlag(List<UserListDto> reqeust) {
    for (int i = 0; i < reqeust.get(0).getUserlist().size(); i++) {
      Members member = memberRepository.findById(reqeust.get(0).getUserlist().get(i).getUid()).get();
      member.setUserflag(reqeust.get(0).getUserflag());
      memberRepository.save(member);
    }
  }

  // 일반 관리자 권한 변경
  @Transactional
  public void setAdminAuth(List<AdminListDto> reqeust) {
    for (int i = 0; i < reqeust.get(0).getUserlist().size(); i++) {
      Members member = memberRepository.findById(reqeust.get(0).getUserlist().get(i).getUid()).get();
      member.setAuthority(reqeust.get(0).getAuthority());
      memberRepository.save(member);
    }
  }

  // 삭제,수정하려는 대상이 있는지
  public boolean finduser(List<ListDto> reqeust) {
    for (int i = 0; i < reqeust.size(); i++) {
      boolean usercheck = memberRepository.existsById(reqeust.get(i).getUid());
      if (usercheck == false) {
        return false;
      }
    }
    return true;

  }


  // area 리스트
  @Transactional
  public List<Areas> areasList() {
    List<Areas> areas = areasRepository.findAll();
    return areas;
  }
}
