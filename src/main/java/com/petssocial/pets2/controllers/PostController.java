package com.petssocial.pets2.controllers;

import com.petssocial.pets2.models.Post;
import com.petssocial.pets2.models.User;
import com.petssocial.pets2.security.services.PostService;
import com.petssocial.pets2.security.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PostController {
    @Autowired
    private PostService postService;
    @Autowired
    private UserService userService;
    
    @GetMapping("/posts")    
    public List<Post> getPosts(){
        return postService.findAll();
    }
    
    @GetMapping("/user/{id}/posts")
    public List<Post> getUserPosts(@PathVariable User id){
        return postService.findAll();
    }

    @PostMapping("/addPost/{id}")
    public Post postPost(@RequestBody Post post, @PathVariable int id){
        User user =  userService.findOnebyID(id);
        post.setUser(user);
        System.out.println(user);
        postService.savePost(post);
        return post;
    }
}
