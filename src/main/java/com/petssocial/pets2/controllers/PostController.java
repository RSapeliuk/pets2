package com.petssocial.pets2.controllers;

import com.petssocial.pets2.dao.CityDAO;
import com.petssocial.pets2.dao.DistrictDAO;
import com.petssocial.pets2.dao.PostDAO;
import com.petssocial.pets2.models.*;
import com.petssocial.pets2.models.enums.KindOfPost;
import com.petssocial.pets2.security.services.FileService;
import com.petssocial.pets2.security.services.PetService;
import com.petssocial.pets2.security.services.PostService;
import com.petssocial.pets2.security.services.UserService;
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

    private LocalDate todayDate = LocalDate.now();

    @GetMapping("/posts")
    public List<Post> getPosts() {
        List<Post> posts = postService.findAll();
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
        System.out.println(2);
        post.setPet(pet);
        post.setUser(user);
        post.setPostDistrict(one);
        System.out.println(user);
        System.out.println(pet);
        postService.savePost(post);
        return post;
    }

    @PostMapping("user/{id}/addPost/{districtID}")
    public Post savePost(@RequestBody Post post, @PathVariable int id,@PathVariable int districtID) {
        User user = userService.findOneByID(id);
        District one = districtDAO.getOne(districtID);
        System.out.println(2);
        post.setUser(user);
        post.setPostDistrict(one);
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
                                       @RequestParam(required = false) String districtKyiv,
                                       @RequestParam(required = false) String districtLviv,
                                       @RequestParam(required = false) String type) {
        List<Post> filteredPosts = new ArrayList<>();
        List<Post> postsByCity = postService.filterPostsByCity(city);
        List<Post> postsByType = postService.filterPostsByType(type);
        if ((postsByType != null)) {
            filteredPosts.addAll(postsByType);
            System.out.println(111111111);
        }
        if(postsByCity != null){
            filteredPosts.addAll(postsByCity);
            System.out.println(222222222);
        }
        return filteredPosts;
    }

}
