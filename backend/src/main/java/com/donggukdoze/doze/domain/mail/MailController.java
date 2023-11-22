package com.donggukdoze.doze.domain.mail;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class MailController {

    private final MailService emailService;

    public MailController(MailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping("/mail/send")
    public String mail() {
        return "sendMail.html";
    }

    @PostMapping("/mail/send")
    public String sendMail(MailDto mailDto) {
        emailService.sendSimpleMessage(mailDto);
        return "afterMail.html";
    }
}