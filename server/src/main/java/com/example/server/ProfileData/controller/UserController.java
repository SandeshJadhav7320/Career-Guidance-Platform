package com.example.server.ProfileData.controller;

import com.example.server.ProfileData.model.ProfleDataModel;
import com.example.server.ProfileData.service.ProfileDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
@CrossOrigin(origins = "*")
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

    // ✅ Save or update user without avatar (JSON request)
    @PostMapping
    public ProfleDataModel saveOrUpdateUser(@RequestBody ProfleDataModel user) {
        return profileService.saveOrUpdateUser(user);
    }

    // ✅ New API: Upload avatar separately
    @PostMapping("/{email}/avatar")
    public ProfleDataModel uploadAvatar(@PathVariable String email,
                                        @RequestParam("file") MultipartFile file) throws IOException {
        // Folder to save images
        String uploadDir = System.getProperty("user.home") + "/Desktop/myphotos/image";

        File dir = new File(uploadDir);
        if (!dir.exists()) dir.mkdirs();

        // Save file with unique name
        String fileName = email + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, fileName);
        Files.write(filePath, file.getBytes());

        // Save relative path in DB (not full system path)
        String relativePath = "/images/" + fileName;

        return profileService.updateUserAvatar(email, relativePath);
    }
}