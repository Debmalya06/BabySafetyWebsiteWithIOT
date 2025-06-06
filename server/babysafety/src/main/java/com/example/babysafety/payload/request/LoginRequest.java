// filepath: d:\Web_Dev\WEB_Project\BabySafetyWebsite\server\babysafety\src\main\java\com\example\babysafety\payload\request\LoginRequest.java
package com.example.babysafety.payload.request;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class LoginRequest {
    @NotBlank
    private String email; // Change from username to email

    @NotBlank
    private String password;
}