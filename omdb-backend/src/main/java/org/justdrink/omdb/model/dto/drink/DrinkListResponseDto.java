package org.justdrink.omdb.model.dto.drink;

import org.justdrink.omdb.model.Desclist;
import org.justdrink.omdb.model.Drink;

import lombok.Getter;

@Getter
public class DrinkListResponseDto {
  private final Long id;
  private final String name;
  private final double alc;
  private final String ingre;
  private final String maker;
  private final String address;
  private final String region;
  private final Long price;
  private final String food;
  private final String info;
  private final Desclist desclist;

  public DrinkListResponseDto(Drink drink) {
    this.id = drink.getDid();
    this.name = drink.getName();
    this.alc = drink.getAlc();
    this.ingre = drink.getIngre();
    this.maker = drink.getMaker();
    this.address = drink.getAddress();
    this.region = drink.getRegion();
    this.price = drink.getPrice();
    this.food = drink.getFood();
    this.info = drink.getInfo();
    this.desclist = drink.getDesclist();
  }

}
