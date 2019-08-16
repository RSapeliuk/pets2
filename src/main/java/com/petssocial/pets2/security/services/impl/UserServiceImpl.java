package com.petssocial.pets2.security.services.impl;


import com.petssocial.pets2.dao.UserDAO;
import com.petssocial.pets2.models.User;
import com.petssocial.pets2.security.services.UserService;;
import com.sun.tools.javac.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDAO userDAO;

    @Override
    public void save(User user) {
        if(user !=null){
            userDAO.save(user);
        }
        System.out.println("Error! User is not defined");
    }

    @Override
    public List<User> findAll() {
        return null;
    }


    @Override
    public User findOnebyID(Integer id) {
        return null;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userDAO.findByUsername(username);
    }

}
