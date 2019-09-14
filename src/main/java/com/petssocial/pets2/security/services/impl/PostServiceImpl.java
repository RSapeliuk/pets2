package com.petssocial.pets2.security.services.impl;

import com.petssocial.pets2.dao.PostDAO;
import com.petssocial.pets2.models.Post;
import com.petssocial.pets2.models.User;
import com.petssocial.pets2.security.services.PostService;
import com.petssocial.pets2.security.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;
@Service
public class PostServiceImpl implements PostService {
    @Autowired
    private PostDAO postDAO;
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

    public List<Post> findPostsByUserId(Integer id){
        User user = userService.findOnebyID(id);
        List<Post> posts = user.getPosts();
        return posts;
    }

    @Override
    public Post findById(Integer id) {
        return postDAO.getOne(id);
    }
}
