package com.petssocial.pets2.controllers;

import com.petssocial.pets2.models.Greetings;
import com.petssocial.pets2.models.HelloMessage;
import com.petssocial.pets2.models.User;
import com.petssocial.pets2.security.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.util.HtmlUtils;

@Controller
public class WebSocketController {

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greetings greeting(HelloMessage message) throws Exception {
        Thread.sleep(1000); // simulated delay
        return new Greetings("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
    }

}
