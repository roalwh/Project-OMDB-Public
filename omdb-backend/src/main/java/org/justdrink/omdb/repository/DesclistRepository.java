package org.justdrink.omdb.repository;

import java.util.Optional;

import org.justdrink.omdb.model.Desclist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DesclistRepository extends JpaRepository<Desclist, Long>{
  Optional<Desclist> findByDname(String dname);
  
}
