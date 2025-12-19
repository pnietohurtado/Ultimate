package com.securityWebSocket.securityWebSocket.Service.Interface;

import com.securityWebSocket.securityWebSocket.Persistance.Model.UserEntity;

import java.util.List;

public interface IUserService {
    public List<UserEntity> findAllUsers();
}
