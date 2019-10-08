package com.petssocial.pets2.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.petssocial.pets2.models.enums.HairLength;
import com.petssocial.pets2.models.enums.Size;
import com.petssocial.pets2.models.enums.Type;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode
@JsonIgnoreProperties(ignoreUnknown = true)
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    @Enumerated(EnumType.STRING)
    private Size size;
    @Enumerated(EnumType.STRING)
    private HairLength hairLength;
    @Enumerated(EnumType.STRING)
    private Type type;
    private int age;
    private String photo;
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
}
