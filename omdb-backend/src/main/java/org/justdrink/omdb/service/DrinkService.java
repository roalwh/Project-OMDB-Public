package org.justdrink.omdb.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.justdrink.omdb.model.Desclist;
import org.justdrink.omdb.model.Dimg;
import org.justdrink.omdb.model.Drink;
import org.justdrink.omdb.model.Members;
import org.justdrink.omdb.model.dto.drink.AddDimgRequestDto;
import org.justdrink.omdb.model.dto.drink.AddDrinkRequestDto;
import org.justdrink.omdb.model.dto.drink.UpdateDimgRequestDto;
import org.justdrink.omdb.model.dto.drink.UpdateDrinkRequestDto;
import org.justdrink.omdb.model.enums.Authority;
import org.justdrink.omdb.repository.DesclistRepository;
import org.justdrink.omdb.repository.DimgRepository;
import org.justdrink.omdb.repository.DrinkRepository;
import org.justdrink.omdb.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PreUpdate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor // final이 붙거나 @Notnull이 붙은 필드의 생성자 추가
@Service // 빈으로 등록
public class DrinkService {

  @Autowired
  EntityManager em;

  @Autowired
  private DrinkRepository drinkRepository;

  @Autowired
  private DesclistRepository desclistRepository;

  @Autowired
  public DimgRepository dimgRepository;

  @Autowired
  public MemberRepository memberRepository;

  // 계정 검증
  @Transactional
  public Boolean finduser(Long uid){
    Members member = memberRepository.findById(uid).get();
    if(member==null)
    return false;

    if(member.getAuthority().equals(Authority.ROLE_ADMIN) || member.getAuthority().equals(Authority.ROLE_SADMIN))
    return true;

    return false;
  }
  // 술 등록
  @Transactional // 메서드가 포함하고 있는 작업 중에 하나라도 실패할 경우 전체 작업을 취소 //Id 관련 auto increment는 롤백안됨
  public Drink addDrink(AddDrinkRequestDto request) {
    // 1. Drink 저장
    Optional<Desclist> optdname = desclistRepository.findByDname(request.getCategory());
    // 2. Drink 저장 후 리턴
    return drinkRepository.save(request.toEntityDrink(optdname.get()));
  }

  //술 이미지 등록
  @Transactional
  public Dimg addDimg(AddDimgRequestDto imgrequest){
    Optional<Drink> optDrink = drinkRepository.findById(imgrequest.getDid());
    return dimgRepository.save(imgrequest.toEntityDimg(optDrink.get()));
  }


  // 술 데이터 수정
  public Drink updateDrink(UpdateDrinkRequestDto updateRequest){
    Drink drink = drinkRepository.findById(updateRequest.getDid()).get();
    if(updateRequest.getName()!=null){
      drink.setName(updateRequest.getName());
    }
    if (updateRequest.getAlc()!=null) {
      drink.setAlc((double) updateRequest.getAlc());
    }
    if (updateRequest.getIngre()!=null) {
      drink.setIngre(updateRequest.getIngre());
    }
    if (updateRequest.getMaker()!=null) {
      drink.setMaker(updateRequest.getMaker());
    }
    if (updateRequest.getAddress()!=null) {
      drink.setAddress(updateRequest.getAddress());
    }
    if (updateRequest.getRegion()!=null) {
      drink.setRegion(updateRequest.getRegion());
    }
    if (updateRequest.getPrice()!=null) {
      drink.setPrice(updateRequest.getPrice());
    }
    if (updateRequest.getFood()!=null) {
      drink.setFood(updateRequest.getFood());
    }
    if (updateRequest.getInfo()!=null) {
      drink.setInfo(updateRequest.getInfo());
    }
    if (updateRequest.getCategory()!=null) {
      Desclist desclist = desclistRepository.findByDname(updateRequest.getCategory()).get();      
      drink.setDesclist(desclist);
    }
    if (updateRequest.getSweet()!=null) {
      drink.setSweet(updateRequest.getSweet());
    }
    if (updateRequest.getSour()!=null) {
      drink.setSour(updateRequest.getSour());
    }
    if (updateRequest.getCool()!=null) {
      drink.setCool(updateRequest.getCool());
    }
    if (updateRequest.getBody()!=null) {
      drink.setBody(updateRequest.getBody());
    }
    if (updateRequest.getBalance()!=null) {
      drink.setBalance(updateRequest.getBalance());
    }
    if (updateRequest.getInsense()!=null) {
      drink.setInsense(updateRequest.getInsense());
    }
    if (updateRequest.getThroat()!=null) {
      drink.setThroat(updateRequest.getThroat());
    }
    
    return drinkRepository.save(drink);
  }
  // 술 수정 이미지 변경
  public Dimg updateDimg(UpdateDimgRequestDto imgrequest){
    Dimg dimg = dimgRepository.findByImgidAndDrink_Did(imgrequest.getImgid(),imgrequest.getDid());

    if(imgrequest.getDyn()!=null){
      dimg.setDyn(imgrequest.getDyn());
      return dimg;
    }
    if(imgrequest.getIname()!=null){
      dimg.setIname(imgrequest.getIname());
    }
    if(imgrequest.getPath()!=null){
      dimg.setPath(imgrequest.getPath());
    }
    System.out.println(LocalDateTime.now());
    dimg.setudatetime(LocalDateTime.now());
    return dimg;
    
  }



