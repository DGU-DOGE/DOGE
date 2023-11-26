package com.doge.backend.domain.favorite;

import com.doge.backend.utils.SessionManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
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
    private final FavoriteService favoriteService;
    private final SessionManager sessionManager;

    @GetMapping("/check")
    public List<Favorite> check(HttpServletRequest request) {
        return favoriteService.check(sessionManager.getSession(request).getMemberId());
    }

    @PostMapping("/post")
    public void post(@RequestBody Favorite favorite, HttpServletRequest request) {
        favoriteService.post(favorite.getBook(), sessionManager.getSession(request));
    }
}
