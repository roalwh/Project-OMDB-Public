package org.justdrink.omdb.repository;

import java.util.List;
import java.util.Optional;

import org.justdrink.omdb.model.Board;
import org.justdrink.omdb.model.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {


    /** 게시글 전체 보기  - 등록일 최신순 정렬 + 삭제여부 확인   */
    List<Board> findByDynOrderByCdatetimeDesc(String dyn);
    /** 게시글 전체 보기 - 조회수 높은 순으로 정렬  + 삭제여부 확인  */
    List<Board> findByDynOrderByHitsDesc(String dyn);

    /** 게시글 상세보기 - 게시글 bid 로 찾기 + 삭제여부 확인 */
    Optional<Board> findByBidAndDyn(Long bid, String dyn);

    /** 게시글 조회수 1 증가 */
    @Modifying
    @Query("update Board b set b.hits = b.hits + 1 where b.bid = :bid")
    int updateViewCount(@Param("bid") Long bid);

    /** 게시글 종류별 리스트 - 분류(공지/자유/맛집) + 등록일 최신순 정렬 + 삭제여부 확인 */
    List<Board> findByKindAndDynOrderByCdatetimeDesc(int kind, String dyn);
    /** 게시글 종류별 리스트  - 분류(공지/자유/맛집) + 조회수 높은 순으로 정렬 + 삭제여부 확인 */
    List<Board> findByKindAndDynOrderByHitsDesc(int kind, String dyn);

    // 종류 %이름% 정렬
    List<Board> findByKindAndTitleContainingAndDynOrderByCdatetimeDesc(int kind, String title, String string);
    List<Board> findByKindAndTitleContainingAndDynOrderByHitsDesc(int kind, String title, String string);
    // %이름% 정렬
    List<Board> findByTitleContainingAndDynOrderByHitsDesc(String title, String string);
    List<Board> findByTitleContainingAndDynOrderByCdatetimeDesc(String title, String string);

    /** 회원 게시글 전체 가져오기 */
    List<Board> findByMembers_UidAndDyn(Long uid,String dyn);

    
    
}
