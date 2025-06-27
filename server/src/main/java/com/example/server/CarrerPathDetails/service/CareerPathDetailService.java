package com.example.server.CarrerPathDetails.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class CareerPathDetailService {

    @Value("${openrouter.api.key}")
    private String apiKey;

    public String getCareerDetails(String title) {
        String prompt = """
            You are a professional career coach.
            Provide a detailed roadmap for becoming a """ + title + """
            
            Include:
            - Overview
            - Required skills
            - Educational path
            - Certifications
            - Tools/technologies to learn
            - Free and paid resources (courses, platforms)
            - Career growth opportunities
            - Real-world projects to practice
            - Communities to join

            Respond in markdown format.
        """;

        String url = "https://openrouter.ai/api/v1/chat/completions";
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // ✅ Set Authorization header manually
        headers.set("Authorization", "Bearer " + apiKey.trim());

        // ✅ Optional headers required by OpenRouter
        headers.set("HTTP-Referer", "http://localhost:3000"); // Set your frontend URL here
        headers.set("X-Title", "Career Roadmap Generator");

        Map<String, Object> body = new HashMap<>();
        body.put("model", "openai/gpt-3.5-turbo-0613"); // Use supported model
        body.put("messages", List.of(
                Map.of("role", "user", "content", prompt)
        ));

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                Map choice = (Map) ((List) response.getBody().get("choices")).get(0);
                Map message = (Map) choice.get("message");
                String content = message.get("content").toString().trim();
                return content;
            } else {
                return "API returned error: " + response.getStatusCode();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error calling OpenRouter: " + e.getMessage();
        }
    }
}
