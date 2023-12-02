package com.doge.backend.domain.favorite;

import com.doge.backend.domain.book.Book;
import com.doge.backend.domain.member.Member;
import com.doge.backend.domain.member.MemberRepository;
import com.doge.backend.utils.SessionManager;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class FavoriteService {
    private final FavoriteRepository favoriteRepository;
    private final MemberRepository memberRepository;
    private final SessionManager sessionManager;

    public List<Book> check(HttpServletRequest request) {
        List<Book> books = new ArrayList<>();
        List<Favorite> favorites = favoriteRepository.findAllByMember_MemberId(sessionManager.getSession(request).getMemberId());
        for (Favorite favorite : favorites) {
            books.add(favorite.getBook());
        }
        return books;
    }

    @Transactional
    public void post(Book book, HttpServletRequest request) {
        Member member = memberRepository.findByEmail(sessionManager.getSession(request).getEmail());
        int favoriteCount = member.getFavoriteCount();

        if (favoriteCount == 20) {
            throw new RuntimeException("즐겨찾기 개수 초과");
        }

        member.setFavoriteCount(favoriteCount + 1);

        Favorite favorite = Favorite.builder()
                .book(book)
                .member(member)
                .build();
        favoriteRepository.save(favorite);
    }

    @Transactional
    public void delete(Long bookId, HttpServletRequest request) {
        Member member = memberRepository.findByEmail(sessionManager.getSession(request).getEmail());
        member.setFavoriteCount(member.getFavoriteCount() - 1);

        favoriteRepository.delete(favoriteRepository.findByMember_MemberIdAndBook_BookId(member.getMemberId(), bookId));
    }
}
