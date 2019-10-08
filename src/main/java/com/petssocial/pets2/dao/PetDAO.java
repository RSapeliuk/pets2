package com.petssocial.pets2.dao;

import com.petssocial.pets2.models.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetDAO extends JpaRepository<Pet,Integer> {
}
