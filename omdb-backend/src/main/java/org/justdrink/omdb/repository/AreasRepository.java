package org.justdrink.omdb.repository;

import org.justdrink.omdb.model.Areas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AreasRepository extends JpaRepository<Areas, Long> {
}
