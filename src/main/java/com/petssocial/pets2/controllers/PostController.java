package com.petssocial.pets2.controllers;

import com.petssocial.pets2.dao.LocationDAO;
import com.petssocial.pets2.models.Location;
import com.petssocial.pets2.models.Pet;
import com.petssocial.pets2.models.Post;
import com.petssocial.pets2.models.User;
import com.petssocial.pets2.security.services.FileService;
import com.petssocial.pets2.security.services.PetService;
import com.petssocial.pets2.security.services.PostService;
import com.petssocial.pets2.security.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
public class PostController {
    @Autowired
    private PostService postService;
    @Autowired
    private UserService userService;
    @Autowired
    private FileService fileService;
    @Autowired
    private PetService petService;
    @Autowired
    private LocationDAO locationDAO;

    public LocalDate todayDate = LocalDate.now();

    @GetMapping("/posts")
    public List<Post> getPosts() {
        List<Post> posts = postService.findAll();
        for (Post post : posts) {
            if (post.getExpirationDate() != null)
                if (post.getExpirationDate().toLocalDate().isBefore(todayDate))
                    post.setEnabled(false);
        }
        return posts;
    }

    @GetMapping("/user/{id}/posts")
    public List<Post> getUserPosts(@PathVariable Integer id) {
        return postService.findPostsByUserId(id);
    }

    @PostMapping("user/{id}/addPost/{petId}")
    public Post savePostWithPet(@RequestBody Post post, @PathVariable int id, @PathVariable int petId) {
        User user = userService.findOneByID(id);
        Pet pet = petService.findById(petId);
        System.out.println(2);
        post.setPet(pet);
        post.setUser(user);
        System.out.println(user);
        System.out.println(pet);
        postService.savePost(post);
        return post;
    }

    @PostMapping("/addLocation/{postId}")
    public Location saveLocation(@RequestBody Location location, @PathVariable int postId) {
        Post post = postService.findById(postId);
        location.setPost(post);
        locationDAO.save(location);
        return location;
    }

    @PostMapping("user/{id}/addPost/")
    public Post savePost(@RequestBody Post post, @PathVariable int id) {
        User user = userService.findOneByID(id);
        System.out.println(2);
        post.setUser(user);
        System.out.println(user);
        postService.savePost(post);
        return post;
    }

    @PostMapping("/addPhoto")
    public void savePhoto(@RequestParam("file") MultipartFile file) throws IOException {
        fileService.storeFile(file);
    }


    @GetMapping("/post/{id}")
    public Post getPostById(@PathVariable int id) {
        return postService.findById(id);
    }

    @GetMapping("/getPostLocation/{postId}")
    public Location getPostLocation(@PathVariable int postId) {
        Post byId = postService.findById(postId);
        return byId.getPostLocation();
    }
}
