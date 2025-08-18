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

    // ✅ Save or update general profile data (name, bio, education, portfolio)
    public ProfleDataModel saveOrUpdateUser(ProfleDataModel user) {
        Optional<ProfleDataModel> existing = userRepository.findByEmail(user.getEmail());

        if (existing.isPresent()) {
            ProfleDataModel updateUser = existing.get();
            updateUser.setName(user.getName());
            updateUser.setBio(user.getBio());
            updateUser.setEducation(user.getEducation());
            updateUser.setPortfolio(user.getPortfolio());
            // ⚠️ Do not overwrite avatar here, avatar is updated separately
            return userRepository.save(updateUser);
        }

        return userRepository.save(user);
    }

    // ✅ New method: update only avatar path
    public ProfleDataModel updateUserAvatar(String email, String avatarPath) {
        Optional<ProfleDataModel> existing = userRepository.findByEmail(email);

        if (existing.isPresent()) {
            ProfleDataModel user = existing.get();
            user.setAvatar(avatarPath); // save relative file path (/images/filename.png)
            return userRepository.save(user);
        }

        return null;
    }
}
