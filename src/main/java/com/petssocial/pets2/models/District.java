package com.petssocial.pets2.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode
@ToString
public class District {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    private String name;
    @ToString.Exclude
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private City city;
    @JsonIgnore
    @ToString.Exclude
    @OneToMany(mappedBy = "postDistrict")
    private List<Post> posts;
}
