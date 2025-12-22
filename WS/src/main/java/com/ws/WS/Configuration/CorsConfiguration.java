package com.ws.WS.Configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfiguration implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5500")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("Origin" , "Content-Type", "Accept", "Authorization")
                .allowCredentials(true)
                .maxAge(3600);
    }

}
