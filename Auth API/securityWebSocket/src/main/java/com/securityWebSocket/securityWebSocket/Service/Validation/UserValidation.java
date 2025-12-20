package com.securityWebSocket.securityWebSocket.Service.Validation;

import com.securityWebSocket.securityWebSocket.Persistance.Model.UserEntity;
import com.securityWebSocket.securityWebSocket.Service.DTO.ResponseDTO;

public class UserValidation {

    public ResponseDTO validation(UserEntity user) {
        ResponseDTO response = new ResponseDTO();
        response.setNumErrors(0);

        if(user.getUsername() == null ||
            user.getUsername().length() < 3 ||
            user.getUsername().length() > 15){
            response.setNumErrors(response.getNumErrors() + 1);
            response.setMessage("Not valid username!!");
        }

        if(user.getEmail() == null ||
                !user.getEmail().matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")){
            response.setNumErrors(response.getNumErrors() + 1);
            response.setMessage("Invalid email!!");
        }

        if(user.getPassword() == null ||
           !user.getPassword().matches("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$")){
            response.setNumErrors(response.getNumErrors() + 1);
            response.setMessage("Invalid password!!");
        }

        return response;

    }

}
