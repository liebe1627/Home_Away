package com.homeaway.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.homeaway.utils.JwtAuthFilter;

@Configuration
public class SecurityConfig {
	
	@Autowired
	private JwtAuthFilter jwtAuthFilter;
	@Autowired
	private UserDetailsService userDetailService;
	
//	public SecurityConfig(JwtAuthFilter jwtAuthFilter, UserDetailsService userDetailsService) {
//        this.jwtAuthFilter = jwtAuthFilter;
//        this.userDetailService = userDetailsService;
//    }
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
		System.out.println("Here arrived");
//		return http
//	            .csrf(csrf -> csrf.disable()) 
//	            .authorizeHttpRequests(auth -> auth
//	                .requestMatchers("/user/userLogin", "/user/addUser").permitAll() 
//	                .anyRequest().authenticated() 
//	            )
//	            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class) .build();

		 return http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
				 .csrf(customizer -> customizer.disable()).
				 sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)).
	                authorizeHttpRequests(request -> request
	                        .requestMatchers("/user/userLogin", "/user/register","/error","/user/forgetPassword","/booking").permitAll()
	                        .anyRequest().authenticated())
	                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
	                .build();
		 
	}
	
	@Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000")); // ✅ Allow frontend URL
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // ✅ Allow HTTP methods
        configuration.setAllowedHeaders(List.of("*")); // ✅ Allow all headers
        configuration.setAllowCredentials(true); // ✅ Allow Cookies & Authorization Headers

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
	
	@Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        System.out.println("Auth amnager");
		return authenticationConfiguration.getAuthenticationManager();
    }
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		System.out.println("Bcrypt");
		return new BCryptPasswordEncoder();
	}

}
