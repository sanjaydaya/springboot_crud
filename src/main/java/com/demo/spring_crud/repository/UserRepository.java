package com.demo.spring_crud.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.demo.spring_crud.entity.User;
public interface UserRepository extends JpaRepository<User, Integer> {
}
