package com.example.server.User.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.server.User.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
