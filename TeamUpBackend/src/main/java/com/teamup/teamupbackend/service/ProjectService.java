package com.teamup.teamupbackend.service;

import com.teamup.teamupbackend.dao.entity.Project;
import com.teamup.teamupbackend.dao.pojo.JoinRequest;
import com.teamup.teamupbackend.dao.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    /**
     * Creates a given project
     * @param projectName
     * @param projectTags
     * @param owner
     * @param otherMembers
     * @param description
     * @param joinRequests
     * @return the id of the created project
     */
    public int createProject(String projectName, List<String> projectTags, int owner, List<Integer> otherMembers,
                             String description, List<JoinRequest> joinRequests) {
        // Create the project
        Project project = new Project(projectName, projectTags, owner, otherMembers, description, joinRequests);
        // Save the project to the database
        projectRepository.save(project);
        // Return the project id
        return project.getPid();
    }
}
