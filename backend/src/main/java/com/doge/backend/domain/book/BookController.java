package com.doge.backend.domain.book;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/book")
public class BookController {
    BookService bookService;

    @GetMapping("/임시")
    List<Book> searchBookName(@RequestBody List<String> search) {
        if (search.get(0).equals("bookName")) {
            return bookService.searchBookName(search.get(1));
        } else if (search.get(0).equals("author")) {
            return bookService.searchAuthor(search.get(1));
        } else {
            throw new RuntimeException("타입 에러");
        }
    }
}
