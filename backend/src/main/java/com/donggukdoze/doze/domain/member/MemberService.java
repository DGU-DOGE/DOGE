package com.donggukdoze.doze.domain.member;

import org.springframework.validation.Errors;

import java.util.Map;

public interface MemberService {

    Long join(MemberSaveRequestDto memberFormDto);

    Map<String, String> validateHandling(Errors errors);
}
