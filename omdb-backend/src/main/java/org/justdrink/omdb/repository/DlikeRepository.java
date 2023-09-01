package org.justdrink.omdb.repository;

import org.justdrink.omdb.model.Dlike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DlikeRepository  extends JpaRepository<Dlike, Long>{

    //유저 찜 목록 체크
    boolean existsByMembers_UidAndDrink_Did(Long uid, Long did);

    //찜 삭제
//    Dlike findByMembers_UidAndDrink_Did(Long uid, Long did);
    Optional<Dlike> findByMembers_UidAndDrink_Did(Long uid, Long did);

    // 유저 찜 목록
    List<Dlike> findByMembers_Uid(Long uid);
}
