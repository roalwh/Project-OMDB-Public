package org.justdrink.omdb.model;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Comment;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;



@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@NonNull
@Table(name="dimg")
public class Dimg extends BaseEntity{
  // 술 이미지
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Comment("술 이미지 번호")
  @Column(length=20)
  private Long imgid;

  @JsonBackReference
  @NotNull
  @Comment("술번호")
  @ManyToOne(cascade = CascadeType.PERSIST)
  @JoinColumn(name = "did")
  private Drink drink;

  @NotNull
  @Comment("이미지 이름")
  @Column(length=1000)
  private String iname;

  @NotNull
  @Comment("이미지 경로")
  @Column(length=1000)
  private String path;

  @NotNull
  @Comment("Y-삭제, N-미삭제")
  @Column(length=4)
  @ColumnDefault("'N'")
  private String dyn;

}
