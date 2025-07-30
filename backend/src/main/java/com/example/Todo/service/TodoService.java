package com.example.Todo.service;

import com.example.Todo.entity.Todo;

import java.util.List;

public interface TodoService {

    public Todo AddTaks(Todo todo);
    public List<Todo> getAllTasks();
    public void deleteTask(Long id);
}
