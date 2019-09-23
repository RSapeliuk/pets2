package com.petssocial.pets2.controllers;


import com.petssocial.pets2.dao.UserDAO;
import com.petssocial.pets2.models.User;
import com.petssocial.pets2.security.services.FileService;
import com.petssocial.pets2.security.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserDAO userDAO;
    @Autowired
   private PasswordEncoder encoder;
    @Autowired
    private FileService fileService;

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
    @GetMapping("/authUser")
    public User authUser(){
        String s = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        String[] s1 = s.split(" ");
        User byUsername = userDAO.findByUsername(s1[0]);
        System.out.println(byUsername);
        return byUsername;
    }
    @PostMapping("/addAvatar")
    public void saveAvatar(@RequestParam("file") MultipartFile file) throws IOException {
        fileService.storeFile(file);
    }
}
