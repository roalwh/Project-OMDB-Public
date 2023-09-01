package org.justdrink.omdb.model.dto.dlike;

import org.justdrink.omdb.model.Dlike;

import lombok.Getter;

@Getter
public class DlikeresponsJimDTO {
    private Long dlid;
    private Long did;
    private String dname;
    private String imgPath;

  public DlikeresponsJimDTO(Dlike dlike){
    this.dlid = dlike.getDlid();
    this.did = dlike.getDrink().getDid();
    this.dname = dlike.getDrink().getName();
    this.imgPath = dlike.getDrink().getDimgs().get(0).getPath();
  }
}
