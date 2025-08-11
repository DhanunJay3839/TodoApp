package com.example.Todo.service;

import com.example.Todo.entity.Login;
import com.example.Todo.entity.Todo;
import com.example.Todo.repo.LoginRepo;
import com.example.Todo.repo.TodoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TodoServiceImp implements TodoService{

    @Autowired private TodoRepo repo;
    @Autowired private LoginRepo lrepo;

    @Override
    public Login AddAccount(Login login) {
        return lrepo.save(login);
    }

    @Override
    public Login getAccountByEmail(Login login, String email) {
        Login existingEmail = lrepo.findByEmail((email));
       String exemail = existingEmail.getEmail();
       String expassword = existingEmail.getPassword();

       String loginEmail = login.getEmail();
       String loginPassword = login.getPassword();

       if(exemail.equals(loginEmail) && expassword.equals(loginPassword)) {
           return existingEmail;

         } else {
              return null;
       }
    }

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
