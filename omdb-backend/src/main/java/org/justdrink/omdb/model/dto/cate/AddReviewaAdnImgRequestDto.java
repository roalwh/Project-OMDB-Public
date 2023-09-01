package org.justdrink.omdb.model.dto.cate;

import org.justdrink.omdb.model.Drink;
import org.justdrink.omdb.model.Members;
import org.justdrink.omdb.model.Review;
import org.justdrink.omdb.model.Rimg;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor //기본 생성자 추가
@AllArgsConstructor
@Getter
@Setter
public class AddReviewaAdnImgRequestDto {
  
  // 필요 Review 컬럼
  private Long drinkId;
  private Long memberId;
  private String content;
  private Long score;
  private String dyn;
  // 필요 Rimg 컬럼
  private Long rid;
  private String iname;
  private String path;
  

  public Review toEntityReview(Drink drink,Members members){
    return Review.builder()
    .content(content)
    .score(score)
    .drink(drink)
    .members(members) 
    .dyn(dyn)
    .build();
  }
  public Rimg toEntityRimg(Review review){
    return Rimg.builder()
    .review(review)
    .iname(iname)
    .path(path)
    .dyn(dyn)
    .build();
  }
}
