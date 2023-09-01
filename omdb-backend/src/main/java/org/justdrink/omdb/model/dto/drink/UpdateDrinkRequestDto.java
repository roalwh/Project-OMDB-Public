package org.justdrink.omdb.model.dto.drink;

import org.justdrink.omdb.model.BaseEntity;
import org.justdrink.omdb.model.Desclist;
import org.justdrink.omdb.model.Dimg;
import org.justdrink.omdb.model.Drink;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor //기본 생성자 추가
@AllArgsConstructor
@Getter
public class UpdateDrinkRequestDto{
  
  //dirnk 
  private Long did;
  private String name;
  private Integer alc;
  private String ingre;
  private String maker;
  private String address;
  private String region;
  private Long price;
  private String food;
  private String info;
  private String category;
  private Integer sweet;
  private Integer sour;
  private Integer cool;
  private Integer body;
  private Integer balance;
  private Integer insense;
  private Integer throat;

}
