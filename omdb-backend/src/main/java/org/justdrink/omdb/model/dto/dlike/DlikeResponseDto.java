package org.justdrink.omdb.model.dto.dlike;

import lombok.Getter;
import org.justdrink.omdb.model.Dlike;
import org.justdrink.omdb.model.Drink;
import org.justdrink.omdb.model.Members;

@Getter
public class DlikeResponseDto {
    private Long dlid;
    private Drink drink;

    public DlikeResponseDto(Dlike dlike){
      this.dlid = dlike.getDlid();
      this.drink = dlike.getDrink();
    }
}
