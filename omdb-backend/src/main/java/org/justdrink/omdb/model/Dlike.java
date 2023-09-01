package org.justdrink.omdb.model;

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
@Table(name = "dlike")
public class Dlike {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(length = 20)
  @Comment("찜 번호")
  private Long dlid;

  // @JsonBackReference
  @NotNull
  @Comment("술 번호")
  @ManyToOne
  @JoinColumn(name = "did")
  private Drink drink;

  // @JsonBackReference
  @NotNull
  @Comment("회원 번호")
  @ManyToOne
  @JoinColumn(name = "uid")
  private Members members;
}
