package com.doge.backend.domain.member;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/user")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/join")
    public void join(@RequestBody Member req){
        memberService.join(req);
    }
}
