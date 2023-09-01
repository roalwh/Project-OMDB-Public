package org.justdrink.omdb.controller;

import java.io.File;
import java.util.List;

import org.justdrink.omdb.model.Drink;
import org.justdrink.omdb.model.Review;
import org.justdrink.omdb.model.dto.cate.AddReviewRequestDto;
import org.justdrink.omdb.model.dto.cate.AddRimgRequestDto;
import org.justdrink.omdb.model.dto.cate.CateDrinkResponseDto;
import org.justdrink.omdb.model.dto.cate.ReviewResponseDto;
import org.justdrink.omdb.model.dto.cate.UpdateReviewRequestDto;
import org.justdrink.omdb.model.dto.cate.UpdateRimgRequestDto;
import org.justdrink.omdb.service.CateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.EntityManager;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/cate")
public class CateController {

  @GetMapping("/")
  public String CateController() {
    return "The CateAPI is up running....";
  }

  @Autowired
  EntityManager em;

  @Autowired
  CateService cateService;

  // 카테고리 페이지 id,술이름,사진 조건없는 전체
  @GetMapping("/all")
  public ResponseEntity<List<CateDrinkResponseDto>> findCateDrink() {
    List<CateDrinkResponseDto> catDrinks = cateService.findCateAll()
        .stream().map(CateDrinkResponseDto::new)
        .toList();
    return ResponseEntity.ok().body(catDrinks);
  }

  // 카테고리 페이지 id,술이름,사진 조건 : 이름
  @GetMapping(path = "/search", params = "name")
  public ResponseEntity<List<CateDrinkResponseDto>> findCateName(@RequestParam(value = "name") String name,
      Model model) {
    List<CateDrinkResponseDto> catDrinks = cateService.findCateName(name)
        .stream().map(CateDrinkResponseDto::new)
        .toList();
    return ResponseEntity.ok().body(catDrinks);
  }

  // 카테고리 페이지 id,술이름,사진 조건 : 술종류
  @GetMapping(path = "/search", params = "category")
  public ResponseEntity<List<CateDrinkResponseDto>> findCateCategory(@RequestParam(value = "category") String category,
      Model model) {
    List<CateDrinkResponseDto> catDrinks = cateService.findCategory(category)
        .stream().map(CateDrinkResponseDto::new)
        .toList();
    return ResponseEntity.ok().body(catDrinks);
  }

  // 카테고리 페이지 id,술이름,사진 조건 : 술종류, 술이름
  @GetMapping(path = "/search", params = { "category", "name" })
  public ResponseEntity<List<CateDrinkResponseDto>> findCateCategory(@RequestParam(value = "category") String category,
      @RequestParam(value = "name") String name, Model model) {
    List<CateDrinkResponseDto> catDrinks = cateService.findNameAndCategory(category, name)
        .stream().map(CateDrinkResponseDto::new)
        .toList();
    return ResponseEntity.ok().body(catDrinks);
  }

  // 기본 조회랑 같은기능.................................
  // 술 상세정보 조건 : 술 번호
  @GetMapping("/info/{did}")
  public Drink findCateInfo(@PathVariable Long did, Model model) {
    Drink cateInfo = cateService.findCateInfo(did);
    return cateInfo;
  }

  // 리뷰 조회
  @GetMapping("/review/{did}")
  public ResponseEntity<List<ReviewResponseDto>> findReviewList(@PathVariable Long did, Model model) {
    List<ReviewResponseDto> cateReviews = cateService.findReviewList(did)
        .stream().map(ReviewResponseDto::new).toList();
    return ResponseEntity.ok().body(cateReviews);
  }

