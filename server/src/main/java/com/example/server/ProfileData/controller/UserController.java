package com.example.server.ProfileData.controller;

import com.example.server.ProfileData.model.ProfleDataModel;
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
    private ProfileDataService profileService;

    @GetMapping("/{email}")
    public ProfleDataModel getUser(@PathVariable String email) {
        return profileService.getUserByEmail(email);
    }

    @PostMapping
    public ProfleDataModel saveOrUpdateUser(@RequestBody ProfleDataModel user) {
        return profileService.saveOrUpdateUser(user);
    }
}
