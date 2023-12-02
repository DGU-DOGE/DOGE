package com.doge.backend.domain.email;

import lombok.Data;

@Data
public class EmailRequest {
    private String authEmail;
    private String authNumber;
}
