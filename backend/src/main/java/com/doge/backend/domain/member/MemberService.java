package com.doge.backend.domain.member;

import org.springframework.validation.Errors;

import java.util.Map;

public interface MemberService {

    void join(MemberSaveRequestDto memberFormDto);

    Map<String, String> validateHandling(Errors errors);
}
