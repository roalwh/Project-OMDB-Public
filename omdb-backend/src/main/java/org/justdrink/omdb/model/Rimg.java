package org.justdrink.omdb.model;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Comment;

import com.fasterxml.jackson.annotation.JsonBackReference;

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
@Table(name = "rimg")
public class Rimg extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Comment("이미지 번호")
  @Column(length = 20)
  private Long imgid;
  
  @JsonBackReference
  @NotNull
  @Comment("리뷰 번호")
  @ManyToOne
  @JoinColumn(name = "rid")
  private Review review;
  
  @NotNull
  @Comment("파일이름")
  @Column(length = 1000)
  private String iname;
  
  @NotNull
  @Comment("파일경로")
  @Column(length = 1000)
  private String path;
  
  @NotNull
  @Comment("Y-삭제 N-출력")
  @Column(length=4)
  @ColumnDefault("'N'")

  private String dyn;

}
