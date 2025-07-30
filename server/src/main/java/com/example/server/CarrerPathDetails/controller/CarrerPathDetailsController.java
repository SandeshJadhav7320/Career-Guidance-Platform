package com.example.server.CarrerPathDetails.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.server.CarrerPathDetails.model.*;
import com.example.server.CarrerPathDetails.service.CareerPathDetailService;
import com.example.server.CarrerPathDetails.service.SelectedCareerPathService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend access
public class CarrerPathDetailsController {

    @Autowired
    private CareerPathDetailService detailService;

    @Autowired
    private SelectedCareerPathService selectedCareerPathService;

    @PostMapping("/title")
    public String receiveTitle(@RequestBody CarrerPathDetailsModel title) {
        return detailService.getCareerDetails(title.getTitle());
    }

    @PostMapping("/save-career-path")
    public ResponseEntity<?> saveCareerPath(@RequestBody SelectedCareerPath data) {
        if (
            data.getUserId() == null || data.getUserId().isEmpty() ||
            data.getTitle() == null || data.getTitle().isEmpty()
        ) {
            return ResponseEntity.badRequest().body("Missing required userId or title.");
        }

        SelectedCareerPath savedPath = selectedCareerPathService.savePath(data);
        return ResponseEntity.ok(savedPath);
    }

    // ✅ New endpoint to get saved career paths by userId
    @GetMapping("/get-career-path")
    public ResponseEntity<?> getCareerPathsByUser(@RequestParam String userId) {
        if (userId == null || userId.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Missing userId.");
        }

        try {
            Long longUserId = Long.parseLong(userId); // 🔁 Convert String to Long
            return ResponseEntity.ok(selectedCareerPathService.getPathsByUser(longUserId));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body("Invalid userId format.");
        }
    }

    @GetMapping("/get-career-path-by-id")
    public ResponseEntity<SelectedCareerPath> getCareerPathById(@RequestParam Long id) {
        Optional<SelectedCareerPath> path = selectedCareerPathService.getPathById(id);
        return path.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

}
