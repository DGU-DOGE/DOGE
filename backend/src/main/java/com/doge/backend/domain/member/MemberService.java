package com.doge.backend.domain.member;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public void join(Member req) {
        emailDuplicateValidate(req.getEmail());

        Member member = Member.builder()
                .email(req.getEmail())
                .password(req.getPassword())
                .favoriteCount(0)
                .build();
        memberRepository.save(member);
    }

    public void emailDuplicateValidate(String email) {
        if (memberRepository.existsByEmail(email)) {
            throw new RuntimeException();
        }
    }
}
