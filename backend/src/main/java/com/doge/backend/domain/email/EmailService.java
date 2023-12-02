package com.doge.backend.domain.email;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender emailSender;
    private final EmailRepository emailRepository;

    @Transactional
    public void sendEmail(String email) {
        if (emailRepository.existsByAuthEmail(email)) {
            emailRepository.deleteById(emailRepository.findByAuthEmail(email).getAuthId());
        }

        Random random = new Random();
        String keyValue = String.format("%06d", random.nextInt(1000000));
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

    @Transactional
    public void validateNumber(EmailRequest req) {
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

        if (!authNumber.getAuthNumber().equals(req.getAuthNumber())) {
            throw new RuntimeException("인증 번호가 맞지 않음");
        }

        emailRepository.deleteById(authNumber.getAuthId());
    }
}
