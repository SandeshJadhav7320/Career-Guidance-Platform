package com.example.server.CarrerPathDetails.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.server.CarrerPathDetails.model.SelectedCareerPath;

import java.util.List;

public interface SelectedCareerPathRepository extends JpaRepository<SelectedCareerPath, Long> {
    List<SelectedCareerPath> findByUserId(Long userId);
}
