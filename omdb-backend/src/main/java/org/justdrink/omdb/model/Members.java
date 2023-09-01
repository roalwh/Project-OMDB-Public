package org.justdrink.omdb.model;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Comment;
import org.justdrink.omdb.model.enums.Authority;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor(force = true)
@AllArgsConstructor
@Builder
@ToString
@NonNull
@Table(name = "members")
public class Members extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(length = 50)
    @Comment("회원 번호")
    private Long uid;

//    @NotNull
    @Comment("아이디")
    @Column(length = 100, unique = true)
    private String id;

//    @NotNull
    @Comment("비밀번호")
    @Column(length = 100)
    private String password;

//    @NotNull
    @Comment("이름")
    @Column(length = 50)
    private String name;

//    @NotNull
    @Comment("닉네임,별명")
    @Column(length = 50)
    private String nick;

//    @NotNull
    @Comment("이메일")
    @Column(length = 100)
    private String email;

//    @NotNull
    @Comment("성별 1-남자 2-여자 3-기타")
    @ColumnDefault("3")
    @Column(length = 2)
    private int gender;

//    @NotNull
    @Column(length = 50)
    @Comment("생년월일")
    private String birth;

//    @NotNull
    @Comment("휴대폰 번호")
    @Column(length = 100)
    private String phone;

    @Comment("주소")
    @Column(length = 200)
    private String address;

//    @NotNull
    @Comment("회원 상태 플래그 0-정상, 1- 정지, 2-탈퇴")
    @ColumnDefault("0")
    @Column(length = 2)
    private int userflag;

    @Column(length = 1000)
    @Comment("토큰 발급자")
    private String provider;

    @Column(length = 2000)
    @Comment("사용자 토큰값")
    private String accessToken;

    @Column(length = 2)
    @Comment("토큰 만료 시간")
    private Long accessTokenExpireIn;

    @Enumerated(EnumType.STRING)
//    @NotNull
    @ColumnDefault("ROLE_USER")
    @Comment("관리자 플래그 ROLE_USER-일반, ROLE_ADMIN-관리자")
    private Authority authority;

    @JsonManagedReference
    @OneToMany(mappedBy = "members")
    private List<Comments> comments = new ArrayList<Comments>();
    

    public Members update(
            String nick,
            String email) {
        this.nick = nick;
        this.email = email;
        return this;
    }

    /** 회원정보 수정 */
    public void updateMember(Long uid, String nick, String name, String email, String phone, String address) {
        this.uid = uid;
        if (nick != null)
            this.nick = nick;
        if (name != null)
            this.name = name;
        if (email != null)
            this.email = email;
        if (phone != null)
            this.phone = phone;
        if (address != null)
            this.address = address;
    }

    /** 비밀번호 변경 */
    public void updatePassword(
            String password) {
        this.password = password;
    }

    
    /** 회원 상태 플래그 0-정상, 1- 정지, 2-탈퇴 */
    public void updateUserState(int flag) {
        this.userflag = flag;
    }

    /** accessToken 발급 */
    public Members update(
            // String name,
            String accessToken,
            Long accessTokenExpireIn,
            String email) {
        // this.name = name;
        this.accessToken = accessToken;
        this.accessTokenExpireIn = accessTokenExpireIn;
        this.email = email;
        return this;
    }
}
