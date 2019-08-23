package com.petssocial.pets2.security.services;


import com.petssocial.pets2.models.User;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService extends UserDetailsService {
    void save(User user);
    List<User> findAll();
    User findOnebyID (Integer id);
    @Override
    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
}
