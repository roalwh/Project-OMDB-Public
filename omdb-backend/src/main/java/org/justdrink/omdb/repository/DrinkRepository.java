package org.justdrink.omdb.repository;

import java.util.List;
import java.util.Optional;

import org.justdrink.omdb.model.Drink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DrinkRepository extends JpaRepository<Drink, Long> {
  
  // %이름% 검색
  List<Drink> findByNameContaining(String name);

  // 술종류 검색
  List<Drink> findByDesclist_Dname(String category);

  // %지역명% 검색
  List<Drink> findTop10ByRegionContaining(String region);
  
  // 술종류 and %이름% 검색
  List<Drink> findByDesclist_DnameAndNameContaining(String category, String name);

  // 술 취향 테스트
  List<Drink> findByDesclist_DnameAndSweetBetweenAndSourBetweenAndCoolBetweenAndBodyBetweenAndInsenseBetweenAndAlcBetween(String drinkName, Long sweetLow, Long sweetHigh, Long sourLow, Long sourHigh, Long coolLow, Long coolHigh, Long bodyLow, Long bodyHigh, Long insenseLow, Long insenseHigh, double alcLow, double alcHigh);


  // 술 찜 목록
  Optional<Drink> findByDid(Long did);
}
