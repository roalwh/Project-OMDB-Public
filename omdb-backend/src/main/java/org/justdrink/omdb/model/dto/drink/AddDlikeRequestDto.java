package org.justdrink.omdb.model.dto.drink;

import jakarta.annotation.Nonnull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.justdrink.omdb.model.Dlike;
import org.justdrink.omdb.model.Drink;
import org.justdrink.omdb.model.Members;

@AllArgsConstructor
@NoArgsConstructor(force = true)
@Getter
@Setter
public class AddDlikeRequestDto {

    private Long uid;  // 유저 아이디

    private Long did;  // 술 고유 아이디
    
    public Dlike toEntityDlike(Members member, Drink drink) {
        return Dlike.builder()
                .members(member)
                .drink(drink)
                .build();
    }


}
