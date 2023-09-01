package org.justdrink.omdb.model;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Comment;
import org.justdrink.omdb.model.dto.board.UpdateBoardRequestDto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@NonNull
@Table(name = "board")
public class Board extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Comment("게시판번호")
  @Column(updatable = false, length = 20)
  private Long bid;

  @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JsonIgnoreProperties({"hibernateLazyInitializer"})
//  @NotNull
  @Comment("사용자 번호")
  @JoinColumn(name = "uid")
  private Members members;

  @JsonManagedReference
  @OneToMany(mappedBy = "board", cascade = CascadeType.PERSIST)
  private List<Comments> comments = new ArrayList<Comments>();

  @JsonManagedReference
  @OneToMany(mappedBy = "board", cascade = CascadeType.PERSIST)
  private List<Files> files = new ArrayList<Files>();

  @Comment("1-공지, 2-자유, 3-맛집")
  @NotNull
  @Column(length=2)
  private int kind;

  @Comment("제목")
  @NotNull
  @Column(length=300)
  private String title;

  @Comment("내용")
  @NotNull
  @Column(length=9999)
  private String content;

  @Comment("조회수")
  @NotNull
  @ColumnDefault("0")
  @Column(length=20)
  private Long hits;

  @Comment("Y-삭제, N-미삭제")
  @NotNull
  @Column(length=4)
  @ColumnDefault("'N'")
  private String dyn;

  public void update(UpdateBoardRequestDto boardRequest) {
    this.kind = boardRequest.getKind();
    this.title = boardRequest.getTitle();
    this.content = boardRequest.getContent();
  }

}