package org.justdrink.omdb.model.dto.drink;

import java.time.LocalDateTime;

import org.justdrink.omdb.model.BaseEntity;
import org.justdrink.omdb.model.Rimg;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.EntityListeners;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor //기본 생성자 추가
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Getter

public class UpdateDimgRequestDto extends BaseEntity{
    //Dimg
    private Long imgid;
    private Long did;
    private String iname;
    private String path;
    private String dyn;
}
