package org.justdrink.omdb.model.dto.drink;

import org.justdrink.omdb.model.Desclist;
import org.justdrink.omdb.model.Dimg;
import org.justdrink.omdb.model.Drink;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor //기본 생성자 추가
@AllArgsConstructor
@Getter
public class AddDrinkRequestDto {
  
  //dirnk 
  private String name;
  private double alc;
  private String ingre;
  private String maker;
  private String address;
  private String region;
  private Long price;
  private String food;
  private String info;
  private String category;
  private int sweet;
  private int sour;
  private int cool;
  private int body;
  private int balance;
  private int insense;
  private int throat;


  // drink 엔티티
  public Drink toEntityDrink(Desclist desclist){
    return Drink.builder()
          .name(name)
          .alc(alc)
          .ingre(ingre)
          .maker(maker)
          .address(address)
          .region(region)
          .price(price)
          .food(food)
          .info(info)
          .desclist(desclist)
          .sweet(sweet)
          .sour(sour)
          .cool(cool)
          .body(body)
          .balance(balance)
          .insense(insense)
          .throat(throat)
          .build();
  }

}
