package org.example.doctorservice.controller;

import org.example.doctorservice.entity.Doctor;
import org.example.doctorservice.repository.DoctorRepository;
import org.example.doctorservice.proxy.AppointmentProxy;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctors")
public class DoctorController {

    private final DoctorRepository doctorRepository;
    private final AppointmentProxy appointmentProxy;


    public DoctorController(DoctorRepository doctorRepository, AppointmentProxy appointmentProxy) {
        this.doctorRepository = doctorRepository;
        this.appointmentProxy = appointmentProxy;
    }

    @GetMapping("/all")
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @PostMapping("/add")
    public Doctor saveDoctor(@RequestBody Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Doctor> updateDoctor(@PathVariable Long id, @RequestBody Doctor details) {
        return doctorRepository.findById(id).map(doctor -> {
            doctor.setFirstName(details.getFirstName());
            doctor.setLastName(details.getLastName());
            doctor.setSpecialty(details.getSpecialty());
            doctor.setEmail(details.getEmail());
            doctor.setPhoneNumber(details.getPhoneNumber());
            doctor.setUsername(details.getUsername());
            return ResponseEntity.ok(doctorRepository.save(doctor));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable Long id) {
        if (doctorRepository.existsById(id)) {
            doctorRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }


    @GetMapping("/appointments/{doctorName}")
    public ResponseEntity<List<Object>> getDoctorAppointments(@PathVariable String doctorName) {

        return ResponseEntity.ok(appointmentProxy.getDoctorAppointments(doctorName));
    }


    @PutMapping("/appointments/{id}/status")
    public ResponseEntity<Object> updateAppointmentStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return ResponseEntity.ok(appointmentProxy.updateStatus(id, status));
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getDoctorCount() {
        return ResponseEntity.ok(doctorRepository.count());
    }
    
    @GetMapping("/username/{username}")
    public ResponseEntity<Doctor> getDoctorByUsername(@PathVariable String username) {
        return doctorRepository.findByUsername(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/username/{username}")
    public ResponseEntity<Doctor> updateDoctorByUsername(@PathVariable String username, @RequestBody Doctor doctorData) {
        return doctorRepository.findByUsername(username)
                .map(doctor -> {
                    if (doctorData.getFirstName() != null) doctor.setFirstName(doctorData.getFirstName());
                    if (doctorData.getLastName() != null) doctor.setLastName(doctorData.getLastName());
                    if (doctorData.getSpecialty() != null) doctor.setSpecialty(doctorData.getSpecialty());
                    if (doctorData.getEmail() != null) doctor.setEmail(doctorData.getEmail());
                    if (doctorData.getPhoneNumber() != null) doctor.setPhoneNumber(doctorData.getPhoneNumber());
                    return ResponseEntity.ok(doctorRepository.save(doctor));
                })
                .orElseGet(() -> {
                    Doctor newDoctor = new Doctor();
                    newDoctor.setUsername(username);
                    newDoctor.setFirstName(doctorData.getFirstName());
                    newDoctor.setLastName(doctorData.getLastName());
                    newDoctor.setSpecialty(doctorData.getSpecialty());
                    newDoctor.setEmail(doctorData.getEmail());
                    newDoctor.setPhoneNumber(doctorData.getPhoneNumber());
                    return ResponseEntity.ok(doctorRepository.save(newDoctor));
                });
    }
}