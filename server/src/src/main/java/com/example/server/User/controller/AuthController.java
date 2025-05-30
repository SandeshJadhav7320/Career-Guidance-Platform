// AuthController.java
package com.example.server.User.controller;

import org.springframework.web.bind.annotation.*;
import com.example.server.User.repository.UserRepository;
import com.example.server.User.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // ✅ Allow frontend requests
public class AuthController {

    private final UserRepository userRepository;
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/google-login")
    public User loginWithGoogle(@RequestBody User userData) {
        logger.info("Received Google Login Request: {}", userData.getEmail());

        User existingUser = userRepository.findByEmail(userData.getEmail());

        if (existingUser == null) {
            logger.info("New user - saving to database");
            return userRepository.save(userData);
        }

        logger.info("Existing user - logging in");
        return existingUser;
    }
}
