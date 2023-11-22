package com.doge.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
public class HelloController {

    @GetMapping("/api/demo-web")
    public List<String> Hello(){
        return Arrays.asList("리액트 스프링", "해치 웠나?");
    }
}
