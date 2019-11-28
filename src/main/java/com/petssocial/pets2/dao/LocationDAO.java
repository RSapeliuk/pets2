package com.petssocial.pets2.dao;

import com.petssocial.pets2.models.Location;
import com.petssocial.pets2.models.enums.City;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LocationDAO extends JpaRepository<Location, Integer> {
    List<Location> findLocationByCity(City city);
}
