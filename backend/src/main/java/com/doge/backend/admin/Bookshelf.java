package com.doge.backend.admin;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Bookshelf {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookshelfId;

    @Column
    private String shelfName;

    @Column
    private String floor;

    @Column
    private String numberStart;

    @Column
    private String numberEnd;

    @Column
    private String numberStart2;

    @Column
    private String numberEnd2;

    @Column
    private int shelfCount;
}