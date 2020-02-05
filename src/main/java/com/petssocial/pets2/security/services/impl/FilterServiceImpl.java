package com.petssocial.pets2.security.services.impl;

import com.petssocial.pets2.dao.PostDAO;
import com.petssocial.pets2.models.Post;
import com.petssocial.pets2.security.services.FilterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FilterServiceImpl implements FilterService {
    @Autowired
    private PostDAO postDAO;

    @Override
    public List<Post> filterPosts(String city,
                                  String district,
                                  String type,
                                  List<Post> posts) {
        if (city != null && district == null && type == null) {
            List<Post> allByPostDistrict_city_name = postDAO.findAllByPostDistrict_City_Name(city);
            posts.addAll(allByPostDistrict_city_name);
        }
        if (city != null && district != null && type == null) {
            String[] split = district.split(",");
            for (String s : split) {
                List<Post> postss = postDAO.findAllByPostDistrict_City_NameAndPostDistrict_Name(city, s);
                posts.addAll(postss);
            }
        }
        if (type != null && district != null && city != null) {
            String[] split = district.split(",");
            for (String s : split) {
                List<Post> kind = postDAO.findAllByPostDistrict_City_NameAndPostDistrict_NameAndKind(city, s, type);
                posts.addAll(kind);
            }
        }
        if (type != null && district == null && city == null) {
            List<Post> kind = postDAO.findByKind(type);
            posts.addAll(kind);

        }
        if (type != null && district == null && city != null) {
            List<Post> postList = postDAO.findByKindAndPostDistrict_City_Name(type, city);
            posts.addAll(postList);
        }
        return posts;
    }
}
