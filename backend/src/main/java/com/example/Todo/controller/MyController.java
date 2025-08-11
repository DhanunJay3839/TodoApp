package com.example.Todo.controller;

import com.example.Todo.entity.Login;
import com.example.Todo.entity.Todo;
import com.example.Todo.repo.TodoRepo;
import com.example.Todo.service.TodoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class MyController {

    @Autowired private TodoService todoService;

    @Autowired private TodoRepo repo;

    @PostMapping("/createAccount")
    public String CreateAccount(@Valid @RequestBody Login login)
    {
        Login createdAccount = todoService.AddAccount(login);
        if (createdAccount != null) {
            return "Account created successfully!";
        } else {
            return "Failed to create account.";
        }
    }

    @PostMapping("/login")
    public String login(@RequestBody Login login) {
        String email = login.getEmail();
        Login existingAccount = todoService.getAccountByEmail(login, email);
        if (existingAccount != null) {
            return "Login successful!";
        } else {
            return "Invalid email or password.";
        }
    }

    @PostMapping("/addTask")
    public String addTask(@RequestBody Todo todo)
    {
        Todo addedTask = todoService.AddTaks(todo);
        if (addedTask != null) {
            return "Task added successfully!";
        } else {
            return "Failed to add task.";
        }

    }

    @GetMapping("/getAllTasks")
    public List<Todo> getAllTasks() {
        return todoService.getAllTasks();
    }

    @DeleteMapping("/DeleteTask/{id}")
    public String deleteTask(@PathVariable Long id) {
        todoService.deleteTask(id);
        return "Task deleted successfully!";
    }


    @PutMapping("/updateTaskStatus/{id}")
    public String updateStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        Optional<Todo> optionalTodo = repo.findById(id);
        if (optionalTodo.isPresent()) {
            Todo todo = optionalTodo.get();
            todo.setStatus(request.get("status")); // extract status from request body
            repo.save(todo);
            return "Task status updated successfully";
        } else {
            return "Task not found";
        }
    }


}
