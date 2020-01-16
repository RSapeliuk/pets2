package com.petssocial.pets2.security.services;

import com.petssocial.pets2.models.Post;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FilterService {
    List<Post> filterPosts(String city, String district, String type, List<Post> posts);
}
