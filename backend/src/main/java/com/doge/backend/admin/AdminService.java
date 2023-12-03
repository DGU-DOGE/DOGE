package com.doge.backend.admin;

import com.doge.backend.domain.book.BookRepository;
import com.doge.backend.domain.member.Member;
import com.doge.backend.domain.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminService {
    private final MemberRepository memberRepository;
    private final BookRepository bookRepository;
    private final BookshelfRepository bookshelfRepository;

    public List<Member> findMembers() {
        return memberRepository.findAll();
    }
}
