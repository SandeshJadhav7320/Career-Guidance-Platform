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

    // ✅ Updated method to take 'type'
    public List<Map<String, Object>> getCareerPath(List<String> answers, String type) {
        System.out.println("Received answers: " + answers);
        System.out.println("Assessment type: " + type);

        String prompt;

        // ✅ Use if-else to choose the prompt based on type
        if ("agriculture".equalsIgnoreCase(type)) {
            prompt = """
                You are an expert career advisor.
                Given the answers, suggest 5-6 agriculture career paths.
                For each, include:
                - title (string)
                - summary (string)
                - match (integer, between 70 and 100)

                Respond ONLY in JSON array format, like:
                [
                  {
                    "title": "Agronomist",
                    "summary": "Expert in soil and crop production...",
                    "match": 85
                  },
                  ...
                ]

                Answers: """ + String.join(", ", answers);
        } else if ("technical".equalsIgnoreCase(type)) {
            prompt = """
                You are an expert career advisor.
                Given the answers, suggest 5-6 technical career paths.
                For each, include:
                - title (string)
                - summary (string)
                - match (integer, between 70 and 100)

                Respond ONLY in JSON array format, like:
                [
                  {
                    "title": "Software Developer",
                    "summary": "Builds and maintains software applications...",
                    "match": 90
                  },
                  ...
                ]

                Answers: """ + String.join(", ", answers);
        } 
        else if ("government".equalsIgnoreCase(type)) {
            prompt = """
                You are an expert career advisor.
                Given the answers, suggest 5-6 government career paths.
                For each, include:
                - title (string)
                - summary (string)
                - match (integer, between 70 and 100)

                Respond ONLY in JSON array format, like:
                [
                  {
                    "title": "Software Developer",
                    "summary": "Builds and maintains software applications...",
                    "match": 90
                  },
                  ...
                ]

                Answers: """ + String.join(", ", answers);
        } 
        else {
            // Default to general advice if type is unknown
            prompt = """
                You are an expert career advisor.
                Given the answers, suggest 5-6 general career paths.
                For each, include:
                - title (string)
                - summary (string)
                - match (integer, between 70 and 100)

                Respond ONLY in JSON array format, like:
                [
                  {
                    "title": "Project Manager",
                    "summary": "Leads and coordinates projects...",
                    "match": 80
                  },
                  ...
                ]

                Answers: """ + String.join(", ", answers);
        }

        String url = "https://openrouter.ai/api/v1/chat/completions";

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey.trim());
        headers.set("HTTP-Referer", "http://localhost:3000");
        headers.set("X-Title", "Career Guidance Platform");

        Map<String, Object> body = new HashMap<>();
        body.put("model", "mistral/mistral-7b-instruct"); // ✅ FREE model
        body.put("max_tokens", 1000);
        body.put("messages", List.of(
                Map.of("role", "user", "content", prompt)
        ));

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

        Map choice = (Map) ((List) response.getBody().get("choices")).get(0);
        Map message = (Map) choice.get("message");
        String content = message.get("content").toString().trim();

        List<Map<String, Object>> careerPaths = new ArrayList<>();
        try {
            careerPaths = new ObjectMapper().readValue(content, List.class);
        } catch (Exception e) {
            System.err.println("Failed to parse GPT response: " + e.getMessage());
            Map<String, Object> fallback = new HashMap<>();
            fallback.put("error", "Could not parse response");
            fallback.put("raw", content);
            careerPaths.add(fallback);
        }

        return careerPaths;
    }
}