package com.teamup.teamupbackend.dao.entity;

import com.teamup.teamupbackend.dao.pojo.ProjectInvitation;
import com.teamup.teamupbackend.dao.pojo.UserProfile;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int uid;

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private UserProfile userProfile;

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private List<Integer> ownedProjects;

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private List<Integer> joinedProjects;

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private List<ProjectInvitation> projectInvitations;

    public User(UserProfile userProfile, List<Integer> ownedProjects, List<Integer> joinedProjects,
                List<ProjectInvitation> projectInvitations) {
        this.userProfile = userProfile;
        this.ownedProjects = ownedProjects;
        this.joinedProjects = joinedProjects;
        this.projectInvitations = projectInvitations;
    }

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public UserProfile getUserProfile() {
        return userProfile;
    }

    public void setUserProfile(UserProfile userProfile) {
        this.userProfile = userProfile;
    }

    public List<Integer> getOwnedProjects() {
        return ownedProjects;
    }

    public void setOwnedProjects(List<Integer> ownedProjects) {
        this.ownedProjects = ownedProjects;
    }

    public List<Integer> getJoinedProjects() {
        return joinedProjects;
    }

    public void setJoinedProjects(List<Integer> joinedProjects) {
        this.joinedProjects = joinedProjects;
    }

    public List<ProjectInvitation> getProjectInvitations() {
        return projectInvitations;
    }

    public void setProjectInvitations(List<ProjectInvitation> projectInvitations) {
        this.projectInvitations = projectInvitations;
    }
}
