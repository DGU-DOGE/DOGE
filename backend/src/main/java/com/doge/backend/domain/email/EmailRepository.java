package com.doge.backend.domain.email;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailRepository extends JpaRepository<AuthNumber, Long> {
    AuthNumber findByAuthEmail(String email);

    boolean existsByAuthEmail(String email);
}
