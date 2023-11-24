package com.doge.backend.domain.email;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Date;
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

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("donggukdoze@gmail.com");
        message.setTo(email);
        message.setSubject("도지 인증 번호");
        message.setText("인증 번호는 " + keyValue + "입니다.");
        emailSender.send(message);

        Date now = new Date();

        AuthNumber authNumber = AuthNumber.builder()
                .authEmail(email)
                .authNumber(keyValue)
                .createdAt(now)
                .build();
        emailRepository.save(authNumber);
    }

    public Boolean validateNumber(AuthNumber req) {
        if (!emailRepository.existsByAuthEmail(req.getAuthEmail())) {
            throw new RuntimeException("인증번호가 없거나 만료");
        }

        AuthNumber authNumber = emailRepository.findByAuthEmail(req.getAuthEmail());

        Date now = new Date();
        long timeDiff = now.getTime() - authNumber.getCreatedAt().getTime();
        if (timeDiff > 3 * 60 * 1000) {
            emailRepository.deleteById(authNumber.getAuthId());
            throw new RuntimeException("만료된 인증");
        }

        if (authNumber.getAuthNumber() != req.getAuthNumber()) {
            return false;
        }

        emailRepository.deleteById(authNumber.getAuthId());
        return true;
    }
}
