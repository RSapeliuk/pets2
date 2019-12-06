package com.petssocial.pets2.security.services;

import com.petssocial.pets2.models.Post;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PostService {
    void savePost(Post post);
    List<Post> findAll();
    List<Post> findPostsByUserId(Integer id);
    Post findById(Integer id);
    List<Post> findByCityId(Integer id);
    List<Post> filterPostsByCity(String city);
    List<Post> filterPostsByType(String type);
    List<Post> filterPostsByDistrict(String districtLviv, String districtKyiv);
}
