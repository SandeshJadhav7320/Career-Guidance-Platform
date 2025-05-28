package com.example.server.User.controller;

import org.springframework.web.bind.annotation.*;
import com.example.server.User.repository.UserRepository;
import com.example.server.User.model.User;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend requests
public class AuthController {
    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/google-login")
    public User loginWithGoogle(@RequestBody User userData) {
        User existingUser = userRepository.findByEmail(userData.getEmail());
        if (existingUser == null) {
            return userRepository.save(userData);
        }
        return existingUser;
    }
}

