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
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    private String name;
    @JsonIgnore
    @OneToMany(mappedBy = "city")
    private List<District> district;
}
