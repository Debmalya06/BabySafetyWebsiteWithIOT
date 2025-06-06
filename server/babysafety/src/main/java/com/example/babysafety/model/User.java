package com.example.babysafety.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Getter;
import lombok.Setter;

@Document(collection = "users")
@Getter
@Setter
public class User {

    @Id
    private String id;
    private String username;
    private String email;
    private String password;
    private String mobileNumber;

    // Constructors
    public User() {}

   public User(String username, String email, String mobileNumber, String password) {
    this.username = username;
    this.email = email;
    this.mobileNumber = mobileNumber;
    this.password = password;
}
}