package com.petssocial.pets2.dao;

import com.petssocial.pets2.models.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationDAO extends JpaRepository<Location, Integer> {
}
