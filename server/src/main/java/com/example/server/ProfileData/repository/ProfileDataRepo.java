package com.example.server.ProfileData.repository;

import com.example.server.ProfileData.model.ProfleDataModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileDataRepo extends JpaRepository<ProfleDataModel, Long> {
    Optional<ProfleDataModel> findByEmail(String email);
}
