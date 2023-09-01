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
@Table(name="clike")
public class Clike {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Comment("좋아요 번호")
  @Column(length=20)
  private Long rlid;
  
  @JsonBackReference
  @NotNull
  @Comment("댓글 번호")
  @ManyToOne
  @JoinColumn(name = "cid")
  private Comments comments;
  
  @JsonBackReference
  @NotNull
  @Comment("회원 번호")
  @ManyToOne
  @JoinColumn(name = "uid")
  private Members members;

}
