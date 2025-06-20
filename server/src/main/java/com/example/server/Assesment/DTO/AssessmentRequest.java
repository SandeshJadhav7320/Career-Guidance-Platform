package com.example.server.Assesment.DTO;
import java.util.List;

public class AssessmentRequest {
    private List<String> answers;
    private String type;

    public List<String> getAnswers() {
        return answers;
    }

    public void setAnswers(List<String> answers) {
        this.answers = answers;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
