package org.example.authservice.controller;

import org.example.authservice.entity.User;
import org.example.authservice.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        return ResponseEntity.ok(authService.registerUser(user));
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
}