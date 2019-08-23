package com.petssocial.pets2.dao;

import com.petssocial.pets2.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostDAO extends JpaRepository<Post, Integer> {
}
