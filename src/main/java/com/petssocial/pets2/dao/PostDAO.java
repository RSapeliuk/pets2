package com.petssocial.pets2.dao;

import com.petssocial.pets2.models.City;
import com.petssocial.pets2.models.District;
import com.petssocial.pets2.models.Post;
import com.petssocial.pets2.models.enums.KindOfPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostDAO extends JpaRepository<Post, Integer> {
    List<Post> findByKind(String kind);
    List<Post> findByKindAndPostDistrict_City_Name(String kind, String city);
    List<Post> findAllByPostDistrict_City_Name(String city);
    List<Post> findAllByPostDistrict_City_NameAndPostDistrict_Name(String city, String district);
    List<Post> findAllByPostDistrict_City_NameAndPostDistrict_NameAndKind(String city,
                                                                String district,
                                                                String kind);
    List<Post> findAllByEnabledIsTrue();
}
