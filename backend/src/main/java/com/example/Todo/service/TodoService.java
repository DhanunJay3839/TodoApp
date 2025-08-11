package com.example.Todo.service;

import com.example.Todo.entity.Login;
import com.example.Todo.entity.Todo;

import java.util.List;

public interface TodoService {

    public Login AddAccount(Login login);
    public Login getAccountByEmail(Login login, String email);
    public Todo AddTaks(Todo todo);
    public List<Todo> getAllTasks();
    public void deleteTask(Long id);

}
