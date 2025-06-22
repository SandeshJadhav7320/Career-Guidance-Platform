package com.example.server.CareerPath.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.server.CareerPath.model.CareerPath;

@Repository
public interface CareerPathRepository extends JpaRepository<CareerPath, Long> {
	
}
