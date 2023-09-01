package org.justdrink.omdb.repository;

import org.justdrink.omdb.model.Rimg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RimgRepository extends JpaRepository<Rimg, Long> {
  Rimg findByReview_RidAndImgid(Long rid, Long imgid);

}
