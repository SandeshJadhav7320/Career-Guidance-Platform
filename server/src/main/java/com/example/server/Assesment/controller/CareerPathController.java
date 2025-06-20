package com.example.server.Assesment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.server.Assesment.service.OpenAIService;
import com.example.server.Assesment.DTO.AssessmentRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/assessment")
@CrossOrigin(origins = "*")
public class CareerPathController {

    @Autowired
    private OpenAIService openAIService;

    @PostMapping("/analyze")
    public ResponseEntity<List<Map<String, Object>>> analyzeAnswers(@RequestBody AssessmentRequest request) {
        List<Map<String, Object>> result = openAIService.getCareerPath(request.getAnswers(), request.getType());
        return ResponseEntity.ok(result);
    }
}
