package com.doge.backend.domain.favorite;

import com.doge.backend.domain.book.Book;
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
        Favorite favorite = Favorite.builder()
                .book(book)
                .member(sessionManager.getSession(request))
                .build();
        favoriteRepository.save(favorite);
    }

    @Transactional
    public void delete(Long bookId, HttpServletRequest request) {
        favoriteRepository.delete(favoriteRepository.findByMember_MemberIdAndBook_BookId(sessionManager.getSession(request).getMemberId(), bookId));
    }
}
