package com.example.server.CareerPath.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class CareerPath {

	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String summary;

    private int matchScore;

    private String type; // e.g. technical, agriculture, government

    // Optional: store user ID if you have authentication
}
