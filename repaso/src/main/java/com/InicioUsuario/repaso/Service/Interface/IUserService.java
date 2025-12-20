package com.InicioUsuario.repaso.Service.Interface;

import com.InicioUsuario.repaso.Persistance.Entity.UserEntity;

import java.util.List;

public interface IUserService
        /**
         * Interfaz la cual crear las funciones que vamos a llamar para poder encontrar
         * todos los usuarios de la base de datos. Este Service se llamará desde UserController
         */
{
    public List<UserEntity> findAllUsers();
}
