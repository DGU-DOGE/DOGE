package com.doge.backend.domain.book;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;

    List<Book> searchBook(String keyword) {
        return bookRepository.findTop30ByBookNameContainsOrAuthorContains(keyword, keyword);
    }
}
