package com.securityWebSocket.securityWebSocket.Service.Interface;

import com.securityWebSocket.securityWebSocket.Persistance.Model.UserEntity;
import com.securityWebSocket.securityWebSocket.Service.DTO.LoginDTO;
import com.securityWebSocket.securityWebSocket.Service.DTO.ResponseDTO;

import java.util.HashMap;

public interface IAuthService {
    public HashMap<String, String>login (LoginDTO login, String identifier)throws Exception;
    public ResponseDTO register(UserEntity user) throws Exception;
}
