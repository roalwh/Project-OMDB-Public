package org.justdrink.omdb.repository;

import org.justdrink.omdb.model.Clike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClikeRepository  extends JpaRepository<Clike, Long>{
}
