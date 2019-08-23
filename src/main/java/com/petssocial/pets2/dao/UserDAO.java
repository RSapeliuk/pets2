package com.petssocial.pets2.dao;


import com.petssocial.pets2.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface UserDAO extends JpaRepository<User,Integer> {
    User findByUsername(String username);

}
