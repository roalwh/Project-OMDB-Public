package org.justdrink.omdb.model.dto.admin;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.justdrink.omdb.model.Members;
import org.justdrink.omdb.model.dto.member.MemberResponseDto;
import org.justdrink.omdb.model.dto.member.MemberSignupRequestDto;
import org.justdrink.omdb.model.enums.Authority;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdminSignupRequestDto {
    @NotBlank(message = "아이디를 입력해주세요")
    private String id;

    @NotBlank(message = "비밀번호를 입력해주세요")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,20}$", message = "비밀번호는 8~20 자리이면서 1개 이상의 알파벳, 숫자, 특수문자를 포함해야합니다.")
    private String password;

    @NotBlank(message = "닉네임을 입력해주세요.")
    private String nick;

    @NotBlank(message = "이름을 입력해주세요.")
    private String name;

    @NotBlank(message = "이메일을 입력해주세요.")
    @Email(message = "이메일 형식에 맞지 않습니다.")
    private String email;

    private String phone;
    private String address;
    private int gender;

    private String birth;

    public Members toMember(PasswordEncoder passwordEncoder) {

        System.out.println("toMember");
        return Members.builder()
                .id(id)
                .password(passwordEncoder.encode(password))
                .nick(nick)
                .name(name)
                .email(email)
                .phone(phone)
                .address(address)
                .gender(gender)
                .birth(birth)
                .authority(Authority.ROLE_ADMIN)
                .build();
    }

    public MemberResponseDto toMemberResponseDto(AdminSignupRequestDto memberRequestDto) {
        System.out.println("toMemberResponseDto");
        return MemberResponseDto.builder()
                .id(id)
                .nick(nick)
                .build();
    }

    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(id, password);
    }
}
