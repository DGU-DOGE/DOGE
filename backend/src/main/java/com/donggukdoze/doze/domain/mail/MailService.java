package com.donggukdoze.doze.domain.mail;

import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@AllArgsConstructor
public class MailService {

    private JavaMailSender emailSender;

    public void sendSimpleMessage(MailDto mailDto) {
        Random random = new Random();
        String authKey = String.valueOf(random.nextInt(899999) + 100000);
        int keyValue = Integer.parseInt(authKey);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("donggukdoze@gmail.com");
        message.setTo(mailDto.getAddress());
        message.setSubject("도지 인증 번호");
        message.setText("인증 번호는 " + keyValue + "입니다.");
        emailSender.send(message);
    }
}