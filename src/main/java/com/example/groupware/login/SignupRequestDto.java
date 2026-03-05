package com.example.groupware.login;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequestDto {
    private String userId;
    private String name;
    private String password;
}
