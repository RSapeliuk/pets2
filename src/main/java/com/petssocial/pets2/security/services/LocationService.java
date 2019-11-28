package com.petssocial.pets2.security.services;

import com.petssocial.pets2.models.Location;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface LocationService {
    List<Location> findByCity();
    List<Location> findByDistrict();
}
