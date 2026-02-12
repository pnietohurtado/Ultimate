package com.InicioUsuario.repaso.Controller;

import com.InicioUsuario.repaso.Persistance.Entity.UserEntity;
import com.InicioUsuario.repaso.Service.Impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserServiceImpl service;

    @GetMapping("/findAll")
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserEntity> findAllUsers(){
        System.out.println("Function executed correctly!");
        return service.findAllUsers();
    }




}
