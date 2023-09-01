package org.justdrink.omdb.model.dto.admin;

import lombok.Getter;
import org.justdrink.omdb.model.Areas;

@Getter
public class AreaSelectResponseDto {

    private Long araid;
    private String region1;
    private String region2;


    public AreaSelectResponseDto(Areas areas) {
        this.araid = areas.getAraid();
        this.region1 = areas.getRegion1();
        this.region2 = areas.getRegion2();
    }
}

