package org.justdrink.omdb.model;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Comment;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.annotation.Nullable;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
@Table(name = "drink")
public class Drink {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(length = 20)
  @Comment("술 번호")
  private Long did;

  @NotNull
  @Comment("술 이름")
  @Column(length = 100)
  private String name;

  @NotNull
  @Comment("술 도수")
  @Column()
  private double alc;

  @Comment("술 재료")
  @Column(length = 1000)
  private String ingre;

  @NotNull
  @Comment("술 제조사/회사/상호명")
  @Column(length = 300)
  private String maker;

  @NotNull
  @Comment("생산지")
  @Column(length = 500)
  private String address;

  @NotNull
  @Comment("지역 구분/ ~~구까지")
  @Column(length = 500)
  private String region;

  @Comment("술 가격")
  @Column(length = 20)
  @ColumnDefault("0")
  private Long price;

  @Comment("어울리는 안주")
  @Nullable
  @Column(length = 5000)
  private String food;

  @NotNull
  @Comment("술 정보")
  @Column(length = 6000)
  private String info;

  @NotNull
  @Comment("TAK-탁주/막걸리, CHE-약주/청주, WIN-과실주/와인, SPI-증류주/소주/리큐르, ETC-기타주류")
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "category", referencedColumnName = "dname")
  private Desclist desclist;

  @NotNull
  @Comment("단맛")
  @Column(length = 2)
  @ColumnDefault("0")
  private int sweet;

  @NotNull
  @Comment("신맛")
  @Column(length = 2)
  @ColumnDefault("0")
  private int sour;
  
  @NotNull
  @Comment("청량감")
  @Column(length = 2)
  @ColumnDefault("0")
  private int cool;
  
  @NotNull
  @Comment("바디감")
  @Column(length = 2)
  @ColumnDefault("0")
  private int body;
  
  @NotNull
  @Comment("밸런스")
  @Column(length = 2)
  @ColumnDefault("0")
  private int balance;
  
  @NotNull
  @Comment("향기")
  @Column(length = 2)
  @ColumnDefault("0")
  private int insense;
  
  @NotNull
  @Comment("목넘김")
  @Column(length = 2)
  @ColumnDefault("0")
  private int throat;

  @JsonManagedReference
  @OneToMany(mappedBy = "drink", cascade = CascadeType.PERSIST)
  private List<Dimg> dimgs = new ArrayList<Dimg>();

  // @JsonManagedReference
  // @OneToMany(mappedBy = "drink", cascade = CascadeType.PERSIST)
  // private List<Dlike> dlikes = new ArrayList<Dlike>();

}
