package com.example.server.ProfileData.controller;

import com.example.server.ProfileData.model.User;
import com.example.server.ProfileData.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*") // Allow frontend access
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{email}")
    public User getUser(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

    @PostMapping
    public User saveOrUpdateUser(@RequestBody User user) {
        return userService.saveOrUpdateUser(user);
    }
}
