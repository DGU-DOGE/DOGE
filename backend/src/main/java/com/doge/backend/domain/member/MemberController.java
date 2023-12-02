package com.doge.backend.domain.member;

import com.doge.backend.utils.SessionManager;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/user")
public class MemberController {

    private final MemberService memberService;
    private final SessionManager sessionManager;

    @PostMapping("/join")
    public void join(@RequestBody MemberRequest req) {
        memberService.join(req);
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody MemberRequest req, HttpServletResponse response) {
        Map<String, String> result = new HashMap<>();
        result.put("sessionId", memberService.login(req, response));
        return result;
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request) {
        memberService.logout(request);
    }

    @PatchMapping("/change-password")
    public void changePassword(@RequestBody MemberRequest req) {
        memberService.changePassword(req);
    }

    @PostMapping("/check")
    public Map<String, String> check(HttpServletRequest request) {
        return memberService.check(sessionManager.getSession(request));
    }

    @PostMapping("/delete")
    public void delete(@RequestBody Map<String, String> password, HttpServletRequest request) {
        memberService.delete(password.get("password"), request);
    }
}
