package com.teamup.teamupbackend.dao.pojo;

import java.util.List;

public class UserProfile {

    private String name;

    private String email;

    private List<String> userTags;

    public UserProfile(String name, String email, List<String> userTags) {
        this.name = name;
        this.email = email;
        this.userTags = userTags;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<String> getUserTags() {
        return userTags;
    }

    public void setUserTags(List<String> userTags) {
        this.userTags = userTags;
    }
}
