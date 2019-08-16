package com.petssocial.pets2.models;

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
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(unique = true)
    private String username;
    private String password;
    private String email;
    private boolean accountNotExpired = true;
    private boolean accountNotLocked = true;
    private boolean credentialsNonExpired = true;
    @ElementCollection
    @Enumerated(EnumType.STRING)
    private List<Role> roles = Arrays.asList(Role.ROLE_USER);

    public void setAccountNotExpired(boolean accountNotExpired) {
        this.accountNotExpired = accountNotExpired;
    }

    public User() {
    }

    public User(String username, String password, String email, boolean accountNotExpired, boolean accountNotLocked, boolean credentialsNonExpired,  boolean enabled) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.accountNotExpired = accountNotExpired;
        this.accountNotLocked = accountNotLocked;
        this.credentialsNonExpired = credentialsNonExpired;
        this.enabled = enabled;
    }

    public void setAccountNotLocked(boolean accountNotLocked) {
        this.accountNotLocked = accountNotLocked;
    }

    public void setCredentialsNonExpired(boolean credentialsNonExpired) {
        this.credentialsNonExpired = credentialsNonExpired;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    private boolean enabled = true;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        if (authorities.stream().count() >= 1) {
            authorities.add(new SimpleGrantedAuthority(roles.get(0).toString()));
            return authorities;
        }else if(authorities.stream().count() >= 2){
            List<SimpleGrantedAuthority> simpleGrantedAuthorities = authorities.stream().map(simpleGrantedAuthority ->
                new SimpleGrantedAuthority(simpleGrantedAuthority.toString())
            ).collect(Collectors.toList());
            return simpleGrantedAuthorities;
        }else{
            return null;
        }
    }

    @Override
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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
