package org.justdrink.omdb.model.dto.cate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UpdateRimgRequestDto {
  private Long rid;
  private Long imgid;
  private String iname;
  private String path;
  private String dyn;
}
