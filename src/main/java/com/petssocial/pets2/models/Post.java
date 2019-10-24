package com.petssocial.pets2.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.petssocial.pets2.models.enums.KindOfPost;
import lombok.*;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@Builder
@ToString

@JsonIgnoreProperties(ignoreUnknown = true)
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    @Enumerated(EnumType.STRING)
    private KindOfPost kind;
    private Date date;
    private Date expirationDate;
    private String photo;
    private String optionalField;
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private User user;
    private boolean enabled = true;
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Pet pet;
    private int price;

    public Post() {
    }
}
