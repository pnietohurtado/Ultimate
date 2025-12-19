package com.securityWebSocket.securityWebSocket.Service.Validation;

import com.securityWebSocket.securityWebSocket.Persistance.Model.UserEntity;
import com.securityWebSocket.securityWebSocket.Service.DTO.ResponseDTO;

public class UserValidation {

    public ResponseDTO validation(UserEntity user) {
        ResponseDTO response = new ResponseDTO("", 0);

        if(user.getUsername() == null ||
            user.getUsername().length() < 3 ||
            user.getUsername().length() > 15){
            response.
        }

    }

}
