package com.securityWebSocket.securityWebSocket.Service.Impl;

import com.securityWebSocket.securityWebSocket.Persistance.Model.UserEntity;
import com.securityWebSocket.securityWebSocket.Service.Interface.IUserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserImpl implements IUserService {
    @Override
    public List<UserEntity> findAllUsers() {
        return List.of();
    }
}
