package com.example.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
public class SecurityConfig {

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	    http
	      .csrf(AbstractHttpConfigurer::disable)
	      .cors(cors -> cors.configurationSource(corsConfigurationSource()))
	      .authorizeHttpRequests(auth -> auth
	         .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
	         .requestMatchers(
	                    "/api/auth/google-login",
	                    "/api/assessment/analyze",
	                    "/api/title",
	                    "/api/save-career-path",
	                    "/api/get-career-path",
	                    "/api/get-career-path-by-id"
	                ).permitAll()
	         .anyRequest().authenticated()
	      )
	      .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
	    return http.build();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
	    CorsConfiguration config = new CorsConfiguration();
	    config.setAllowedOriginPatterns(List.of("http://localhost:5173", "https://career-guidance-platform.vercel.app"));
	    config.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
	    config.setAllowedHeaders(List.of("*"));
	    config.setAllowCredentials(true);

	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    source.registerCorsConfiguration("/**", config);
	    return source;
	}

}
