package org.example.authservice.controller;

import org.example.authservice.entity.User;
import org.example.authservice.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            logger.info("Registration attempt for username: {}, email: {}, role: {}", 
                user.getUsername(), user.getEmail(), user.getRole());
            
            User registeredUser = authService.registerUser(user);
            logger.info("User registered successfully: {}", registeredUser.getUsername());
            
            return ResponseEntity.ok(registeredUser);
        } catch (Exception e) {
            logger.error("Registration failed for username: {}", user.getUsername(), e);
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {

            String token = authService.authenticateAndGenerateToken(user.getUsername(), user.getPassword());


            User fullUser = authService.getUserByUsername(user.getUsername());


            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("username", fullUser.getUsername());
            response.put("role", fullUser.getRole());

            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {

            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
    
    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        try {
            logger.info("Fetching all users from database");
            return ResponseEntity.ok(authService.getAllUsers());
        } catch (Exception e) {
            logger.error("Error fetching users", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            logger.info("Deleting user with id: {}", id);
            authService.deleteUser(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            logger.error("Error deleting user", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestHeader("loggedInUser") String username) {
        try {
            logger.info("Fetching profile for user: {}", username);
            Map<String, Object> profile = authService.getUserProfile(username);
            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            logger.error("Error fetching profile for user: {}", username, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(
            @RequestHeader("loggedInUser") String username,
            @RequestBody Map<String, Object> profileData) {
        try {
            logger.info("Updating profile for user: {}", username);
            Map<String, Object> updatedProfile = authService.updateUserProfile(username, profileData);
            return ResponseEntity.ok(updatedProfile);
        } catch (Exception e) {
            logger.error("Error updating profile for user: {}", username, e);
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
}