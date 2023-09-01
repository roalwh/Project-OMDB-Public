package org.justdrink.omdb.model.dto.member;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UpdateMemberRequestDto {

    private Long uid;
    private String id;
    private String nick;
    private String name;
    private String email;
    private String phone;
    private String address;


}
