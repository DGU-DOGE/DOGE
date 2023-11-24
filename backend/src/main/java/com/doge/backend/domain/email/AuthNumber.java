package com.doge.backend.domain.email;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthNumber {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long authId;

    @Column(nullable = false, unique = true)
    private String authEmail;

    @Column
    private int authNumber;

    @Column
    private Date createdAt;
}