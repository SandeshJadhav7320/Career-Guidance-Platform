package com.example.server.User.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.server.User.repository.UserRepository;
import com.example.server.User.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository userRepository;
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/google-login")
    public ResponseEntity<User> loginWithGoogle(@RequestBody User userData) {
        User existingUser = userRepository.findByEmail(userData.getEmail());

        if (existingUser == null) {
            User savedUser = userRepository.save(userData);
            return ResponseEntity.ok(savedUser); // ✔ new user with ID
        }

        return ResponseEntity.ok(existingUser); // ✔ existing user with ID
    }

}

