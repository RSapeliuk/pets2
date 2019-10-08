package com.petssocial.pets2.models;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.petssocial.pets2.models.enums.KindOfPost;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode
@JsonIgnoreProperties(ignoreUnknown = true)
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    @Enumerated(EnumType.STRING)
    private KindOfPost kind;
    private LocalDate date;
    private LocalDate expirationDate;
    private String photo;
    private String optionalField;
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private User user;
    private boolean enabled = true;
}
