package com.petssocial.pets2.security.services.impl;

import com.petssocial.pets2.dao.CityDAO;
import com.petssocial.pets2.dao.DistrictDAO;
import com.petssocial.pets2.dao.PostDAO;
import com.petssocial.pets2.models.Post;
import com.petssocial.pets2.models.User;
import com.petssocial.pets2.security.services.PostService;
import com.petssocial.pets2.security.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PostServiceImpl implements PostService {
    @Autowired
    private PostDAO postDAO;
    @Autowired
    private DistrictDAO districtDAO;
    @Autowired
    private CityDAO cityDAO;
    @Autowired
    private UserService userService;


    @Override
    public void savePost(Post post) {
        postDAO.save(post);
    }

    @Override
    public List<Post> findAll() {
        return postDAO.findAll();
    }

    public List<Post> findPostsByUserId(Integer id) {
        User user = userService.findOneByID(id);
        return user.getPosts();
    }

    @Override
    public Post findById(Integer id) {
        return postDAO.getOne(id);
    }

    @Override
    public List<Post> findByCityId(Integer id) {
        return null;
    }

    @Override
    public List<Post> filterPostsByCity(String city) {
        List<Post> filteredPosts = new ArrayList<>();
        List<Post> posts = postDAO.findAll();
        posts.forEach(post -> {
            if ((post.getPostDistrict().getCity().getName().toString().equals(city))) {
                filteredPosts.add(post);
            }
        });
        return filteredPosts;
    }

    @Override
    public List<Post> filterPostsByType(String type) {
        List<Post> filteredPosts = new ArrayList<>();
        List<Post> posts = postDAO.findAll();
        posts.forEach(post -> {
            if ((post.getKind().toString().equals(type))) {
                filteredPosts.add(post);
            }
        });
        return filteredPosts;
    }

    @Override
    public List<Post> filterPostsByDistrict(String districtLviv, String districtKyiv) {
        return null;
    }
}
