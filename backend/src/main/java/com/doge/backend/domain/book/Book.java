package com.doge.backend.domain.book;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookId;

    @Column(nullable = false, unique = true)
    private String callNumber;

    @Column
    private String bookName;

    @Column
    private String author;

    @Column
    private String publisher;

    @Column
    private String photoLink;


    @Column
    private int floor;

    @Column
    private String shelfName;

    @Column
    private int shelfCount;

    @Column
    private int row;

    @Column
    private int cell;
}