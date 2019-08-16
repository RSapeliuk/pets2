package com.petssocial.pets2.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
@CrossOrigin(origins = "*")
@Controller
public class MainController {

    @GetMapping("/")
    public String home(){
        return "forward:index.html";
    }

}
