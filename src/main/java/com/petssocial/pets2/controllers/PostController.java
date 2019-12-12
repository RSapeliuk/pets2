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
import java.util.Arrays;
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
    public Post savePost(@RequestBody Post post, @PathVariable int id, @PathVariable int districtID) {
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

    //    @GetMapping("/")
//    public List<Post> getFilteredPosts(@RequestParam(required = false) String city,
//                                       @RequestParam(required = false) String district,
//                                       @RequestParam(required = false) String type) {
//        List<Post> posts = postService.findAll();
//        posts.forEach(post -> {
//            post.setEnabled(false);
//        });
//        if (city != null) {
//            List<Post> cityName = postDAO.findAllByPostDistrict_City_Name(city);
//            cityName.forEach(post -> {
//                post.setEnabled(true);
//            });
//            if (type != null) {
//                cityName.forEach(post -> {
//                    if ((!post.getKind().equals(type))) {
//                        post.setEnabled(false);
//                    } else {
//                        post.setEnabled(true);
//                        if (district != null) {
//                            String[] split = district.split(",");
//                            for (String s : split) {
//                                System.out.println(s);
//                                if (post.getPostDistrict().getName().equals(s)) {
//                                    post.setEnabled(true);
//                                }
//                            }
//                        }
//                    }
//                });
//            }
//        }
//        if(type != null){
//            List<Post> byKind = postDAO.findByKind(type);
//            byKind.forEach(post -> {
//                post.setEnabled(true);
//            });
//            if(city != null){
//                byKind.forEach(post -> {
//                    if(!post.getPostDistrict().getCity().getName().equals(city)){
//                        post.setEnabled(false);
//                    } else {
//                        post.setEnabled(true);
//                    }
//                });
//            }
//        }
//        if (city == null && district == null && type == null) {
//            posts.forEach(post -> {
//                post.setEnabled(true);
//            });
//        }
//        return posts;
//    }
    @GetMapping("/")
    public List<Post> getFilteredPosts(@RequestParam(required = false) String city,
                                       @RequestParam(required = false) String district,
                                       @RequestParam(required = false) String type) {
        List<Post> posts = new ArrayList<>();
        if (city != null && district == null && type == null) {
            List<Post> allByPostDistrict_city_name = postDAO.findAllByPostDistrict_City_Name(city);
            posts.addAll(allByPostDistrict_city_name);
        }
        if (city != null && district != null && type == null) {
            String[] split = district.split(",");
            for (String s : split) {
                List<Post> postss = postDAO.findAllByPostDistrict_City_NameAndPostDistrict_Name(city, s);
                posts.addAll(postss);
            }
        }
        if (type != null && district != null && city != null) {
            String[] split = district.split(",");
            for (String s : split) {
                List<Post> kind = postDAO.findAllByPostDistrict_City_NameAndPostDistrict_NameAndKind(city, s, type);
                posts.addAll(kind);
            }
        }
        if (type != null && district == null && city == null) {
            String[] split = district.split(",");
            for (String s : split) {
                List<Post> kind = postDAO.findByKind(type);
                posts.addAll(kind);
            }

        }
        if (type != null && district == null && city != null) {
            List<Post> postList = postDAO.findByKindAndPostDistrict_City_Name(type, city);
            posts.addAll(postList);
        }
        if(posts.isEmpty()){
            return postDAO.findAll();
        }
        return posts;
    }
}
