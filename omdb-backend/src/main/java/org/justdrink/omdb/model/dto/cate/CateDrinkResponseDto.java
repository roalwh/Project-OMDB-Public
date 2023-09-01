package org.justdrink.omdb.model.dto.cate;

import java.util.List;

import org.justdrink.omdb.model.Desclist;
import org.justdrink.omdb.model.Dimg;
import org.justdrink.omdb.model.Drink;

import lombok.Getter;

@Getter
public class CateDrinkResponseDto {
  private final Long id;
  private final String name;
  private final Desclist desclist;

  private final Long imgid;
  private final String iname;
  private final String path;
  private final String imgDyn;

  public CateDrinkResponseDto(Drink drink) {
    this.id = drink.getDid();
    this.name = drink.getName();
    this.desclist = drink.getDesclist();
    if (drink.getDimgs().size() != 0) {
      this.imgid = drink.getDimgs().get(0).getImgid();
      this.iname = drink.getDimgs().get(0).getIname();
      this.path = drink.getDimgs().get(0).getPath();
      this.imgDyn = drink.getDimgs().get(0).getDyn();
    }else{
      this.imgid = null;
      this.iname = null;
      this.path = null;
      this.imgDyn = null;
    }

  }
}
