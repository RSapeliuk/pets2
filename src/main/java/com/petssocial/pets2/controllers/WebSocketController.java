package com.petssocial.pets2.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.petssocial.pets2.dao.MessageDAO;
import com.petssocial.pets2.dao.UserDAO;
import com.petssocial.pets2.models.Greetings;
import com.petssocial.pets2.models.HelloMessage;
import com.petssocial.pets2.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.HtmlUtils;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
public class WebSocketController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private UserDAO userDAO;
    @Autowired
    private MessageDAO messageDAO;

    @PostMapping("/api/socket")
    public void useSimpleRest(@RequestBody Map<String, String> message){
        if(message.containsKey("content")) {
            User fromId = userDAO.findByUsername(message.get("fromId"));
            User toId = userDAO.findByUsername(message.get("toId"));
            Greetings greetings = new Greetings();
            greetings.setFromId(fromId);
            greetings.setToId(toId);
            greetings.setContent(message.get("content"));
            messageDAO.save(greetings);
        }
    }
    @MessageMapping("/hello")
    public Map<String, String> useSocketCommunication(String message) {
        ObjectMapper mapper = new ObjectMapper();
        Map<String, String> messageConverted = null;
        try {
            messageConverted = mapper.readValue(message, Map.class);
        } catch (IOException e) {
            messageConverted = null;
        }
        if (messageConverted != null) {
            System.out.println("!!!!!!!!!!");
            System.out.println(messageConverted);
            if (messageConverted.containsKey("toId") && messageConverted.get("toId") != null && !messageConverted.get("toId").equals("")) {
                System.out.println("???????????????????");
                this.simpMessagingTemplate.convertAndSend("/topic/" + messageConverted.get("toId"), messageConverted);
                this.simpMessagingTemplate.convertAndSend("/topic/" + messageConverted.get("fromId"), message);
            } else {
                this.simpMessagingTemplate.convertAndSend("/topic/", messageConverted);
            }
        }
        return messageConverted;
    }
    @GetMapping("/user/messages")
    public List<Greetings> getMessages(){
        return messageDAO.findAll();
    }
}

