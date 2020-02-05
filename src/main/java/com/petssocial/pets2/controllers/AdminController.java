package com.petssocial.pets2.controllers;

import com.petssocial.pets2.dao.CityDAO;
import com.petssocial.pets2.dao.DistrictDAO;
import com.petssocial.pets2.models.City;
import com.petssocial.pets2.models.District;
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
    @Autowired
    private CityDAO cityDAO;
    @Autowired
    private DistrictDAO districtDAO;

    @GetMapping("/admin/users")
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    @PutMapping("/admin/changeUserRole/{userId}")
    public Role changeUserRole(@PathVariable int userId, @RequestBody String role) {
        User oneByID = userService.findOneByID(userId);
        userService.changeRole(role, oneByID);
        userService.save(oneByID);
        return oneByID.getRole();
    }
    @PutMapping("/admin/isEnabled/{postId}")
    public boolean isEnabled(@PathVariable int postId, @RequestBody String enabled){
        Post byId = postService.findById(postId);
        if(enabled.equals("true")){
            byId.setEnabled(true);
        } else if (enabled.equals("false")){
            byId.setEnabled(false);
        }
        postService.savePost(byId);
        return byId.isEnabled();
    }
    @PostMapping("/admin/saveCity")
    public City saveCity(@RequestBody City city){
        return cityDAO.save(city);
    }
    @PostMapping("/admin/saveDistrict/{cityId}")
    public District saveDistrict(@RequestBody District district, @PathVariable int cityId){
        City city = cityDAO.getOne(cityId);
        district.setCity(city);
        return districtDAO.save(district);
    }
}
