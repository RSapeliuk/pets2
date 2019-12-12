package com.petssocial.pets2.controllers;


import com.petssocial.pets2.dao.UserDAO;
import com.petssocial.pets2.models.User;
import com.petssocial.pets2.security.services.FileService;
import com.petssocial.pets2.security.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@AllArgsConstructor
public class UserController {
    private UserService userService;
    private UserDAO userDAO;
    private PasswordEncoder encoder;
    private FileService fileService;

    @PostMapping("/signup")
    public User saveUser(@RequestBody User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        userService.save(user);
        System.out.println(user);
        return user;
    }

    @GetMapping("/authUser")
    public User authUser() {
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

    @PutMapping("/edit/{userId}")
    public User editUser(@PathVariable int userId, @RequestBody User user) {
        User userbyId = userService.findOneByID(userId);
        userbyId.setName(user.getName());
        userbyId.setSurname(user.getSurname());
        userbyId.setEmail(user.getEmail());
        userService.save(userbyId);
        return userbyId;
    }
    @PutMapping("/updateUserAvatar/{userId}")
    public void updateAvatar(@RequestParam("file") MultipartFile file, @PathVariable int userId) throws IOException {
        User one = userDAO.getOne(userId);
        one.setAvatar(file.getOriginalFilename());
        fileService.storeFile(file);
    }

    @PutMapping("/rating/{userId}")
    public Double editUserRating(@PathVariable int userId, @RequestBody User user) {
        User userById = userService.findOneByID(userId);
        if (userById.getRating() == 0) {
            userById.setRating(user.getRating());
        } else if (userById.getRating() > 0) {
            userById.setRating((userById.getRating() + user.getRating()) / 2);
        }
        System.out.println(userById);
        userService.save(userById);
        return userById.getRating();
    }
}
