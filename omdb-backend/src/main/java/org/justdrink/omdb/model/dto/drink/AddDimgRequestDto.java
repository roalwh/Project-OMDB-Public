package org.justdrink.omdb.model.dto.drink;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import org.justdrink.omdb.model.BaseEntity;
import org.justdrink.omdb.model.Dimg;
import org.justdrink.omdb.model.Drink;

@NoArgsConstructor //기본 생성자 추가
@AllArgsConstructor
@Getter


public class AddDimgRequestDto extends BaseEntity{
    //Dimg
    private Long did;
    private String iname;
    private String path;
    private String dyn;


    //이미지 정보
    public Dimg toEntityDimg (Drink drink){
        return Dimg.builder()
                .drink(drink)
                .iname(iname)
                .path(path)
                .dyn(dyn)
                .build();
    }
}
