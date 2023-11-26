package com.doge.backend.domain.member;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/user")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/join")
    public void join(@RequestBody Member req) {
        memberService.join(req);
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Member req, HttpServletResponse response) {
        HashMap<String, String> result = new HashMap<>();
        result.put("sessionId", memberService.login(req, response));
        return result;
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request) {
        memberService.logout(request);
    }

    @PatchMapping("/change-password")
    public void changePassword(@RequestBody Member req) {
        memberService.changePassword(req);
    }
}
