package com.petssocial.pets2.controllers;


import com.petssocial.pets2.models.User;
import com.petssocial.pets2.security.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = "*")
@RestController
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
   private PasswordEncoder encoder;

    @GetMapping("/users")
    public List<User> getUser(){
        return userService.findAll();
    }

    @PostMapping("/signup")
    public User saveUser(@RequestBody User user){
        user.setPassword(encoder.encode(user.getPassword()));
        userService.save(user);
        System.out.println(user);
        return user;
    }

}
