package com.doge.backend.domain.book;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {
    BookRepository bookRepository;

    List<Book> searchBookName(String bookName) {
        List<Book> books = bookRepository.findTop30ByBookNameLike(bookName);
        if (books.isEmpty()) {
            throw new RuntimeException("없는 책 이름");
        }
        return books;
    }

    List<Book> searchAuthor(String author) {
        List<Book> books = bookRepository.findTop30ByAuthorLike(author);
        if (books.isEmpty()) {
            throw new RuntimeException("없는 저자");
        }
        return books;
    }
}
