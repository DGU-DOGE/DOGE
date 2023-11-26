package com.doge.backend.domain.favorite;

import com.doge.backend.domain.book.Book;
import com.doge.backend.domain.member.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteService {
    private final FavoriteRepository favoriteRepository;

    public List<Favorite> check(Long memberId) {
        return favoriteRepository.findAllByMember_MemberId(memberId);
    }

    public void post(Book book, Member member) {
        Favorite favorite = Favorite.builder()
                .book(book)
                .member(member)
                .build();
        favoriteRepository.save(favorite);
    }

    @Transactional
    public void delete(Long bookId, Long memberId) {
        favoriteRepository.delete(favoriteRepository.findByMember_MemberIdAndBook_BookId(memberId, bookId));
    }
}
