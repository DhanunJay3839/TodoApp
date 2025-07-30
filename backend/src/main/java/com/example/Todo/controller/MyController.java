package com.example.Todo.controller;

import com.example.Todo.entity.Todo;
import com.example.Todo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class MyController {

    @Autowired private TodoService todoService;

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

}
