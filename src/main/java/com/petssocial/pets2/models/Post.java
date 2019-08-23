package com.petssocial.pets2.models;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private KindOfPost kind;
    private LocalDate date;
    private LocalDate expirationDate;
    private String photo;
    private String optionalField;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private User user;
    private boolean enabled = true;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public KindOfPost getKind() {
        return kind;
    }

    public void setKind(KindOfPost kind) {
        this.kind = kind;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getOptionalField() {
        return optionalField;
    }

    public void setOptionalField(String optionalField) {
        this.optionalField = optionalField;
    }

    public Post() {
    }

    public Post(String title, KindOfPost kind, LocalDate date, LocalDate expirationDate, String photo, String optionalField) {
        this.title = title;
        this.kind = kind;
        this.date = date;
        this.expirationDate = expirationDate;
        this.photo = photo;
        this.optionalField = optionalField;
    }
    public boolean isEnabled(){
        return enabled;
    }
}
