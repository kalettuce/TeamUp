package com.teamup.teamupbackend.dao.entity;

import com.teamup.teamupbackend.dao.pojo.JoinRequest;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import com.vladmihalcea.hibernate.type.json.JsonStringType;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "projects")
@TypeDef(name = "json", typeClass = JsonStringType.class)
public class Project implements Serializable {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int pid;

    private String projectName;

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private List<String> projectTags;

    private int owner;

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private List<Integer> otherMembers;

    private String description;

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private List<JoinRequest> joinRequests;

    public Project() { }

    public Project(String projectName, List<String> projectTags, int owner, List<Integer> otherMembers,
                   String description, List<JoinRequest> joinRequests) {
        this.projectName = projectName;
        this.projectTags = projectTags;
        this.owner = owner;
        this.otherMembers = otherMembers;
        this.description = description;
        this.joinRequests = joinRequests;
    }

    public int getPid() {
        return pid;
    }

    public void setPid(int pid) {
        this.pid = pid;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public List<String> getProjectTags() {
        return projectTags;
    }

    public void setProjectTags(List<String> projectTags) {
        this.projectTags = projectTags;
    }

    public int getOwner() {
        return owner;
    }

    public void setOwner(int owner) {
        this.owner = owner;
    }

    public List<Integer> getOtherMembers() {
        return otherMembers;
    }

    public void setOtherMembers(List<Integer> otherMembers) {
        this.otherMembers = otherMembers;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<JoinRequest> getJoinRequests() {
        return joinRequests;
    }

    public void setJoinRequests(List<JoinRequest> joinRequests) {
        this.joinRequests = joinRequests;
    }
}
