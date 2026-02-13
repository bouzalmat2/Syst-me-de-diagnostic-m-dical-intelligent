package org.example.aiservice.controller;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/ai")
public class ChatController {

    @GetMapping("/chat")
    public String generate(@RequestParam(value = "message") String message) {
        return "AI Service is currently in 'Safe Mode' without API Key. Your message was: " + message;
    }
}