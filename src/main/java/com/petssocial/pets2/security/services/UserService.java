package com.petssocial.pets2.security.services;


import com.petssocial.pets2.models.User;
import com.sun.tools.javac.util.List;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public interface UserService extends UserDetailsService {
    void save(User user);
    List<User> findAll();
    User findOnebyID (Integer id);
}
