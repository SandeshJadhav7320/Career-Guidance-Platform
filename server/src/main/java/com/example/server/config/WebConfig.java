package com.example.server.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Folder where you save images (Desktop/myphotos/image)
        String uploadPath = System.getProperty("user.home") + "/Desktop/myphotos/image/";

        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:" + uploadPath);
    }
}
