package com.doge.backend.domain.favorite;

import com.doge.backend.domain.book.Book;
import com.doge.backend.domain.member.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/favorite")
public class FavoriteController {
    private final MemberService memberService;

    @PostMapping("/check")
    public List<Favorite> check(HttpServletRequest request) {
        return memberService.check(request);
    }

    @PostMapping("/post")
    public void post(@RequestBody Book book, HttpServletRequest request) {
        memberService.post(book, request);
    }

    @PostMapping("/delete")
    public void delete(@RequestBody Long bookId, HttpServletRequest request) {
        memberService.favoriteDelete(bookId, request);
    }
}