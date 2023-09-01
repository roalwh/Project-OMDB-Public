package org.justdrink.omdb.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

import org.justdrink.omdb.service.ImgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
// @RequestMapping("/img")
public class ImgController {

  @Autowired
  ImgService imgService;

  // 리뷰 이미지 가져오기
  @GetMapping(value = "/rimg/{drinkid}/{rid}/{iname}")
  public ResponseEntity<?> returnImage(@PathVariable Long drinkid, @PathVariable Long rid, @PathVariable String iname) {
    String path1 = System.getProperty("user.dir");

    // 윈도우
    // String path2 = "\\src\\main\\resources\\img\\drink" + drinkid + "\\rimg" +
    // rid + "\\";

    // 리눅스
    String path2 = "/src/main/resources/img/drink" + drinkid + "/rimg" + rid + "/";

    System.out.println(path1 + path2 + iname);

    File file = new File("");
    File file1 = new File(path1 + path2 + iname);
    // 윈도우
    // File file2 = new File(path1 + "\\src\\main\\resources\\mainLogo.png");
    // 리눅스
    File file2 = new File(path1 + "/src/main/resources/mainLogo.png");

    if (file1.exists()) {
      file = file1;
    } else {
      file = file2;
    }

    // 저장된 이미지파일의 이진데이터 형식을 구함
    byte[] result = null;
    ResponseEntity<byte[]> entity = null;
    try {
      result = FileCopyUtils.copyToByteArray(file);

      // 2. header
      HttpHeaders header = new HttpHeaders();
      header.add("Content-type", Files.probeContentType(file.toPath())); // 파일의 컨텐츠타입을 직접 구해서 header에 저장

      // 3. 응답본문
      entity = new ResponseEntity<>(result, header, HttpStatus.OK);// 데이터, 헤더, 상태값
    } catch (IOException e) {
      e.printStackTrace();
    }

    return entity;
  }

  // 술 정보 사진 가져오기
  @GetMapping(value = "/dimg/{drinkid}/{iname}")
  public ResponseEntity<?> returnImage(@PathVariable String drinkid, @PathVariable String iname) {
    String path1 = System.getProperty("user.dir");
    //윈도우
    // String path2 = "\\src\\main\\resources\\img\\drink" + drinkid + "\\dimg\\"; // 이미지가 저장된 위치

    //리눅스
    String path2 = "/src/main/resources/img/drink" + drinkid + "/dimg/"; // 이미지가 저장된 위치

    File file = new File("");
    File file1 = new File(path1 + path2 + iname);
    // 윈도우
    // File file2 = new File(path1 + "\\src\\main\\resources\\mainLogo.png");
    //리눅스
    File file2 = new File(path1 + "/src/main/resources/mainLogo.png");

    if (file1.exists()) {
      file = file1;
    } else {
      file = file2;
    }

    byte[] result = null;
    ResponseEntity<byte[]> entity = null;
    try {
      result = FileCopyUtils.copyToByteArray(file);

      // 2. header
      HttpHeaders header = new HttpHeaders();
      header.add("Content-type", Files.probeContentType(file.toPath())); // 파일의 컨텐츠타입을 직접 구해서 header에 저장

      // 3. 응답본문
      entity = new ResponseEntity<>(result, header, HttpStatus.OK);// 데이터, 헤더, 상태값
    } catch (IOException e) {
      e.printStackTrace();
    }

    return entity;
  }
}
