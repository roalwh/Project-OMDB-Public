package org.justdrink.omdb.repository;

import org.justdrink.omdb.model.Files;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import java.util.Optional;

@Repository
public interface FilesRepository  extends JpaRepository<Files, Long>{

    /** 게시글 bid 에 해당하는 파일 가져오기 */
    List<Files> findByBoard_Bid(Long bid);


}
