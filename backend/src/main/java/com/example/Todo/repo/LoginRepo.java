package com.example.Todo.repo;

import com.example.Todo.entity.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Todo.entity.Login;
@Repository
public interface LoginRepo extends JpaRepository<Login, Integer> {

    Login findByEmail(String email);

}
