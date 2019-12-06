package com.petssocial.pets2.dao;

import com.petssocial.pets2.models.City;
import com.petssocial.pets2.models.District;
import com.petssocial.pets2.models.Post;
import com.petssocial.pets2.models.enums.KindOfPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostDAO extends JpaRepository<Post, Integer> {
    List<Post> findByKind(KindOfPost kind);
    List<Post> findAllByPostDistrict_City(City city);
    List<Post> findAllByPostDistrict(District district);
    List<Post> findAllByPostDistrict_CityAndPostDistrictAndKind(City city,
                                                                District district,
                                                                KindOfPost kind);
}
