package org.justdrink.omdb.service;

import org.justdrink.omdb.repository.RimgRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor // final이 붙거나 @Notnull이 붙은 필드의 생성자 추가
@Service // 빈으로 등록
public class ImgService {

  @Autowired
  RimgRepository rimgRepository;

  




  
}
