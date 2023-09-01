package org.justdrink.omdb.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.Comment;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.annotation.Nonnull;
import jakarta.annotation.Nullable;
import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PreUpdate;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@MappedSuperclass
@Nonnull
@EntityListeners(value = {AuditingEntityListener.class})
public class BaseEntity {

    @CreatedDate
    @Comment("생성일")
    @NotNull
    @Column(updatable = false,columnDefinition="DATETIME(0)")
    @JsonFormat(pattern = "yyyy.MM.dd hh:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime cdatetime;

    @LastModifiedDate
    @Nullable
    @Comment("수정일")
    @Column(columnDefinition="DATETIME(0)")
    @JsonFormat(pattern = "yyyy.MM.dd hh:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime udatetime;

    public void setudatetime(LocalDateTime udatetime){
        this.udatetime = udatetime;
        
    }

}
