package com.doge.backend.domain.book;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {
    BookRepository bookRepository;

    List<Book> searchBook(String keyword) {
        List<Book> books = bookRepository.findTop30ByBookNameLikeOrAuthorLike(keyword, keyword);
        if (CollectionUtils.isEmpty(books)) {
            throw new RuntimeException("없는 책");
        }
        return books;
    }
}