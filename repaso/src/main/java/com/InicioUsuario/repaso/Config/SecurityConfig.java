package com.InicioUsuario.repaso.Config;

import com.InicioUsuario.repaso.Security.JWTAuthorizationFilter;
import com.InicioUsuario.repaso.Service.Interface.IJWTUtilityService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfig {

    @Autowired
    private IJWTUtilityService service;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/auth/**",
                                "/api/findAll",
                                "/error"  // AÑADE ESTA LÍNEA
                        ).permitAll()
                        .requestMatchers("/api/findAll").hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .addFilterBefore(jwtAuthorizationFilter(),
                        UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint((request, response, authException) -> {

                            // Envía un JSON de error más informativo
                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                            response.setContentType("application/json");
                            response.getWriter().write(
                                    "{\"error\": \"Unauthorized\", " +
                                            "\"message\": \"" + authException.getMessage() + "\", " +
                                            "\"path\": \"" + request.getRequestURI() + "\"}"
                            );
                        })
                );

        return http.build();
    }

    @Bean
    public JWTAuthorizationFilter jwtAuthorizationFilter() {
        System.out.println("Creando bean JWTAuthorizationFilter");
        return new JWTAuthorizationFilter(service);
    }

    @Bean
    public PasswordEncoder passwordEncoder(){ // Totalmente necesario siemrpe
        return new BCryptPasswordEncoder();
    }

}
