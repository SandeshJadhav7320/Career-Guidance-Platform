package com.example.server.CarrerPathDetails.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.server.CarrerPathDetails.model.*;
import com.example.server.CarrerPathDetails.service.CareerPathDetailService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend access
public class CarrerPathDetailsController {
	
	@Autowired
    private CareerPathDetailService detailService;

    @PostMapping("/title")
    public String receiveTitle(@RequestBody CarrerPathDetailsModel title) {
        return detailService.getCareerDetails(title.getTitle());
    }
    
}
