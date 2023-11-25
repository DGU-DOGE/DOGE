package com.doge.backend.domain.member;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

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

    public Object login(Member req, HttpServletRequest request, HttpServletResponse response) {
        if (!emailDuplicateValidate(req.getEmail())) {
            throw new RuntimeException("없는 계정");
        }

        Member member = memberRepository.findByEmail(req.getEmail());
        if (!member.getPassword().equals(req.getPassword())) {
            throw new RuntimeException("비밀번호 불일치");
        }

        sessionManager.createSession(member, response);
        return sessionManager.getSession(request);
    }

    public void logout(HttpServletRequest request) {
        sessionManager.expire(request);
    }
}
