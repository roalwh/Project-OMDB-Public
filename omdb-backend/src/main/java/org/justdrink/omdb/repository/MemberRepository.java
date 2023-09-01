package org.justdrink.omdb.repository;

import org.justdrink.omdb.model.Members;
import org.justdrink.omdb.model.enums.Authority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository  extends JpaRepository<Members, Long>{
    /** uid 로 회원 찾기 */
    Optional<Members> findByUid(Long uid);
    /** 로그인 id 로 회원 찾기 */
    Optional<Members> findById(String id);
    /** 로그인 : userflg 가 0이고 입력한 id가 존재하는지 확인 */
    boolean existsById(String id);
    /** 로그인 id, 회원 상태로 회원이 존재하는지 확인 */
    boolean existsByIdAndUserflag(String id, int userflag);
    /** OAuth 로그인시 email 로 회원 찾기 */
    Optional<Members> findByEmail(String email);
    /** OAuth 로그인 시 사용 */
    Optional<Members> findByEmailAndProvider(String email, String provider);
    /** 아이디 찾기 : 이름, 이메일로 회원 id 찾기 */
    Optional<Members> findByNameAndEmail(String name, String email);
    /** 아이디 찾기: 이름, 이메일, userflag 0(정상) 인 회원이 존재하는지 확인 */
    boolean existsByNameAndEmailAndUserflag(String name, String email, int userflag);
    /** 비밀번호 찾기 : 아이디, 이메일로 회원 찾기 */
    Optional<Members> findByIdAndEmail(String id, String email);
    /** 비밀번호 찾기 : 아이디, 이메일, userflg 0(정상) 인 회원이 존재하는지 확인 */
    boolean existsByIdAndEmailAndUserflag(String id, String email, int userflag);




    
    // 관리자 리스트
    List<Members> findByAuthorityOrAuthority(Authority roleAdmin, Authority roleSadmin);
    // 사용자 리스트
    List<Members> findByAuthority(Authority roleUser);
    
    

}
