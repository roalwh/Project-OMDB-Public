package org.justdrink.omdb.controller;

import java.io.File;
import java.time.LocalDateTime;
import java.util.List;

import org.justdrink.omdb.model.Drink;
import org.justdrink.omdb.model.dto.drink.AddDimgRequestDto;
import org.justdrink.omdb.model.dto.drink.AddDrinkRequestDto;
import org.justdrink.omdb.model.dto.drink.DrinkListResponseDto;
import org.justdrink.omdb.model.dto.drink.UpdateDimgRequestDto;
import org.justdrink.omdb.model.dto.drink.UpdateDrinkRequestDto;
import org.justdrink.omdb.service.DrinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.EntityManager;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/dri")
public class DrinkController {

  @Autowired
  private DrinkService drinkService;

  @Autowired
  EntityManager em;

  @GetMapping("/")
  public String DrinkController() {
    return "The Drink is up running....";
  }

  // ---------------------별도 기본적인 조회----------
  // 전체 글목록 가져오기
  @GetMapping("/all")
  public ResponseEntity<List<DrinkListResponseDto>> findAllDrinks() {
    List<DrinkListResponseDto> drinks = drinkService.findAll()
        .stream()
        .map(DrinkListResponseDto::new)
        .toList();
    return ResponseEntity.ok().body(drinks);
  }

  // 술 상세정보 조건 : 술 번호
  @GetMapping("/{did}")
  public Drink getDrinkinfo(@PathVariable Long did, Model model) {
    Drink drink = drinkService.findByDid(did);
    return drink;
  }

  // 글목록 가져오기 조건 : 이름
  @GetMapping(path = "/search", params = "name")
  public List<Drink> getDrinkNameLike(@RequestParam(value = "name") String name, Model model) {
    List<Drink> drinkList = drinkService.searchNameLike(name);
    return drinkList;
  }

  // 글목록 가져오기 조건 : 지역
  @GetMapping(path = "/search", params = "region")
  public List<Drink> getRegionLike(@RequestParam(value = "region") String region, Model model) {
    List<Drink> drinkList = drinkService.searchRegionLike(region);
    return drinkList;
  }

  // 글목록 가져오기 조건 : 술 종류
  @GetMapping(path = "/search", params = "category")
  public List<Drink> getDnameLike(@RequestParam(value = "category") String category, Model model) {
    List<Drink> drinkList = drinkService.searchDnameLike(category);
    return drinkList;
  }

  // 글목록 가져오기 - 술 종류(1차), 이름(2차) 기준 검색
  @GetMapping(path = "/search", params = { "category", "name" })
  public List<Drink> getDnameToNameLike(@RequestParam(value = "category") String category,
      @RequestParam(value = "name") String name, Model model) {
    List<Drink> drinkList = drinkService.searchDnameTonameLike(category, name);
    return drinkList;
  }

