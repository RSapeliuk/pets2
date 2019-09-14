package com.petssocial.pets2.controllers;

import com.petssocial.pets2.models.Post;
import com.petssocial.pets2.models.User;
import com.petssocial.pets2.security.services.FileService;
import com.petssocial.pets2.security.services.PostService;
import com.petssocial.pets2.security.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
@RestController
public class PostController {
    @Autowired
    private PostService postService;
    @Autowired
    private UserService userService;
    @Autowired
    private FileService fileService;
    
    @GetMapping("/posts")    
    public List<Post> getPosts(){
        return postService.findAll();
    }
    
    @GetMapping("/user/{id}/posts")
    public List<Post> getUserPosts(@PathVariable Integer id){
        return postService.findPostsByUserId(id);
    }

    @PostMapping("user/{id}/addPost")
    public Post savePost(@RequestBody Post post, @PathVariable int id /*@RequestParam("file") MultipartFile file*/) throws IOException {
        User user = userService.findOnebyID(id);
        //fileService.storeFile(file);
        //post.setPhoto(file.getOriginalFilename());
        post.setUser(user);
        System.out.println(user);
        postService.savePost(post);
        return post;
    }
}
