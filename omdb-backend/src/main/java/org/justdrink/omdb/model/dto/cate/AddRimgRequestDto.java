package org.justdrink.omdb.model.dto.cate;

import org.justdrink.omdb.model.Review;
import org.justdrink.omdb.model.Rimg;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AddRimgRequestDto {
  private Long rid;
  private String iname;
  private String path;
  private String dyn;

  public Rimg toEntityReview(Review review) {
    return Rimg.builder()
        .review(review)
        .iname(iname)
        .path(path)
        .dyn(dyn)
        .build();
  }

}
