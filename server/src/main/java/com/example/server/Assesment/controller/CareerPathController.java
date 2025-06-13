package com.example.server.Assesment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.server.Assesment.service.OpenAIService;

import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/api/assessment")
@CrossOrigin(origins = "*")
public class CareerPathController {

    @Autowired
    private OpenAIService openAIService;

    @PostMapping("/analyze")
    public ResponseEntity<String> analyzeAnswers(@RequestBody List<String> answers) {
        String result = openAIService.getCareerPath(answers);
        return ResponseEntity.ok(result);
    }
}
