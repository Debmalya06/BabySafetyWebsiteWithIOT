package com.example.babysafety.controller;

import com.example.babysafety.model.User;
import com.example.babysafety.payload.request.LoginRequest;
import com.example.babysafety.payload.request.SignupRequest;
import com.example.babysafety.payload.response.JwtResponse;
import com.example.babysafety.payload.response.MessageResponse;
import com.example.babysafety.repository.UserRepository;
import com.example.babysafety.security.UserDetailsImpl;
import com.example.babysafety.security.jwt.JwtUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

   @PostMapping("/login")
public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
    );

    var userDetails = (UserDetailsImpl) authentication.getPrincipal();
    String jwt = jwtUtils.generateJwtToken(authentication);

    return ResponseEntity.ok(new JwtResponse(jwt,
                                             userDetails.getId(),
                                             userDetails.getUsername(),
                                             userDetails.getEmail()));
}

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {
        if(userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }

        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user account
        User user = new User(signUpRequest.getUsername(),
                             signUpRequest.getEmail(),
                             signUpRequest.getMobileNumber(),
                             encoder.encode(signUpRequest.getPassword()));

        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
