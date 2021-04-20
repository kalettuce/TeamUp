package com.teamup.teamupbackend.dao.repository;

import com.teamup.teamupbackend.dao.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {

}
