package com.doge.backend.domain.favorite;

import com.doge.backend.domain.book.Book;
import com.doge.backend.utils.SessionManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteService {
    private final FavoriteRepository favoriteRepository;
    private final SessionManager sessionManager;

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
    public void delete(Long bookId, HttpServletRequest request) {
        favoriteRepository.delete(favoriteRepository.findByMember_MemberIdAndBook_BookId(sessionManager.getSession(request).getMemberId(), bookId));
    }
}
