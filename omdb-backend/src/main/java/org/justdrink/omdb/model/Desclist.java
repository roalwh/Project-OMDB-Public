package org.justdrink.omdb.model;

import org.hibernate.annotations.Comment;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Nonnull
@Table(name = "desclist")
public class Desclist {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Comment("매핑번호")
  @Column(length = 20)
  private Long descid;

  @NotNull
  @Comment("코드값")
  @Column(length = 50, unique=true)
  private String dname;

  @NotNull
  @Comment("반환값")
  @Column(length = 50)
  private String drename;

}
