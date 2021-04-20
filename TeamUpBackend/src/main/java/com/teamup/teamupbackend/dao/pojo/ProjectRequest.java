package com.teamup.teamupbackend.dao.pojo;

import java.io.Serializable;

public class ProjectRequest implements Serializable {

    private int uid;

    private String message;

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
