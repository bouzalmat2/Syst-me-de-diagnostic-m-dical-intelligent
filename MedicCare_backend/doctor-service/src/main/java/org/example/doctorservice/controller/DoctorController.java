package org.example.doctorservice.controller;

import org.example.doctorservice.entity.Doctor;
import org.example.doctorservice.repository.DoctorRepository;
import org.example.doctorservice.proxy.AppointmentProxy;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctors")
@CrossOrigin("*")
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


    @PatchMapping("/appointments/{id}/status")
    public ResponseEntity<Object> updateAppointmentStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return ResponseEntity.ok(appointmentProxy.updateStatus(id, status));
    }
}