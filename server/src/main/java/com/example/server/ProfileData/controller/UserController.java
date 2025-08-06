package com.example.server.ProfileData.controller;

import com.example.server.ProfileData.model.User;
import com.example.server.ProfileData.service.ProfileDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*") // Allow frontend access
@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
    @Qualifier("profileDataService")
    private ProfileDataService userService;

    @GetMapping("/{email}")
    public User getUser(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

    @PostMapping
    public User saveOrUpdateUser(@RequestBody User user) {
        return userService.saveOrUpdateUser(user);
    }
}
