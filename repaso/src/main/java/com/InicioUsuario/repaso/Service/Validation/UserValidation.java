package com.InicioUsuario.repaso.Service.Validation;

import com.InicioUsuario.repaso.Persistance.Entity.UserEntity;
import com.InicioUsuario.repaso.Service.DTO.ResponseDTO;
import org.apache.coyote.Response;

public class UserValidation
        /**
         * En esta clase nos aseguramos que un usuario
         * cumpla con ciertos requisitos mínimos a la hora
         * de introducir los parámetros en el registro
         */
{

    public ResponseDTO validation(UserEntity user) // Debemos de pasar por parámetro el usuario para comprobar los valores introducidos
    {

        ResponseDTO response = new ResponseDTO();

        response.setError(0);

        if(user.getUsername() == null ||
                user.getUsername().length() < 3 ||
                user.getUsername().length() > 20){

            response.setError(response.getError() + 1);
            response.setMessage("An error has occurred at the username! Not valid parameters were introduced!");

        }

        if(user.getEmail() == null ||
                !user.getEmail().matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")){
            response.setError(response.getError() + 1 );
            response.setMessage("The email's format is invalid! TRY AGAIN!");
        }

        if(user.getPassword() == null ||
                user.getPassword().length() < 3 ||
                user.getPassword().length() > 20 ||
                !user.getPassword().matches("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$")){
            response.setError(response.getError() + 1);
            response.setMessage("The password's format is invalid! You must try it again!");
        }

        return response; 
    }


}
