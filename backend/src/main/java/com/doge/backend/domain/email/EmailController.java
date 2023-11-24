package com.doge.backend.domain.email;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/email")
public class EmailController {
    private final EmailService emailService;

    @PostMapping("send-email")
    public void sendEmail(String email) {
        emailService.sendEmail(email);
    }

    @GetMapping("validate-number")
    public Boolean validateNumber(AuthNumber authNumber) {
        return emailService.validateNumber(authNumber);
    }
}
