package org.justdrink.omdb.model.dto.admin;

import java.util.List;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
public class ListDto {
  @NotNull
  private Long uid;
  @NotNull
  private String userid;
  // List<ListDto> ListDto;
}
