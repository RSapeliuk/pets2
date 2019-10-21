package com.petssocial.pets2.controllers;

import com.petssocial.pets2.models.User;
import com.petssocial.pets2.security.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class WebSocketController {

    private final SimpMessagingTemplate template;
    @Autowired
    private UserService userService;

    public WebSocketController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @MessageMapping("/send/message/{userId}")
    public void onReceivedMessage(String message, @PathVariable int userId) {
        User oneByID = userService.findOneByID(userId);
        this.template.convertAndSendToUser(oneByID.getName(), "/chat", message);
    }
}
