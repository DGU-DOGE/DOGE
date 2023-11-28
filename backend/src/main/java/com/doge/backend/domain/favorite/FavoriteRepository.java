package com.doge.backend.domain.favorite;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findAllByMember_MemberId(Long memberId);

    Favorite findByMember_MemberIdAndBook_BookId(Long memberId, Long bookId);
}
