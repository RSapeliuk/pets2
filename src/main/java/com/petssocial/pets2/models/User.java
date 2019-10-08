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
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode
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
    @Column(unique = true)
    private String email;

    @JsonIgnore
    private boolean accountNotExpired = true;
    private boolean accountNotLocked = true;
    private boolean credentialsNonExpired = true;
    @Enumerated(EnumType.STRING)
    @ElementCollection(fetch = FetchType.EAGER)
    private List<Role> roles = Arrays.asList(Role.ROLE_USER);
    private boolean enabled = true;
    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Post> posts;
    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Pet> pets;
    @OneToOne(mappedBy = "user")
    private Location userLocation;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        if (authorities.stream().count() >= 0) {
            authorities.add(new SimpleGrantedAuthority(this.roles.get(0).toString()));
            return authorities;
        } else if (authorities.stream().count() >= 2) {
            List<SimpleGrantedAuthority> simpleGrantedAuthorities = authorities.stream().map(simpleGrantedAuthority ->
                    new SimpleGrantedAuthority(simpleGrantedAuthority.toString())
            ).collect(Collectors.toList());
            return simpleGrantedAuthorities;
        } else {
            return null;
        }
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