  // 리뷰 등록 파일 포함
  @PostMapping("/reviewin")
  public ResponseEntity<?> addReview(@RequestParam(value = "files", required = false) MultipartFile files[],
      @RequestParam("drinkId") Long drinkId,
      @RequestParam("memberId") Long memberId,
      @RequestParam("title") String title,
      @RequestParam("content") String content,
      @RequestParam("score") Long score,
      HttpServletRequest request, HttpServletResponse response, Model model) {

        System.out.println(drinkId+ memberId +title+ content+ score);
    boolean drinkcheck = cateService.finddrink(drinkId);
    if (!drinkcheck) {
      return ResponseEntity.badRequest().body("게시글이 없습니다.");
    }

    boolean membercheck = cateService.findmember(memberId);
    if (!membercheck) {
      return ResponseEntity.badRequest().body("사용자가 없습니다.");
    }

    AddReviewRequestDto reviewRequest = new AddReviewRequestDto(drinkId, memberId, title, content, score, "N");
    Review review = cateService.addReview(reviewRequest);
    Long rid = review.getRid();

    // 이미지가 있는경우
    if (files != null) {
      for (int i = 0; i < files.length; i++) {
        MultipartFile multi = files[i];
        String path = "c:\\img";
        System.out.println(path);

        try {
          // 파일 경로 설정
          String uploadpath = path;
          String originFilename = multi.getOriginalFilename();
          long size = multi.getSize();
          String extName = originFilename.substring(originFilename.lastIndexOf("."), originFilename.length());
          // String saveFileName = genSaveFileName(extName);
          String saveFileName = "review_" + drinkId + "_" + rid + extName;

          System.out.println("uploadpath : " + uploadpath);
          System.out.println("originFilename : " + originFilename);
          System.out.println("extensionName : " + extName);
          System.out.println("size : " + size);
          System.out.println("saveFileName : " + saveFileName);

          String path2 = System.getProperty("user.dir");
          // 파일 경로 최종
          // 윈도우
          // String path3 = "\\src\\main\\resources\\img\\drink" + drinkId + "\\rimg" + rid + "\\";
          // 리눅스
          String path3 = "/src/main/resources/img/drink" + drinkId + "/rimg" + rid + "/";
          System.out.println("Working Directory = " + path2 + path3);

          // 디비 파일 경로
          String setpath = "/rimg/" + drinkId + "/" + rid + "/" + saveFileName;
          System.out.println("setpath =" + setpath);
          if (!multi.isEmpty()) {

            // 파일저장경로설정
            File forder = new File(path2 + path3);
            forder.mkdir();
            System.out.println(forder);

            // 해당 디렉토리가 없을경우 디렉토리를 생성합니다.
            if (!forder.exists()) {
              try {
                forder.mkdirs(); // 폴더 생성합니다.
                System.out.println("폴더가 생성되었습니다.");
              } catch (Exception e) {
                e.getStackTrace();
              }
            } else {
              System.out.println("이미 폴더가 생성되어 있습니다.");
            }
            // 파일 저장 경로/파일이름
            File file = new File(path2 + path3, saveFileName);
            // 파일 저장
            multi.transferTo(file);

            AddRimgRequestDto imgrequest = new AddRimgRequestDto(rid, saveFileName, setpath, "N");

            cateService.addRimg(imgrequest);
          }
        } catch (Exception e) {
          System.out.println(e);
        }
      }
    }
    em.clear();
    Review reviews = cateService.selectReview(rid);
    return ResponseEntity.status(HttpStatus.CREATED).body(reviews);
  }

