package org.justdrink.omdb.model;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Comment;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.annotation.Nonnull;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.justdrink.omdb.model.dto.board.UpdateCommentRequestDto;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Nonnull
@Table(name = "comments")
public class Comments extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Comment("댓글번호")
  @Column(length=20)
  private Long cid;
  
  @JsonBackReference
  @NotNull
  @ManyToOne(fetch = FetchType.LAZY)
  @Comment("회원번호")
  @JoinColumn(name = "uid")
  private  Members members;
  
  @JsonBackReference
  @NotNull
//  @ManyToOne(fetch = FetchType.LAZY)
  @ManyToOne(cascade = CascadeType.PERSIST)
  @Comment("게시판번호")
  @JoinColumn(name = "bid")
  private Board board;
  
  @NotNull
  @Comment("댓글내용")
  @Column(length=2000)
  private String content;
  
  @NotNull
  @ColumnDefault("'N'")
  @Comment("Y-삭제, N-미삭제")
  @Column(length=4)
  private String dyn;

  public void update(UpdateCommentRequestDto requestDto) {
    this.content = requestDto.getContent();
  }

}
