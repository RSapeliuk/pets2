package com.petssocial.pets2.models;

import com.petssocial.pets2.models.enums.City;
import com.petssocial.pets2.models.enums.District;
import lombok.*;

import javax.persistence.*;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode
@ToString
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private City city;
    private District district;
    @OneToOne(fetch = FetchType.LAZY)
    private User user;
}
