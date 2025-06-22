package com.example.server.CareerPath.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.server.CareerPath.model.CareerPath;
import com.example.server.CareerPath.repository.CareerPathRepository;

import java.util.List;

public class CareerPathService {

	
	@Autowired
    private CareerPathRepository careerPathRepository;

    // ✅ Save ONE career path
    public CareerPath saveCareerPath(CareerPath careerPath) {
        return careerPathRepository.save(CareerPath);
    }

    // ✅ Save MULTIPLE career paths
    public List<CareerPath> saveCareerPaths(List<CareerPath> careerPaths) {
        return careerPathRepository.saveAll(careerPaths);
    }

    // ✅ Get ALL saved career paths (optional)
    public List<CareerPath> getAllCareerPaths() {
        return careerPathRepository.findAll();
    }
}
