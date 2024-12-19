package com.demo.spring_crud.service.impl;

import com.demo.spring_crud.dto.UserDTO;
import com.demo.spring_crud.entity.User;
import com.demo.spring_crud.repository.UserRepository;
import com.demo.spring_crud.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Add a new user to the database.
     */
    @Override
    public void addUser(User user) {
        userRepository.save(user);
    }

    /**
     * Retrieve a list of all users.
     */
    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    /**
     * Retrieve a user by ID.
     *
     * @param id User ID
     * @return User object if found
     */
    @Override
    public User getUser(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid user ID: " + id));
    }

    /**
     * Update a user's details.
     *
     * @param id   User ID to be updated
     * @param user Updated user data
     */
    @Override
    public void updateUser(Integer id, User user) {
        // Ensure the user exists
        userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid user ID: " + id));

        user.setId(id); // Ensure the correct ID is set
        userRepository.save(user);
    }

    /**
     * Delete a user by ID.
     *
     * @param id User ID to be deleted
     */
    @Override
    public void deleteUser(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid user ID: " + id));
        userRepository.delete(user);
    }

    /**
     * Update a user's name.
     *
     * @param id       User ID to update
     * @param userDTO  DTO containing the new name
     */
    @Override
    public void updateName(Integer id, UserDTO userDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid user ID: " + id));
        user.setName(userDTO.getName());
        userRepository.save(user);
    }
}
