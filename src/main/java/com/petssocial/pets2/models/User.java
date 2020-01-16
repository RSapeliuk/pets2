package com.petssocial.pets2.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.petssocial.pets2.models.enums.Role;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(unique = true)
    private String username;
    private String name;
    private String surname;
    private String password;
    private String avatar;
    private double rating;
    private String phoneNumber;
    @Column(unique = true)
    private String email;

    @JsonIgnore
    private boolean accountNotExpired = true;
    private boolean accountNotLocked = true;
    private boolean credentialsNonExpired = true;
    @Enumerated(EnumType.STRING)
    private Role role = Role.ROLE_USER;
    private boolean enabled = true;
    @ToString.Exclude
    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Post> posts;
    @ToString.Exclude
    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Pet> pets;

    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(this.role.name()));
            return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return accountNotExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return accountNotLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return credentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
