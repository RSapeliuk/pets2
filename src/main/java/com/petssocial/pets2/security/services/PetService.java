package com.petssocial.pets2.security.services;

import com.petssocial.pets2.models.Pet;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PetService {
    void savePet(Pet pet);
    List<Pet> findAll();
    List<Pet> findPetsByUserId(Integer id);
    Pet findById(Integer id);
}
