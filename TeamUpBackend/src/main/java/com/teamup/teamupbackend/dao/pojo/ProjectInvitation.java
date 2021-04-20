package com.teamup.teamupbackend.dao.pojo;

import java.io.Serializable;

public class ProjectInvitation implements Serializable {

    private int pid;

    private String message;

    public int getPid() {
        return pid;
    }

    public void setPid(int pid) {
        this.pid = pid;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