  // 전체 술리스트
  @Transactional // 메서드가 포함하고 있는 작업 중에 하나라도 실패할 경우 전체 작업을 취소 //Id 관련 auto increment는 롤백안됨
  public List<Drink> findAll() {
    List<Drink> drinkList = drinkRepository.findAll();
    return drinkList;
  }


  // ---------------------별도 기본적인 조회----------
  // id기준 술 정보
  @Transactional // 메서드가 포함하고 있는 작업 중에 하나라도 실패할 경우 전체 작업을 취소 //Id 관련 auto increment는 롤백안됨
  public Drink findByDid(Long did) {
    Optional<Drink> drinks = drinkRepository.findById(did);
    return drinks.orElseThrow(() -> new IllegalArgumentException("not found : id"));
  }

  // 이름 기준 술정보
  @Transactional // 메서드가 포함하고 있는 작업 중에 하나라도 실패할 경우 전체 작업을 취소 //Id 관련 auto increment는 롤백안됨
  public List<Drink> searchNameLike(String name) {
    List<Drink> drinks = drinkRepository.findByNameContaining(name);

    return drinks;
  }

  // 지역 기준 술정보
  @Transactional // 메서드가 포함하고 있는 작업 중에 하나라도 실패할 경우 전체 작업을 취소 //Id 관련 auto increment는 롤백안됨
  public List<Drink> searchRegionLike(String region) {
    List<Drink> drinks = drinkRepository.findTop10ByRegionContaining(region);
    return drinks;
  }

  // 술 종류 기준 술정보
  @Transactional // 메서드가 포함하고 있는 작업 중에 하나라도 실패할 경우 전체 작업을 취소 //Id 관련 auto increment는 롤백안됨
  public List<Drink> searchDnameLike(String category) {
    List<Drink> drinks = drinkRepository.findByDesclist_Dname(category);

    return drinks;
  }

  // 술 종류, 이름 기준 술정보
  @Transactional // 메서드가 포함하고 있는 작업 중에 하나라도 실패할 경우 전체 작업을 취소 //Id 관련 auto increment는 롤백안됨
  public List<Drink> searchDnameTonameLike(String category, String name) {
    List<Drink> drinks = drinkRepository.findByDesclist_DnameAndNameContaining(category, name);

    return drinks;
  }

  // 술 취향 테스트
  @Transactional
  public List<Drink> searchTasteBetween(String drinkName, Long sweetLow, Long sweetHigh, Long sourLow, Long sourHigh, Long coolLow, Long coolHigh, Long bodyLow, Long bodyHigh, Long insenseLow, Long insenseHigh, double alcLow, double alcHigh) {
    List<Drink> drinks = drinkRepository.findByDesclist_DnameAndSweetBetweenAndSourBetweenAndCoolBetweenAndBodyBetweenAndInsenseBetweenAndAlcBetween(drinkName, sweetLow, sweetHigh, sourLow, sourHigh, coolLow, coolHigh, bodyLow, bodyHigh, insenseLow, insenseHigh, alcLow, alcHigh);

    return drinks;
  }

}
