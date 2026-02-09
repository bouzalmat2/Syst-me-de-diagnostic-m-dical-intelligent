package org.example.patientservice.controller;

import org.example.patientservice.entity.Appointment;
import org.example.patientservice.entity.ClinicalNote;
import org.example.patientservice.repository.ClinicalNoteRepository;
import org.example.patientservice.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin("*")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private ClinicalNoteRepository clinicalNoteRepository;

    @PostMapping("/book")
    public ResponseEntity<Appointment> bookAppointment(@RequestBody Appointment appointment,
                                                       @RequestHeader("loggedInUser") String username) {
        return ResponseEntity.ok(appointmentService.bookAppointment(appointment, username));
    }

    @GetMapping("/my")
    public ResponseEntity<List<Appointment>> getMyAppointments(Authentication authentication) {
        String currentUsername = authentication.getName();
        return ResponseEntity.ok(appointmentService.getAppointmentsByPatient(currentUsername));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<Appointment> cancelAppointment(@PathVariable Long id, Authentication auth) {
        return ResponseEntity.ok(appointmentService.cancelAppointment(id, auth.getName()));
    }


    @GetMapping("/doctor/{doctorName}")
    public ResponseEntity<List<Appointment>> getDoctorAppointments(@PathVariable String doctorName) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByDoctor(doctorName));
    }



    @PatchMapping("/{id}/status")
    public ResponseEntity<Appointment> updateAppointmentStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        return ResponseEntity.ok(appointmentService.updateStatus(id, status));
    }

    @GetMapping("/doctor/{doctorName}/stats")
    public ResponseEntity<Map<String, Long>> getDoctorStats(@PathVariable String doctorName) {
        return ResponseEntity.ok(appointmentService.getDoctorDashboardStats(doctorName));
    }
    @PostMapping("/notes")
    public ResponseEntity<ClinicalNote> addNote(@RequestBody ClinicalNote note) {
        return ResponseEntity.ok(clinicalNoteRepository.save(note));
    }

    @GetMapping("/notes/{patientUsername}")
    public ResponseEntity<List<ClinicalNote>> getNotes(@PathVariable String patientUsername) {
        return ResponseEntity.ok(clinicalNoteRepository.findByPatientUsernameOrderByCreatedAtDesc(patientUsername));
    }
}