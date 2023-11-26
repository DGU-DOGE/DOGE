package com.doge.backend.domain.book;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findTop30ByBookNameLike(String bookName);

    List<Book> findTop30ByAuthorLike(String author);
}
