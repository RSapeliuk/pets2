package com.petssocial.pets2.security.services.impl;

import com.petssocial.pets2.dao.PetDAO;
import com.petssocial.pets2.models.Pet;
import com.petssocial.pets2.models.User;
import com.petssocial.pets2.security.services.PetService;
import com.petssocial.pets2.security.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PetServiceImpl implements PetService {

    @Autowired
    private PetDAO petDAO;

    @Autowired
    private UserService userService;

    @Override
    public void savePet(Pet pet) {
        petDAO.save(pet);
    }

    @Override
    public List<Pet> findAll() {
        return petDAO.findAll();
    }

    @Override
    public List<Pet> findPetsByUserId(Integer id) {
        User user = userService.findOneByID(id);
        List<Pet> pets = user.getPets();
        return pets;
    }

    @Override
    public Pet findById(Integer id) {
        return petDAO.getOne(id);
    }
}
