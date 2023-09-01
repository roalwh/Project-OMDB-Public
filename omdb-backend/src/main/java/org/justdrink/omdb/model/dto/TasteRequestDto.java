package org.justdrink.omdb.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class TasteRequestDto {
    private String drinkName;
    private Long sweetLow;
    private Long sweetHigh;
    private Long sourLow;
    private Long sourHigh;
    private Long coolLow;
    private Long coolHigh;
    private Long bodyLow;
    private Long bodyHigh;
    private Long insenseLow;
    private Long insenseHigh;
    private double alcLow;
    private double alcHigh;
}
