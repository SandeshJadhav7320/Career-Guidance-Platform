package com.example.server.ProfileData.service;

import com.example.server.ProfileData.model.ProfleDataModel;
import com.example.server.ProfileData.repository.ProfileDataRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("profileDataService")

public class ProfileDataService {

    @Autowired
    private ProfileDataRepo userRepository;

    public ProfleDataModel getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public ProfleDataModel saveOrUpdateUser(ProfleDataModel user) {
        Optional<ProfleDataModel> existing = userRepository.findByEmail(user.getEmail());

        if (existing.isPresent()) {
        	ProfleDataModel updateUser = existing.get();
            updateUser.setName(user.getName());
            updateUser.setBio(user.getBio());
            updateUser.setAvatar(user.getAvatar());
            updateUser.setEducation(user.getEducation());
            updateUser.setPortfolio(user.getPortfolio());
            return userRepository.save(updateUser);
        }

        return userRepository.save(user);
    }
}
