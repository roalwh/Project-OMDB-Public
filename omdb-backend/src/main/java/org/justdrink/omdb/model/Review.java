package org.justdrink.omdb.model;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Comment;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.annotation.Nullable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
@Table(name = "review")
public class Review extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Comment("리뷰 번호")
  @Column(length = 20)
  private Long rid;

  @JsonBackReference
  @NotNull
  @Comment("술 번호")
  @ManyToOne
  @JoinColumn(name = "did")
  private Drink drink;

  @JsonBackReference
  @NotNull
  @Comment("회원 번호")
  @ManyToOne
  @JoinColumn(name = "uid")
  private Members members;

  @NotNull
  @Comment("리뷰제목")
  @Column(length = 5000)
  @Nullable
  private String title;

  @NotNull
  @Comment("내용")
  @Column(length = 5000)
  @Nullable
  private String content;

  @NotNull
  @Comment("평점")
  @Nullable
  private Long score;

  @NotNull
  @Comment("Y-삭제, N-미삭제")
  @Column(length=4)
  @ColumnDefault("'N'")
  private String dyn;

  @JsonManagedReference
  @OneToMany(mappedBy = "review")
  private List<Rimg> rimg = new ArrayList<Rimg>();

  public void update(String content, String dyn) {
    this.content = content;
    this.dyn = dyn;
  }
}
