package com.teamup.teamupbackend.controller;

import com.teamup.teamupbackend.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/project")
public class ProjectController {

    private final ProjectService projectService;

    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public int createProject() {
        // Create a default project
        int pid = projectService.createProject("Project Name", new ArrayList<>(), 1, new ArrayList<>(),
                                     "Description", new ArrayList<>());
        // Return the project id
        return pid;
    }
}
