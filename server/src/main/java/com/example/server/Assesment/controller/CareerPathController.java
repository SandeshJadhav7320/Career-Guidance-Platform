package com.example.server.Assesment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.server.Assesment.service.OpenAIService;
import com.example.server.CareerPath.service.CareerPathService;
import com.example.server.Assesment.DTO.AssessmentRequest;
import org.springframework.http.ResponseEntity;
import com.example.server.CareerPath.model.CareerPath;


import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/assessment")
@CrossOrigin(origins = "*")
public class CareerPathController {

    @Autowired
    private OpenAIService openAIService;
    
    @Autowired
    private CareerPathService careerPathService;  // ✅ NEW: inject it	

    @PostMapping("/analyze")
    public ResponseEntity<List<Map<String, Object>>> analyzeAnswers(@RequestBody AssessmentRequest request) {
    	
    	// 1. Get AI-generated paths
        List<Map<String, Object>> result = openAIService.getCareerPath(request.getAnswers(), request.getType());
        
     // 2. Convert each path to CareerPath entity
        List<CareerPath> pathsToSave = result.stream().map(path -> {
            CareerPath cp = new CareerPath();
            cp.setTitle(path.get("title").toString());
            cp.setSummary(path.get("summary").toString());
            cp.setMatchPercentage(Integer.parseInt(path.get("match").toString()));
            return cp;
        }).toList();

        // 3. Save to DB
        careerPathService.saveCareerPaths(pathsToSave);
        return ResponseEntity.ok(result);
    }
}
