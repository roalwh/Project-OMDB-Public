package org.justdrink.omdb.repository;

import org.justdrink.omdb.model.Dimg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DimgRepository  extends JpaRepository<Dimg, Long>{

  Dimg findByImgidAndDrink_Did(Long imgid, Long did);
}
