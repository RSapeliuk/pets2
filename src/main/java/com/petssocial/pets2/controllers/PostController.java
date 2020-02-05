package com.petssocial.pets2.controllers;

import com.petssocial.pets2.dao.CityDAO;
import com.petssocial.pets2.dao.DistrictDAO;
import com.petssocial.pets2.dao.PostDAO;
import com.petssocial.pets2.models.*;
import com.petssocial.pets2.security.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
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
    private DistrictDAO districtDAO;
    @Autowired
    private PostDAO postDAO;
    @Autowired
    private CityDAO cityDAO;
    @Autowired
    private FilterService filterService;

    private LocalDate todayDate = LocalDate.now();

    @GetMapping("/posts")
    public List<Post> getPosts() {
        List<Post> posts = postDAO.findAllByEnabledIsTrue();
        for (Post post : posts) {
            if (post.getExpirationDate() != null)
                if (post.getExpirationDate().toLocalDate().isBefore(todayDate)) {
                    post.setEnabled(false);
                    postService.savePost(post);
                }
        }
        return posts;
    }

    @GetMapping("/user/{id}/posts")
    public List<Post> getUserPosts(@PathVariable Integer id) {
        return postService.findPostsByUserId(id);
    }

    @PostMapping("user/{id}/addPost/{petId}/{districtId}")
    public Post savePostWithPet(@RequestBody Post post, @PathVariable int id, @PathVariable int petId, @PathVariable int districtId) {
        User user = userService.findOneByID(id);
        Pet pet = petService.findById(petId);
        District one = districtDAO.getOne(districtId);
        post.setPet(pet);
        post.setUser(user);
        post.setPostDistrict(one);
        postService.savePost(post);
        return post;
    }

    @PostMapping("user/{id}/addPost/{districtID}")
    public Post savePost(@RequestBody Post post, @PathVariable int id, @PathVariable int districtID) {
        User user = userService.findOneByID(id);
        District one = districtDAO.getOne(districtID);
        post.setUser(user);
        post.setPostDistrict(one);
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

    @GetMapping("/getCity")
    public List<City> getCities() {
        return cityDAO.findAll();
    }

    @GetMapping("/getDistricts")
    public List<District> getDistricts() {
        return districtDAO.findAll();
    }

    @GetMapping("/")
    public List<Post> getFilteredPosts(@RequestParam(required = false) String city,
                                       @RequestParam(required = false) String district,
                                       @RequestParam(required = false) String type) {
        List<Post> posts = new ArrayList<>();
        filterService.filterPosts(city,district,type,posts);
        return posts;
    }
}