  // 술 등록
  @PostMapping("/drinkIn")
  public ResponseEntity<?> addDrink(
      @RequestParam(value = "files", required = false) MultipartFile files[],
      @RequestParam(value = "orderuid") Long orderuid,
      @RequestParam(value = "name") String name,
      @RequestParam(value = "alc") double alc,
      @RequestParam(value = "ingre") String ingre,
      @RequestParam(value = "maker") String maker,
      @RequestParam(value = "address") String address,
      @RequestParam(value = "region") String region,
      @RequestParam(value = "price") Long price,
      @RequestParam(value = "food", required = false) String food,
      @RequestParam(value = "info") String info,
      @RequestParam(value = "category") String category,
      @RequestParam(value = "sweet", required = false, defaultValue = "0") int sweet,
      @RequestParam(value = "sour", required = false, defaultValue = "0") int sour,
      @RequestParam(value = "cool", required = false, defaultValue = "0") int cool,
      @RequestParam(value = "body", required = false, defaultValue = "0") int body,
      @RequestParam(value = "balance", required = false, defaultValue = "0") int balance,
      @RequestParam(value = "insense", required = false, defaultValue = "0") int insense,
      @RequestParam(value = "throat", required = false, defaultValue = "0") int throat,
      @RequestParam(value = "dyn", required = false, defaultValue = "N") String dyn) {

    // 요청자 권한 확인
    boolean drinkusercheck = drinkService.finduser(orderuid);
    if (!drinkusercheck) {
      return ResponseEntity.badRequest().body("계정이나 권한이 없습니다.");
    }

    AddDrinkRequestDto drinkRequest = new AddDrinkRequestDto(
        name, alc, ingre, maker, address, region, price, food, info, category, sweet, sour, cool, body, balance,
        insense, throat);
    Drink drink = drinkService.addDrink(drinkRequest);
    Long did = drink.getDid();

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
          String saveFileName = "drink_" + did + extName;

          System.out.println("uploadpath : " + uploadpath);
          System.out.println("originFilename : " + originFilename);
          System.out.println("extensionName : " + extName);
          System.out.println("size : " + size);
          System.out.println("saveFileName : " + saveFileName);

          String path2 = System.getProperty("user.dir");
          // 파일 경로 최종
          //윈도우
          // String path3 = "\\src\\main\\resources\\img\\drink" + did + "\\dimg\\";
          // 리눅스
          String path3 = "/src/main/resources/img/drink" + did + "/dimg/";
          System.out.println("Working Directory = " + path2 + path3);

          // 디비 파일 경로
          String setpath = "/dimg/" + did + "/" + saveFileName;

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

            AddDimgRequestDto imgrequest = new AddDimgRequestDto(did, saveFileName, setpath, dyn);

            drinkService.addDimg(imgrequest);
          }
        } catch (Exception e) {
          System.out.println(e);
        }
      }
    }
    em.clear();
    Drink drinks = drinkService.findByDid(did);
    return ResponseEntity.status(HttpStatus.CREATED).body(drinks);
  }

  // 술 수정
  @PutMapping("/drinkedit/{did}")
  public ResponseEntity<?> updateDrink(
      @PathVariable Long did,
      @RequestParam(value = "files", required = false) MultipartFile files[],
      @RequestParam(value = "orderuid") Long orderuid,
      @RequestParam(value = "name", required = false) String name,
      @RequestParam(value = "alc", required = false, defaultValue = "0") Integer alc,
      @RequestParam(value = "ingre", required = false) String ingre,
      @RequestParam(value = "maker", required = false) String maker,
      @RequestParam(value = "address", required = false) String address,
      @RequestParam(value = "region", required = false) String region,
      @RequestParam(value = "price", required = false) Long price,
      @RequestParam(value = "food", required = false) String food,
      @RequestParam(value = "info", required = false) String info,
      @RequestParam(value = "category", required = false) String category,
      @RequestParam(value = "sweet", required = false) Integer sweet,
      @RequestParam(value = "sour", required = false) Integer sour,
      @RequestParam(value = "cool", required = false) Integer cool,
      @RequestParam(value = "body", required = false) Integer body,
      @RequestParam(value = "balance", required = false) Integer balance,
      @RequestParam(value = "insense", required = false) Integer insense,
      @RequestParam(value = "throat", required = false) Integer throat,
      @RequestParam(value = "imgid", required = false) Long imgid,
      @RequestParam(value = "imgdyn", required = false) String imgdyn) {
    // null 값 처리를 위해 맛부분 은 Integer 로 처리

    // 요청자 권한 확인
    boolean drinkusercheck = drinkService.finduser(orderuid);
    if (!drinkusercheck) {
      return ResponseEntity.badRequest().body("계정이나 권한이 없습니다.");
    }
    
    UpdateDrinkRequestDto drinkRequest = new UpdateDrinkRequestDto(
        did, name, alc, ingre, maker, address, region, price, food, info, category, sweet, sour, cool, body, balance,
        insense, throat);
    System.out.println("category :" + category);
    Drink drink = drinkService.updateDrink(drinkRequest);

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
          String saveFileName = "drink_" + did + extName;

          System.out.println("uploadpath : " + uploadpath);
          System.out.println("originFilename : " + originFilename);
          System.out.println("extensionName : " + extName);
          System.out.println("size : " + size);
          System.out.println("saveFileName : " + saveFileName);

          String path2 = System.getProperty("user.dir");
          // 파일 경로 최종
          // String path3 = "\\src\\main\\resources\\img\\drink" + did + "\\dimg\\";
          // 리눅스
          String path3 = "/src/main/img/drink" + did + "/dimg/"; 

          System.out.println("Working Directory = " + path2 + path3);

          // 디비 파일 경로
          String setpath = "/dimg/" + did + "/" + saveFileName;

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

            UpdateDimgRequestDto imgrequest = new UpdateDimgRequestDto(imgid, did, saveFileName, setpath, imgdyn);
            drinkService.updateDimg(imgrequest);
          }
        } catch (Exception e) {
          System.out.println(e);
        }
      }

      // 사진만 변경하여 Y값으로 바꿧을때
      if (imgdyn != null) {
        String saveFileName = null;
        String setpath = null;
        UpdateDimgRequestDto imgrequest = new UpdateDimgRequestDto(imgid, did, saveFileName, setpath, imgdyn);
        drinkService.updateDimg(imgrequest);
      }
    }
    em.clear();
    Drink drinks = drinkService.findByDid(did);
    return ResponseEntity.status(HttpStatus.CREATED).body(drinks);
  }

  // 술 취향 테스트 ------------------------------------------
  @GetMapping(path = "/tasteView", params = { "drinkName", "sweetLow", "sweetHigh", "sourLow", "sourHigh", "coolLow",
      "coolHigh", "bodyLow", "bodyHigh", "insenseLow", "insenseHigh", "alcLow", "alcHigh" })
  public List<Drink> getTasteBetween(@RequestParam("drinkName") String drinkName,
      @RequestParam("sweetLow") Long sweetLow,
      @RequestParam("sweetHigh") Long sweetHigh,
      @RequestParam("sourLow") Long sourLow,
      @RequestParam("sourHigh") Long sourHigh,
      @RequestParam("coolLow") Long coolLow,
      @RequestParam("coolHigh") Long coolHigh,
      @RequestParam("bodyLow") Long bodyLow,
      @RequestParam("bodyHigh") Long bodyHigh,
      @RequestParam("insenseLow") Long insenseLow,
      @RequestParam("insenseHigh") Long insenseHigh,
      @RequestParam("alcLow") double alcLow,
      @RequestParam("alcHigh") double alcHigh, Model model) {
    List<Drink> drinkList = drinkService.searchTasteBetween(drinkName, sweetLow, sweetHigh, sourLow, sourHigh, coolLow,
        coolHigh, bodyLow, bodyHigh, insenseLow, insenseHigh, alcLow, alcHigh);
    return drinkList;
  }

}