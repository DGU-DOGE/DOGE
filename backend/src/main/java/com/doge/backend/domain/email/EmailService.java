package com.doge.backend.domain.email;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender emailSender;
    private final EmailRepository emailRepository;

    public void sendEmail(String email) {
        if (emailRepository.existsByAuthEmail(email)) {
            emailRepository.deleteById(emailRepository.findByAuthEmail(email).getAuthId());
        }

        Random random = new Random();
        int keyValue = random.nextInt(899999) + 100000;
        long nowTime = System.currentTimeMillis();

        AuthNumber authNumber = AuthNumber.builder()
                .authEmail(email)
                .authNumber(keyValue)
                .createdAt(nowTime)
                .build();
        emailRepository.save(authNumber);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("donggukdoze@gmail.com");
        message.setTo(email);
        message.setSubject("도지 인증 번호");
        message.setText("인증 번호는 " + keyValue + "입니다.");
        emailSender.send(message);
    }

    public void validateNumber(AuthNumber req) {
        if (!emailRepository.existsByAuthEmail(req.getAuthEmail())) {
            throw new RuntimeException("인증번호가 없음");
        }

        AuthNumber authNumber = emailRepository.findByAuthEmail(req.getAuthEmail());

        long nowTime = System.currentTimeMillis();
        long timeDiff = nowTime - authNumber.getCreatedAt();
        if (timeDiff > 3 * 60 * 1000) {
            emailRepository.deleteById(authNumber.getAuthId());
            throw new RuntimeException("만료된 인증");
        }

        if (authNumber.getAuthNumber() != req.getAuthNumber()) {
            throw new RuntimeException("인증 번호가 맞지 않음");
        }

        emailRepository.deleteById(authNumber.getAuthId());
    }
}
