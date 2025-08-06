package com.example.server.ProfileData.service;

import com.example.server.ProfileData.model.User;
import com.example.server.ProfileData.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("profileDataService")

public class ProfileDataService {

    @Autowired
    private UserRepository userRepository;

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public User saveOrUpdateUser(User user) {
        Optional<User> existing = userRepository.findByEmail(user.getEmail());

        if (existing.isPresent()) {
            User updateUser = existing.get();
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
