package com.example.groupware.login;

import com.example.groupware.login.entity.User;

import java.util.Optional;

public interface LoginRepository {
    Optional<User> findByUserId(String userId);
    boolean existsByUserId(String userId);
    User save(User user);
}
