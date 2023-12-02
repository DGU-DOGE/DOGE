package com.doge.backend.domain.member;

import com.doge.backend.domain.favorite.FavoriteRepository;
import com.doge.backend.utils.SessionManager;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final FavoriteRepository favoriteRepository;
    private final SessionManager sessionManager;

    @Transactional
    public void join(MemberRequest req) {
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

    public String login(MemberRequest req, HttpServletResponse response) {
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

    @Transactional
    public void changePassword(MemberRequest req) {
        Member member = memberRepository.findByEmail(req.getEmail());
        member.setPassword(req.getPassword());
    }

    public Map<String, String> check(Member req) {
        Map<String, String> memberEmail = new HashMap<>();
        memberEmail.put("email", req.getEmail());
        return memberEmail;
    }

    @Transactional
    public void delete(String password, HttpServletRequest request) {
        Member member = sessionManager.getSession(request);
        if (!member.getPassword().equals(password)) {
            throw new RuntimeException("비밀번호 불일치");
        }
        sessionManager.expire(request);

        favoriteRepository.deleteAllByMember_MemberId(member.getMemberId());
        memberRepository.deleteById(member.getMemberId());
    }
}
