package com.petssocial.pets2.dao;

import com.petssocial.pets2.models.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityDAO extends JpaRepository<City, Integer> {
}
