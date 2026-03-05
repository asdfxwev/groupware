package com.example.groupware.login;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class LoginController {

    private final LoginRepository loginRepository;

    @GetMapping("/me")
    public ResponseEntity<?> getMe(@AuthenticationPrincipal UserDetails userDetails) {
        return loginRepository.findByUserId(userDetails.getUsername())
                .map(user -> ResponseEntity.ok(Map.of(
                        "userId", user.getUserId(),
                        "name", user.getName()
                )))
                .orElse(ResponseEntity.notFound().build());
    }
}
