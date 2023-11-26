package com.doge.backend.domain.favorite;

import com.doge.backend.domain.book.Book;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FavoriteService {
    private final FavoriteRepository favoriteRepository;

    public List<Book> check(Long memberId) {
        List<Favorite> favorites = favoriteRepository.findAllByMember_MemberId(memberId);
        return favorites.stream()
                .map(Favorite::getBook)
                .collect(Collectors.toList());
    }
}
