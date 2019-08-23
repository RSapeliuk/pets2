package com.petssocial.pets2.security.services.impl;

import com.petssocial.pets2.dao.PostDAO;
import com.petssocial.pets2.models.Post;
import com.petssocial.pets2.security.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PostServiceImpl implements PostService {
    @Autowired
    private PostDAO postDAO;


    @Override
    public void savePost(Post post) {
        postDAO.save(post);
    }

    @Override
    public List<Post> findAll() {
        return postDAO.findAll();
    }

    @Override
    public Post findById(Integer id) {
        return postDAO.getOne(id);
    }
}
