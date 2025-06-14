package com.example.server.Assesment.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.*;

@Service
public class OpenAIService {

    @Value("${openrouter.api.key}")
    private String apiKey;  // Renamed for clarity

    public String getCareerPath(List<String> answers) {
        // Debug: check answers
        System.out.println("Received answers: " + answers);

        String prompt = "Analyze these answers and suggest a career path: " + String.join(", ", answers);

        String url = "https://openrouter.ai/api/v1/chat/completions";

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // ✅ Ensure no trailing spaces
        headers.set(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey.trim());

        // ✅ Recommended OpenRouter headers
        headers.set("HTTP-Referer", "http://localhost:3000");
        headers.set("X-Title", "Career Guidance Platform");

        Map<String, Object> body = new HashMap<>();
        body.put("model", "openai/gpt-3.5-turbo");
        body.put("messages", List.of(
            Map.of("role", "user", "content", prompt)
        ));

        // Debug: show request details
        System.out.println("API Key: " + apiKey.trim());
        System.out.println("Headers: " + headers);
        System.out.println("Body: " + body);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

        System.out.println("Raw Response: " + response.getBody());

        Map choice = (Map) ((List) response.getBody().get("choices")).get(0);
        Map message = (Map) choice.get("message");

        return message.get("content").toString();
    }
}
