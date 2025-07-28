package com.example.server.User.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.server.User.repository.UserRepository;
import com.example.server.User.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin( // ✅ Allow both local and deployed frontend
    origins = {
        "http://localhost:5173",
        "https://career-guidance-platform.vercel.app"
    },
    allowCredentials = "true"
)
public class AuthController {

    private final UserRepository userRepository;
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping(value = "/google-login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> loginWithGoogle(@RequestBody User userData) {
        logger.info("🔐 Incoming Google login for email: {}", userData.getEmail());

        User existingUser = userRepository.findByEmail(userData.getEmail());

        if (existingUser == null) {
            logger.info("📥 New user, saving...");
            User savedUser = userRepository.save(userData);
            return ResponseEntity.ok(savedUser);
        }

        logger.info("✅ Existing user found: {}", existingUser.getEmail());
        return ResponseEntity.ok(existingUser);
    }
}
