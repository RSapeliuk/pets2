package com.petssocial.pets2.controllers;

import com.petssocial.pets2.models.Post;
import com.petssocial.pets2.models.User;
import com.petssocial.pets2.models.enums.Role;
import com.petssocial.pets2.security.services.PostService;
import com.petssocial.pets2.security.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AdminController {
    @Autowired
    private UserService userService;
    @Autowired
    private PostService postService;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        List<User> userList = userService.findAll();
        return userList;
    }

    @PutMapping("/admin/changeUserRole/{userId}")
    public Role changeUserRole(@PathVariable int userId, @RequestBody String role) {
        User oneByID = userService.findOneByID(userId);
        if (role.equals(Role.ROLE_USER.toString())){
            oneByID.setRole(Role.ROLE_USER);
        } else if (role.equals(Role.ROLE_ADMIN.toString())) {
            oneByID.setRole(Role.ROLE_ADMIN);
        }
        userService.save(oneByID);
        return oneByID.getRole();
    }
    @PutMapping("/admin/isEnabled/{postId}")
    public boolean isEnabled(@PathVariable int postId, @RequestBody String enabled){
        Post byId = postService.findById(postId);
        System.out.println(enabled);
        if(enabled.equals("true")){
            byId.setEnabled(true);
        } else if (enabled.equals("false")){
            byId.setEnabled(false);
        }
        postService.savePost(byId);
        return byId.isEnabled();
    }
}
