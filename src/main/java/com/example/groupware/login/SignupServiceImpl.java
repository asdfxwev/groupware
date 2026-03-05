package com.example.groupware.login;

import com.example.groupware.login.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SignupServiceImpl implements SignupService {

    private final LoginRepository loginRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void signup(SignupRequestDto request) {
        if (loginRepository.existsByUserId(request.getUserId())) {
            throw new IllegalArgumentException("이미 사용 중인 아이디입니다.");
        }

        User user = User.builder()
                .userId(request.getUserId())
                .name(request.getName())
                .password(passwordEncoder.encode(request.getPassword()))
                .roleCd("USER")
                .useYn("Y")
                .build();

        loginRepository.save(user);
    }
}
