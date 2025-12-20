package com.InicioUsuario.repaso.Service.Impl;

import com.InicioUsuario.repaso.Persistance.Entity.UserEntity;
import com.InicioUsuario.repaso.Persistance.Repository.UserRepository;
import com.InicioUsuario.repaso.Service.Interface.IUserService;
import com.InicioUsuario.repaso.Service.Validation.UserValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserRepository repo;

    @Override
    public List<UserEntity> findAllUsers() {
        return repo.findAll();
    }
}
