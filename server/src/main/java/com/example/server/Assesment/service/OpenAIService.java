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

    public List<Map<String, Object>> getCareerPath(List<String> answers) {
        // Debug: check answers
        System.out.println("Received answers: " + answers);

        // Use a prompt that asks for multiple options in JSON
        String prompt = """
        		You are an expert career advisor. 
        		Given the answers, suggest 3-5 agriculture career paths. 
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


        String url = "https://openrouter.ai/api/v1/chat/completions";

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey.trim());
        headers.set("HTTP-Referer", "http://localhost:3000");
        headers.set("X-Title", "Career Guidance Platform");

        Map<String, Object> body = new HashMap<>();
        body.put("model", "openai/gpt-3.5-turbo");
        body.put("messages", List.of(
                Map.of("role", "user", "content", prompt)
        ));

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

       

        Map choice = (Map) ((List) response.getBody().get("choices")).get(0);
        Map message = (Map) choice.get("message");
        String content = message.get("content").toString().trim();

        // Parse the returned JSON array from the model's plain text
        List<Map<String, Object>> careerPaths = new ArrayList<>();
        try {
            careerPaths = new ObjectMapper().readValue(content, List.class);
        } catch (Exception e) {
            System.err.println("Failed to parse GPT response, wrapping in fallback: " + e.getMessage());
            // Fallback: wrap raw text
            Map<String, Object> fallback = new HashMap<>();
            careerPaths.add(fallback);
        }

        return careerPaths;
    }
}
