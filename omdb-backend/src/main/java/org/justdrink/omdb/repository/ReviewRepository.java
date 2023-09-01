package org.justdrink.omdb.repository;

import java.util.List;

import org.justdrink.omdb.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

  // 게시글 상세 리뷰 조회
  List<Review> findByDrink_DidAndDyn(Long did, String string);

  Long countByRid(Long rid);

  /** 리뷰를 등록한 회원인지 확인 - 술 하나당 리뷰 하나만 등록 가능 */
  boolean findByDrink_DidAndMembers_UidAndDyn(Long did, Long uid, String string);


  /** 회원 리뷰 전체 가져오기 */
  List<Review> findByMembers_UidAndDyn(Long uid, String dyn);


}
