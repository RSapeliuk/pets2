package com.petssocial.pets2.security.services.impl;


import com.petssocial.pets2.dao.UserDAO;
import com.petssocial.pets2.models.User;
import com.petssocial.pets2.models.enums.Role;
import com.petssocial.pets2.security.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDAO userDAO;

    @Override
    public void save(User user) {
        if (user != null) {
            userDAO.save(user);
        }
        System.out.println("Error! User is not defined");
    }

    @Override
    public List<User> findAll() {
        return userDAO.findAll();
    }


    @Override
    public User findOneByID(Integer id) {
        return userDAO.getOne(id);
    }

    @Override
    public UserDetails loadUserByUsername(@RequestParam("username") String username) throws UsernameNotFoundException {

        User user = userDAO.findByUsername(username);
        return user;
    }

    @Override
    public Role changeRole(String role, User user) {
        if (role.equals(Role.ROLE_USER.toString())){
            user.setRole(Role.ROLE_USER);
        } else if (role.equals(Role.ROLE_ADMIN.toString())) {
            user.setRole(Role.ROLE_ADMIN);
        }
        return user.getRole();
    }
}
