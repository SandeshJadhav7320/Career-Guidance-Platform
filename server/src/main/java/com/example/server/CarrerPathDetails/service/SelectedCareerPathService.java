package com.example.server.CarrerPathDetails.service;

import com.example.server.CarrerPathDetails.model.SelectedCareerPath;
import com.example.server.CarrerPathDetails.repository.SelectedCareerPathRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SelectedCareerPathService {

    @Autowired
    private SelectedCareerPathRepository repository;

    public SelectedCareerPath savePath(SelectedCareerPath path) {
        return repository.save(path);
    }

    public List<SelectedCareerPath> getPathsByUser(Long userId) {
        return repository.findByUserId(userId);
    }
    public Optional<SelectedCareerPath> getPathById(Long id) {
        return repository.findById(id);
    }

}
