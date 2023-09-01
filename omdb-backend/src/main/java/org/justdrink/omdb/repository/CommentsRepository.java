package org.justdrink.omdb.repository;

import org.justdrink.omdb.model.Board;
import org.justdrink.omdb.model.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CommentsRepository  extends JpaRepository<Comments, Long>{
    /**  댓글 리스트 조회 - 보드 bid 로 찾기 + 삭제여부 확인 */
    List<Comments> findByBoard_BidAndDyn(Long bid, String dyn);

    /** 게시글별 댓글 갯수 */
    Long countByBoard_BidAndDyn(Long bid, String dyn);

    /** 댓글 찾기 - 댓글 bid 로 찾기 + 삭제여부 확인 */
    Optional<Comments> findByCidAndDyn(Long cid, String dyn);

    /** 회원 댓글 전체 가져오기 */
    List<Comments> findByMembers_UidAndDyn(Long uid,String dyn);
    
}
