package com.example.server.Assesment.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.*;

@Service
public class OpenAIService {

    @Value("${openai.api.key}")
    private String apiKey;

    public String getCareerPath(List<String> answers) {
        String prompt = "Analyze these answers and suggest a career path: " + String.join(", ", answers);

        // ✅ Use OpenRouter URL
        String url = "https://openrouter.ai/api/v1/chat/completions";

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);

        // ✅ Recommended OpenRouter headers
        headers.set("HTTP-Referer", "http://localhost:3000"); // replace with your frontend URL in production
        headers.set("X-Title", "Career Guidance Platform");

        // ✅ Use a supported model — check OpenRouter docs for more
        Map<String, Object> body = new HashMap<>();
        body.put("model", "openai/gpt-3.5-turbo"); // or try other models like "mistralai/mistral-7b-instruct"
        body.put("messages", List.of(
            Map.of("role", "user", "content", prompt)
        ));

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

        Map choice = (Map) ((List) response.getBody().get("choices")).get(0);
        Map message = (Map) choice.get("message");

        return message.get("content").toString();
    }
}
