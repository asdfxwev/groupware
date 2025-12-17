package com.example.groupware.login.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class User {

    @Id
    @Column(name = "user_id", length = 50)
    private String userId;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "eng_name", length = 100)
    private String engName;

    @Column(name = "birthday")
    private LocalDate birthday;

    @Column(name = "role_cd", length = 20)
    private String roleCd;

    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @Column(name = "cre_dt", updatable = false)
    private LocalDateTime creDt;

    @Column(name = "modi_dt")
    private LocalDateTime modiDt;

    @Column(name = "depart_cd", length = 20)
    private String departCd;

    @Column(name = "usr_valid_dt")
    private LocalDate usrValidDt;

    @Column(name = "phone_num", length = 20)
    private String phoneNum;

    @Column(name = "password_valid_dt")
    private LocalDate passwordValidDt;

    @Column(name = "use_yn", length = 1)
    @Builder.Default
    private String useYn = "Y";

    @Column(name = "login_no")
    @Builder.Default
    private Integer loginNo = 0;

    @Column(name = "last_login_dt")
    private LocalDateTime lastLoginDt;

    // 생성/수정 시간 자동 설정
    @PrePersist
    protected void onCreate() {
        this.creDt = LocalDateTime.now();
        this.modiDt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.modiDt = LocalDateTime.now();
    }

    // 비즈니스 메서드
    public void updateLoginInfo() {
        this.loginNo++;
        this.lastLoginDt = LocalDateTime.now();
    }

    public void changePassword(String newPassword) {
        this.password = newPassword;
        this.passwordValidDt = LocalDate.now().plusDays(90); // 90일 유효
    }

    public void deactivate() {
        this.useYn = "N";
    }
}
