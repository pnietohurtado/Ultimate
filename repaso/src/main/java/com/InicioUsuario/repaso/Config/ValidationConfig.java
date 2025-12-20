package com.InicioUsuario.repaso.Config;

import com.InicioUsuario.repaso.Service.Validation.UserValidation;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ValidationConfig {

    @Bean
    public UserValidation validation(){
        return new UserValidation();
    }


}
