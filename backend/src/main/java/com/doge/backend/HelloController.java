package com.doge.backend;

import com.doge.backend.domain.member.Member;
import com.doge.backend.domain.member.Role;
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
    public Member doge(@RequestBody Member member){
        Member member1 = new Member();
        member1.setId(1L);
        member1.setEmail("backmail " + member.getEmail());
        member1.setPassword("backpass " + member.getPassword());
        member1.setFavoriteCount(0);
        member1.setRole(Role.ROLE_USER);

        return member1;
    }
}
