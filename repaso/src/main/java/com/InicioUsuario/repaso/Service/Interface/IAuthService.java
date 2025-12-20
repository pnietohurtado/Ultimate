package com.InicioUsuario.repaso.Service.Interface;

import com.InicioUsuario.repaso.Persistance.Entity.UserEntity;
import com.InicioUsuario.repaso.Service.DTO.LoginDTO;
import com.InicioUsuario.repaso.Service.DTO.ResponseDTO;
import org.apache.coyote.Response;

import java.util.HashMap;

public interface IAuthService
        /**
         * En este caso, vamos a utilizar esta clase para poder validar
         * los datos del usuario en base a las validaciones que tenemos instanciadas.
         * En caso de que salte algún error se transmitirá a partir del "ResponseDTO"
         */
{

    public HashMap<String, String> login(LoginDTO login, String identifier) throws Exception;
    public ResponseDTO register(UserEntity user) throws Exception;

}
