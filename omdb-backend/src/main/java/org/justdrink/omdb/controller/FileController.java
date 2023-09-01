package org.justdrink.omdb.controller;

import java.util.*;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

import lombok.RequiredArgsConstructor;
import org.justdrink.omdb.service.FileService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class FileController {
    private final FileService fileService;

    @GetMapping(value = "/board/files/{bid}" , produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> returnFiles(@PathVariable Long bid) {
        String path1 = System.getProperty("user.dir");
        //윈도우
//         String path2 = "\\src\\main\\resources\\files\\board\\board_" + bid + "\\";
        //리눅스
        String path2 =  "/src/main/resources/files/board/board_" + bid + "/";
        System.out.println(path1 + path2);
        List<String> filesName = fileService.findFilesName(bid);   // String filePath = fileService.findFilesPath(bid);  // 게시판 bid 로 파일 저장된 이름 가져오기

        File file = new File(path1 + path2 + filesName.get(0));

        //저장된 이미지파일의 이진데이터 형식을 구함
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



