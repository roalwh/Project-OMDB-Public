package org.justdrink.omdb.model.dto.cate;

import java.time.LocalDateTime;
import java.util.List;

import org.justdrink.omdb.model.Drink;
import org.justdrink.omdb.model.Members;
import org.justdrink.omdb.model.Review;
import org.justdrink.omdb.model.Rimg;
import org.justdrink.omdb.model.enums.Authority;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewResponseDto {
  private Long rid;
  private Long score; // 평가
  private String title; // 제목
  private String content; // 리뷰
  @JsonFormat(pattern = "yyyy.MM.dd", timezone = "Asia/Seoul")
  private LocalDateTime cdatetime; // 리뷰 작성일
  private String dyn;
  private String rimg;
  private String iname;
  private Long imgid;
  private String imgdyn;
//  private List<Rimg> rimg;
  
  private Long did;
  private String drinkcate; // 분류
  private String drinkname; // 술이름

  private Long uid;
  private String username;
  private String nick;
  private String email;
  private Double scoreavg;
  private Authority authority;
  

  public ReviewResponseDto(Review review){
    this.rid = review.getRid();
    this.title = review.getTitle();
    this.content = review.getContent();
    this.score = review.getScore();
//    this.rimg = review.getRimg();
    if(review.getRimg().size()!=0){
      this.imgid = review.getRimg().get(0).getImgid();
      this.iname = review.getRimg().get(0).getIname();
      this.rimg = review.getRimg().get(0).getPath();
      this.imgdyn = review.getRimg().get(0).getDyn();
    }else{
      this.rimg = "rimg/0/0/review_0_0.jpg";
    }


    this.dyn = review.getDyn();
    this.cdatetime = review.getCdatetime();

    this.did = review.getDrink().getDid();
    this.drinkcate = review.getDrink().getDesclist().getDname();
    this.drinkname = review.getDrink().getName();

    this.uid = review.getMembers().getUid();
    this.username = review.getMembers().getName();
    this.nick = review.getMembers().getNick();
    this.email = review.getMembers().getEmail();
    this.authority = review.getMembers().getAuthority();
  }

  public static ReviewResponseDto my(Review review){
    return ReviewResponseDto.builder()
            .did(review.getDrink().getDid())
            .drinkcate(review.getDrink().getDesclist().getDrename())
            .drinkname(review.getDrink().getName())
            .score(review.getScore())
            .title(review.getTitle())
            .content(review.getContent())
            .cdatetime(review.getCdatetime())
            .build();
  }


}

