package com.securityWebSocket.securityWebSocket.Configuration;

import com.securityWebSocket.securityWebSocket.Service.Validation.UserValidation;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ValidationConfig {
    @Bean
    public UserValidation validation(){
        return new UserValidation();
    }
}
