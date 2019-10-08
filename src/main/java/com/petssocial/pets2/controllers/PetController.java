package com.petssocial.pets2.controllers;

import com.petssocial.pets2.models.Pet;
import com.petssocial.pets2.models.User;
import com.petssocial.pets2.security.services.FileService;
import com.petssocial.pets2.security.services.PetService;
import com.petssocial.pets2.security.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
public class PetController {

    @Autowired
    private PetService petService;
    @Autowired
    private UserService userService;
    @Autowired
    private FileService fileService;

    @PostMapping("/user/{id}/addPet")
    public Pet savePet(@PathVariable int id, @RequestBody Pet pet){
        User user = userService.findOneByID(id);
        pet.setUser(user);
        petService.savePet(pet);
        return pet;
    }
    @GetMapping("/user/{id}/getPets")
    public List<Pet> getPets(@PathVariable int id){
        List<Pet> petsByUserId = petService.findPetsByUserId(id);
        return petsByUserId;
    }

    @PostMapping("/addPetPhoto")
    public void savePetPhoto(@RequestParam("file") MultipartFile file) throws IOException {
        fileService.storeFile(file);
    }
}
