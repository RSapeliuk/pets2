package com.petssocial.pets2.dao;

import com.petssocial.pets2.models.Greetings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageDAO extends JpaRepository<Greetings, Integer> {
}
