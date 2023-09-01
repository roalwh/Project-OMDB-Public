package org.justdrink.omdb.model.dto.cate;

import org.justdrink.omdb.model.Drink;
import org.justdrink.omdb.model.Members;
import org.justdrink.omdb.model.Review;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor //기본 생성자 추가
@AllArgsConstructor
@Getter
@Setter
public class AddReviewRequestDto {
  
  // 필요 Review 컬럼
  private Long drinkId;
  private Long memberId;
  private String title;
  private String content;
  private Long score;
  private String dyn;

  public Review toEntityReview(Drink drink,Members members){
    return Review.builder()
    .drink(drink)
    .members(members) 
    .title(title)
    .content(content)
    .score(score)
    .dyn(dyn)
    .build();
  }
}
