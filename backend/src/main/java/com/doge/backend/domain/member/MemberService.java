package com.doge.backend.domain.member;

import com.doge.backend.domain.book.Book;
import com.doge.backend.domain.favorite.Favorite;
import com.doge.backend.domain.favorite.FavoriteRepository;
import com.doge.backend.utils.SessionManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final FavoriteRepository favoriteRepository;
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

    @Transactional
    public void changePassword(Member req) {
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
        memberRepository.deleteById(member.getMemberId());
    }

    public List<Favorite> check(HttpServletRequest request) {
        List<Favorite> favorites;
        try {
            favorites = favoriteRepository.findAllByMember_MemberId(sessionManager.getSession(request).getMemberId());
        } catch (NullPointerException e) {
            return new ArrayList<>();
        }
        return favorites;
    }

    public void post(Book book, HttpServletRequest request) {
        Favorite favorite = Favorite.builder()
                .book(book)
                .member(sessionManager.getSession(request))
                .build();
        favoriteRepository.save(favorite);
    }

    @Transactional
    public void favoriteDelete(Long bookId, HttpServletRequest request) {
        favoriteRepository.delete(favoriteRepository.findByMember_MemberIdAndBook_BookId(sessionManager.getSession(request).getMemberId(), bookId));
    }
}
