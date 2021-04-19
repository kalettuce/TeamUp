package com.teamup.teamupbackend.controller;

import com.teamup.teamupbackend.dao.pojo.UserProfile;
import com.teamup.teamupbackend.service.UserService;
import org.apache.coyote.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) { this.userService = userService; }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public int  createUser() {
        // Create a default user
        int uid = userService.createUser(new UserProfile("Name", "Email", new ArrayList<>()), new ArrayList<>(),
                                         new ArrayList<>(), new ArrayList<>());
        // Return the user id
        return uid;
    }
}
