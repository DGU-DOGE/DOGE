package com.doge.backend.domain.email;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmailRepository extends JpaRepository<AuthNumber, Long> {
    AuthNumber findByAuthEmail(String email);

    boolean existsByAuthEmail(String email);
}
