package com.doge.backend.domain.favorite;

import com.doge.backend.domain.book.Book;
import lombok.Data;

@Data
public class FavoriteRequest {
    private Book book;
}
