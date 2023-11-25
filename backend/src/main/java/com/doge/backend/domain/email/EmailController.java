package com.doge.backend.domain.email;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/email")
public class EmailController {
    private final EmailService emailService;

    @PostMapping("/send-email")
    public void sendEmail(@RequestBody AuthNumber email) {
        emailService.sendEmail(email.getAuthEmail());
    }

    @PostMapping("/validate-number")
    public void validateNumber(@RequestBody AuthNumber authNumber) {
        emailService.validateNumber(authNumber);
    }
}
