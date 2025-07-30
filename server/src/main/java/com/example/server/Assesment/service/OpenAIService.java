package com.example.server.Assesment.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;

import java.util.*;

@Service
public class OpenAIService {

    @Value("${openrouter.api.key}")
    private String apiKey;

    public List<Map<String, Object>> getCareerPath(List<String> answers, String type) {
        System.out.println("Received answers: " + answers);
        System.out.println("Assessment type: " + type);

        String prompt;

        if ("agriculture".equalsIgnoreCase(type)) {
            prompt = """
                You are an expert career advisor.
                Given the answers, suggest 5-6 agriculture career paths.
                For each, include:
                - title (string)
                - summary (string)
                - match (integer, between 70 and 100)
                Respond ONLY in JSON array format.
                Answers: """ + String.join(", ", answers);
        } else if ("technical".equalsIgnoreCase(type)) {
            prompt = """
                You are an expert career advisor.
                Given the answers, suggest 5-6 technical career paths.
                For each, include:
                - title (string)
                - summary (string)
                - match (integer, between 70 and 100)
                Respond ONLY in JSON array format.
                Answers: """ + String.join(", ", answers);
        } else if ("government".equalsIgnoreCase(type)) {
            prompt = """
                You are an expert career advisor.
                Given the answers, suggest 5-6 government career paths.
                For each, include:
                - title (string)
                - summary (string)
                - match (integer, between 70 and 100)
                Respond ONLY in JSON array format.
                Answers: """ + String.join(", ", answers);
        } else {
            prompt = """
                You are an expert career advisor.
                Given the answers, suggest 5-6 general career paths.
                For each, include:
                - title (string)
                - summary (string)
                - match (integer, between 70 and 100)
                Respond ONLY in JSON array format.
                Answers: """ + String.join(", ", answers);
        }

        String url = "https://openrouter.ai/api/v1/chat/completions";

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey.trim());

        // ✅ FIX: Use actual frontend domain in referer
        headers.set("Referer", "https://career-guidance-platform.vercel.app");

        headers.set("X-Title", "Career Guidance Platform");

        Map<String, Object> body = new HashMap<>();
        body.put("model", "mistralai/mixtral-8x7b"); // or any supported model
        body.put("max_tokens", 1000);
        body.put("messages", List.of(
            Map.of("role", "user", "content", prompt)
        ));

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

            if (response.getStatusCode().is4xxClientError() || response.getBody() == null) {
                throw new RuntimeException("OpenRouter API returned error: " + response.getStatusCode());
            }

            Map choice = (Map) ((List) response.getBody().get("choices")).get(0);
            Map message = (Map) choice.get("message");
            String content = message.get("content").toString().trim();

            return new ObjectMapper().readValue(content, List.class);
        } catch (Exception e) {
            System.err.println("Failed to get career path: " + e.getMessage());
            Map<String, Object> fallback = new HashMap<>();
            fallback.put("error", "Could not fetch career paths");
            fallback.put("details", e.getMessage());
            return List.of(fallback);
        }
    }
}



