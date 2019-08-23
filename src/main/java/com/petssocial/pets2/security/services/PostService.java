package com.petssocial.pets2.security.services;

import com.petssocial.pets2.models.Post;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface PostService {
    void savePost(Post post);
    List<Post> findAll();
    Post findById(Integer id);
}
