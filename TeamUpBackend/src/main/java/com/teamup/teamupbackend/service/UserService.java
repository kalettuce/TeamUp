package com.teamup.teamupbackend.service;

import com.teamup.teamupbackend.dao.entity.User;
import com.teamup.teamupbackend.dao.pojo.ProjectInvitation;
import com.teamup.teamupbackend.dao.pojo.UserProfile;
import com.teamup.teamupbackend.dao.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) { this.userRepository = userRepository; }

    /**
     * Creates a given user
     * @param userProfile
     * @param ownedProjects
     * @param joinedProjects
     * @param projectInvitations
     * @return the id of the created user
     */
    public int createUser(UserProfile userProfile, List<Integer> ownedProjects, List<Integer> joinedProjects,
                          List<ProjectInvitation> projectInvitations) {
        // Create the user
        User user = new User(userProfile, ownedProjects, joinedProjects, projectInvitations);
        // Save the user to the database
        userRepository.save(user);
        // Return the user id
        return user.getUid();
    }
}
