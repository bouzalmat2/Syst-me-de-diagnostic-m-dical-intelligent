package org.example.authservice.service;

import org.example.authservice.entity.User;
import org.example.authservice.repository.UserRepository;
import org.example.authservice.client.PatientClient;
import org.example.authservice.client.DoctorClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private PatientClient patientClient;
    
    @Autowired
    private DoctorClient doctorClient;

    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public String authenticateAndGenerateToken(String username, String password) {
        User foundUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (passwordEncoder.matches(password, foundUser.getPassword())) {
            return jwtService.generateToken(foundUser.getUsername(), foundUser.getRole());
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));
    }
    
    public java.util.List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }
    
    public Map<String, Object> getUserProfile(String username) {
        User user = getUserByUsername(username);
        Map<String, Object> profile = new HashMap<>();
        profile.put("username", user.getUsername());
        profile.put("email", user.getEmail());
        profile.put("role", user.getRole());
        
        // Fetch role-specific data
        if ("PATIENT".equals(user.getRole())) {
            try {
                Map<String, Object> patientData = patientClient.getPatientByUsername(username);
                profile.putAll(patientData);
            } catch (Exception e) {
                // Patient record may not exist yet
            }
        } else if ("DOCTOR".equals(user.getRole())) {
            try {
                Map<String, Object> doctorData = doctorClient.getDoctorByUsername(username);
                profile.putAll(doctorData);
            } catch (Exception e) {
                // Doctor record may not exist yet
            }
        }
        
        return profile;
    }
    
    public Map<String, Object> updateUserProfile(String username, Map<String, Object> profileData) {
        User user = getUserByUsername(username);
        
        // Update email in User table if provided
        if (profileData.containsKey("email")) {
            user.setEmail((String) profileData.get("email"));
            userRepository.save(user);
        }
        
        // Update role-specific data
        if ("PATIENT".equals(user.getRole())) {
            try {
                patientClient.updatePatientByUsername(username, profileData);
            } catch (Exception e) {
                throw new RuntimeException("Failed to update patient profile: " + e.getMessage());
            }
        } else if ("DOCTOR".equals(user.getRole())) {
            try {
                doctorClient.updateDoctorByUsername(username, profileData);
            } catch (Exception e) {
                throw new RuntimeException("Failed to update doctor profile: " + e.getMessage());
            }
        }
        
        return getUserProfile(username);
    }
}