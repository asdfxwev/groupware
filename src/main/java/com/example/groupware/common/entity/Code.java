package com.example.groupware.common.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "code")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Code {

    @Id
    @Column(name = "code_id")
    private String codeId;

    @Column(name = "code_nm")
    private String codeNm;

    @Column(name = "code_type")
    private String codeType;

}
