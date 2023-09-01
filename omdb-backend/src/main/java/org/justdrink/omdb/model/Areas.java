package org.justdrink.omdb.model;

import org.hibernate.annotations.Comment;

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
import lombok.NonNull;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@NonNull

@Table(name = "areas")
public class Areas{
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Comment("지역번호")
  @Column(updatable = false, length = 20)
  Long araid;

  @Comment("지역1차")
  @NotNull
  @Column(length = 50)
  String region1;

  @NotNull
  @Comment("지역2차")
  @Column(length = 50)
  String region2;
  
}
