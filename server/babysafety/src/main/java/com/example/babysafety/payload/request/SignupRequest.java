package com.example.babysafety.payload.request;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {
    @NotBlank
    @Size(min=3, max=20)
    private String username;

    @NotBlank
    @Size(max=50)
    @Email
    private String email;

    @NotBlank
    @Size(min=6, max=40)
    private String password;

    @NotBlank
    @Size(min=10, max=15)
    private String mobileNumber;
}