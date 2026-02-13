package org.example.authservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@FeignClient(name = "doctor-service")
public interface DoctorClient {
    
    @GetMapping("/doctors/username/{username}")
    Map<String, Object> getDoctorByUsername(@PathVariable String username);
    
    @PutMapping("/doctors/username/{username}")
    Map<String, Object> updateDoctorByUsername(@PathVariable String username, @RequestBody Map<String, Object> doctorData);
}
