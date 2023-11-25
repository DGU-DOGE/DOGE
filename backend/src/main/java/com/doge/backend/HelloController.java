package com.doge.backend;

import com.doge.backend.domain.member.Member;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
public class HelloController {

    @GetMapping("/api/demo-web")
    public List<String> Hello() {
        return Arrays.asList("리액트 스프링", "해치 웠나?");
    }

    @PostMapping("/test/doge")
    public Member doge(@RequestBody Member req) {
        Member member = new Member();
        member.setMemberId(1L);
        member.setEmail("backmail " + req.getEmail());
        member.setPassword("backpass " + req.getPassword());
        member.setFavoriteCount(0);

        return member;
    }
}
