package org.justdrink.omdb.model.dto.cate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UpdateReviewRequestDto {
  private Long rid;
  private String title;
  private String content;
  private Long score;
  private String reviewdyn;
}
