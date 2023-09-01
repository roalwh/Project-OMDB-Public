package org.justdrink.omdb.service;

import java.util.List;
import java.util.Optional;

import org.justdrink.omdb.model.Drink;
import org.justdrink.omdb.model.Members;
import org.justdrink.omdb.model.Review;
import org.justdrink.omdb.model.Rimg;
import org.justdrink.omdb.model.dto.cate.AddReviewRequestDto;
import org.justdrink.omdb.model.dto.cate.AddRimgRequestDto;
import org.justdrink.omdb.model.dto.cate.UpdateReviewRequestDto;
import org.justdrink.omdb.model.dto.cate.UpdateRimgRequestDto;
import org.justdrink.omdb.repository.DrinkRepository;
import org.justdrink.omdb.repository.MemberRepository;
import org.justdrink.omdb.repository.ReviewRepository;
import org.justdrink.omdb.repository.RimgRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class CateService {

  @Autowired
  DrinkRepository drinkRepository;

  @Autowired
  ReviewRepository reviewRepository;

  @Autowired
  MemberRepository memberRepository;

  @Autowired
  RimgRepository rimgRepository;

  // ------카테고리 메인-------
  // 전체 술리스트
  @Transactional(readOnly = true) // 메서드가 포함하고 있는 작업 중에 하나라도 실패할 경우 전체 작업을 취소 //Id 관련 auto increment는 롤백안됨
  public List<Drink> findCateAll() {
    List<Drink> drinkList = drinkRepository.findAll();
    return drinkList;
  }

  // 카테고리 페이지 id,술이름,사진 조건 : 이름
  @Transactional
  public List<Drink> findCateName(String name) {
    List<Drink> drinkList = drinkRepository.findByNameContaining(name);
    return drinkList;
  }

  // 카테고리 페이지 id,술이름,사진 조건 : 술종류
  @Transactional
  public List<Drink> findCategory(String category) {
    List<Drink> drinkList = drinkRepository.findByDesclist_Dname(category);
    return drinkList;
  }

  // 카테고리 페이지 검색 조건 : 종류, 이름
  @Transactional
  public List<Drink> findNameAndCategory(String category, String name) {
    List<Drink> drinkList = drinkRepository.findByDesclist_DnameAndNameContaining(category, name);
    return drinkList;
  }

  // 술 상세페이지
  @Transactional
  public Drink findCateInfo(Long did) {
    Optional<Drink> drinkList = drinkRepository.findById(did);
    return drinkList.orElseThrow(() -> new IllegalArgumentException("not found : id"));
  }

  // 리뷰 조회 기준 : 게시글 번호
  @Transactional
  public List<Review> findReviewList(Long did) {
    List<Review> reviewList = reviewRepository.findByDrink_DidAndDyn(did, "N");
    return reviewList;
  }

  // 게시글 유무 확인
  public boolean finddrink(Long did) {

    return drinkRepository.existsById(did);
  }

  // 사용자 유무 확인
  public boolean findmember(Long uid) {
    return memberRepository.existsById(uid);
  }

  // 리뷰등록
  public Review addReview(AddReviewRequestDto reviewRequest) {
    // 1. 검색할 값을 가지고 조인테이블에 조회
    System.out.println(reviewRequest);
    // if
    // (reviewRepository.findByDrink_DidAndMembers_UidAndDyn(reviewRequest.getDrinkId(),
    // reviewRequest.getMemberId(),"N")) {
    // throw new RuntimeException("이미 리뷰를 등록했습니다");
    // }
    Optional<Drink> optDid = drinkRepository.findById(reviewRequest.getDrinkId());
    Optional<Members> optUid = memberRepository.findById(reviewRequest.getMemberId());

    return reviewRepository.save(reviewRequest.toEntityReview(optDid.get(), optUid.get()));
  }

  // 파일 업로드 이미지
  public Rimg addRimg(AddRimgRequestDto request) {
    Optional<Review> optRid = reviewRepository.findById(request.getRid());
    return rimgRepository.save(request.toEntityReview(optRid.get()));
  }

  // 파일 업로드 조회
  public Review selectReview(Long rid) {
    Optional<Review> review = reviewRepository.findById(rid);

    return review.get();
  }

  // 리뷰 수정
  @Transactional
  public Review updateReviewss(UpdateReviewRequestDto reviewUpRequest) {
    // 리뷰 데이터 불러옴
    Review review = reviewRepository.findById(reviewUpRequest.getRid()).get();

    // dyn 이 Y인경우 리뷰삭제이므로 리턴추가
    if (reviewUpRequest.getReviewdyn() != null) {
      review.setDyn(reviewUpRequest.getReviewdyn());
      return reviewRepository.save(review);
    }

    if (reviewUpRequest.getTitle() != null) {
      review.setTitle(reviewUpRequest.getTitle());
    }

    if (reviewUpRequest.getContent() != null) {
      review.setContent(reviewUpRequest.getContent());
    }
    
    if (reviewUpRequest.getContent() != null) {
      review.setScore(reviewUpRequest.getScore());
    }

    return reviewRepository.save(review);
  }

  // 리뷰수정 이미지
  @Transactional
  public Rimg updateRimg(UpdateRimgRequestDto imgrequest) {
    Rimg rimg = rimgRepository.findByReview_RidAndImgid(imgrequest.getRid(), imgrequest.getImgid());

    if (imgrequest.getDyn() != null) {
      rimg.setDyn(imgrequest.getDyn());
      return rimgRepository.save(rimg);
    }
    if (imgrequest.getIname() != null) {
      rimg.setIname(imgrequest.getIname());
    }
    if (imgrequest.getPath() != null) {
      rimg.setPath(imgrequest.getPath());
    }
    return rimgRepository.save(rimg);

  }

}