  // 리뷰 수정 파일포함
  @PutMapping(path = "/reviewedit/{rid}")
  public ResponseEntity<Review> updateReviewss(@PathVariable Long rid,
      @RequestParam(value = "files", required = false) MultipartFile files[],
      @RequestParam(value = "title", required = false) String title,
      @RequestParam(value = "content", required = false) String content,
      @RequestParam(value = "score", required = false) Long score,
      @RequestParam(value = "reviewdyn", required = false) String reviewdyn,
      @RequestParam(value = "imgid", required = false) Long imgid,
      @RequestParam(value = "imgdyn", required = false) String imgdyn,
      HttpServletRequest request, HttpServletResponse response, Model model) {

    UpdateReviewRequestDto reviewUpRequest = new UpdateReviewRequestDto(rid, title, content,score, reviewdyn);
    // 리뷰 글 업데이트
    Review review = cateService.updateReviewss(reviewUpRequest);
    // 리턴받은 리뷰에서 술 번호 가져오기
    Drink drinklist = review.getDrink();
    Long drinkId = drinklist.getDid();

    // 새로운 파일이 있으면
    if (files != null) {
      for (int i = 0; i < files.length; i++) {
        MultipartFile multi = files[i];
        String path = "c:\\img";
        System.out.println(path);

        try {
          // 파일 경로 설정
          String uploadpath = path;
          String originFilename = multi.getOriginalFilename();
          long size = multi.getSize();
          String extName = originFilename.substring(originFilename.lastIndexOf("."), originFilename.length());
          // String saveFileName = genSaveFileName(extName);
          String saveFileName = "review_" + drinkId + "_" + rid + extName;

          System.out.println("uploadpath : " + uploadpath);
          System.out.println("originFilename : " + originFilename);
          System.out.println("extensionName : " + extName);
          System.out.println("size : " + size);
          System.out.println("saveFileName : " + saveFileName);

          String path2 = System.getProperty("user.dir");
          // 파일 경로 최종
          // 윈도우
          // String path3 = "\\src\\main\\resources\\img\\drink" + drinkId + "\\rimg" + rid + "\\";
          // 리눅스
          String path3 = "/src/main/resources/img/drink" + drinkId + "/rimg" + rid + "/";
          System.out.println("Working Directory = " + path2 + path3);

          // 디비 파일 경로
          String setpath = "/rimg/" + drinkId + "/" + rid + "/" + saveFileName;
          System.out.println("setpath =" + setpath);
          if (!multi.isEmpty()) {

            // 파일저장경로설정
            File forder = new File(path2 + path3);
            forder.mkdir();
            System.out.println(forder);

            // 해당 디렉토리가 없을경우 디렉토리를 생성합니다.
            if (!forder.exists()) {
              try {
                forder.mkdirs(); // 폴더 생성합니다.
                System.out.println("폴더가 생성되었습니다.");
              } catch (Exception e) {
                e.getStackTrace();
              }
            } else {
              System.out.println("이미 폴더가 생성되어 있습니다.");
            }
            // 파일 저장 경로/파일이름
            File file = new File(path2 + path3, saveFileName);
            // 파일 저장
            multi.transferTo(file);

            UpdateRimgRequestDto imgrequest = new UpdateRimgRequestDto(rid, imgid, saveFileName, setpath, imgdyn);
            cateService.updateRimg(imgrequest);
          }
        } catch (Exception e) {
          System.out.println(e);
        }
      }
      em.clear();
      Review reviews = cateService.selectReview(rid);
      return ResponseEntity.status(HttpStatus.CREATED).body(reviews);
    } else {
      em.clear();
      Review reviews = cateService.selectReview(rid);
      return ResponseEntity.status(HttpStatus.CREATED).body(reviews);
    }

  }

  // // 게시판 이미지용?
  // // 현재 시간을 기준으로 파일 이름 생성
  // private String genSaveFileName(String extName) {
  // String fileName = "";

  // Calendar calendar = Calendar.getInstance();
  // fileName += calendar.get(Calendar.YEAR);
  // fileName += calendar.get(Calendar.MONTH);
  // fileName += calendar.get(Calendar.DATE);
  // fileName += calendar.get(Calendar.HOUR);
  // fileName += calendar.get(Calendar.MINUTE);
  // fileName += calendar.get(Calendar.SECOND);
  // fileName += calendar.get(Calendar.MILLISECOND);
  // fileName += extName;

  // return fileName;
  // }
}
