package com.doge.backend.domain.member;

import lombok.Data;

@Data
public class MemberRequest {
    private String email;
    private String password;
}
