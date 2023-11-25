package com.doge.backend.domain.member;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final SessionManager sessionManager;

    public void join(Member req) {
        if (emailDuplicateValidate(req.getEmail())) {
            throw new RuntimeException("이메일 중복");
        }

        Member member = Member.builder()
                .email(req.getEmail())
                .password(req.getPassword())
                .favoriteCount(0)
                .build();
        memberRepository.save(member);
    }

    public boolean emailDuplicateValidate(String email) {
        return memberRepository.existsByEmail(email);
    }

    public String login(Member req, HttpServletResponse response) {
        if (!emailDuplicateValidate(req.getEmail())) {
            throw new RuntimeException("없는 계정");
        }

        Member member = memberRepository.findByEmail(req.getEmail());
        if (!member.getPassword().equals(req.getPassword())) {
            throw new RuntimeException("비밀번호 불일치");
        }

        return sessionManager.createSession(member, response);
    }

    public void logout(HttpServletRequest request) {
        sessionManager.expire(request);
    }

    public void changePassword(Member req) {
        Member member = memberRepository.findByEmail(req.getEmail());

        member.setPassword(req.getPassword());
    }
}
