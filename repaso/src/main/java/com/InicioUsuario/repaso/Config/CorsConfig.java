package com.InicioUsuario.repaso.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**") // Dirigido a todas las URL (Rutas privadas)
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS") // PUT modificación completa y PATCH modificación parcial
                .allowedHeaders("Origin" , "Content-Type", "Accept", "Authorization")
                .allowCredentials(true)
                .maxAge(3600);

        registry.addMapping("/**") // Dirigido a todas las URL (Rutas privadas)
                .allowedOrigins("http://localhost:5001")
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS") // PUT modificación completa y PATCH modificación parcial
                .allowedHeaders("Origin" , "Content-Type", "Accept", "Authorization")
                .allowCredentials(true)
                .maxAge(3600);

        registry.addMapping("/**")
                .allowedOrigins("http://127.0.0.1:5501")
                .allowedMethods("*")
                .allowedHeaders("*");

        registry.addMapping("/auth/**") // Dirigido a todas las URL (Rutas públicas)
                .allowedOrigins("http://localhost:4200") // Quiere decir que se acepta todos los tipos de rutas (Podemos hacer lo mismo con los métodos)
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS") // PUT modificación completa y PATCH modificación parcial
                .allowedHeaders("Origin" , "Content-Type", "Accept", "Authorization")
                .allowCredentials(false)
                .maxAge(3600);

        registry.addMapping("/api/**") // Dirigido a todas las URL (Rutas públicas)
                .allowedOrigins("http://localhost:4200") // Quiere decir que se acepta todos los tipos de rutas (Podemos hacer lo mismo con los métodos)
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS") // PUT modificación completa y PATCH modificación parcial
                .allowedHeaders("Origin" , "Content-Type", "Accept", "Authorization")
                .allowCredentials(false)
                .maxAge(3600);
    }

}