package com.example.Todo.service;

import com.example.Todo.entity.Todo;
import com.example.Todo.repo.TodoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TodoServiceImp implements TodoService{

    @Autowired private TodoRepo repo;

    @Override
    public Todo AddTaks(Todo todo) {

        return repo.save(todo);
    }

    @Override
    public List<Todo> getAllTasks() {
        List<Todo> getAll = repo.findAll();
        return getAll;
    }

    @Override
    public void deleteTask(Long id) {
        repo.deleteById(id);
    }
}
