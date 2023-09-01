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
@Table(name = "files")
public class Files {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Comment("파일 번호")
  @Column(length = 20)
  private Long fid;

  @JsonBackReference
  @NotNull
  @Comment("게시글번호")
  @ManyToOne
  @JoinColumn(name = "bid", referencedColumnName="bid" )
  private Board board;

  @NotNull
  @Comment("파일 이름")
  @Column(length = 1000)
  private String orgname;

  @NotNull
  @Comment("저장파일 이름")
  @Column(length = 1000)
  private String savename;

  @NotNull
  @Comment("파일경로")
  @Column(length = 1000)
  private String path;

  @NotNull
  @Comment("Y-삭제, N-미삭제")
  @Column(length=4)
  @ColumnDefault("'N'")
  private String dyn;
}
