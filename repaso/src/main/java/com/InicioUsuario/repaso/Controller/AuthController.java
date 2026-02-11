package com.InicioUsuario.repaso.Controller;

import com.InicioUsuario.repaso.Global.GlobalValues;
import com.InicioUsuario.repaso.Persistance.Entity.UserEntity;
import com.InicioUsuario.repaso.Security.JWTAuthorizationFilter;
import com.InicioUsuario.repaso.Service.DTO.LoginDTO;
import com.InicioUsuario.repaso.Service.DTO.ResponseDTO;
import com.InicioUsuario.repaso.Service.Impl.AuthServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthServiceImpl service;

    @PostMapping("/register")
    private ResponseEntity<ResponseDTO> register(@RequestBody UserEntity user){
        try {
            return new ResponseEntity(service.register(user), HttpStatus.CREATED);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/login")
    private ResponseEntity<ResponseDTO> login(@RequestBody LoginDTO login){
        try {
            HashMap<String, String> log = null;

            if(login.getEmail() != null){
                log = service.login(login, "email");
            }else if(login.getUsername() != null){
                log = service.login(login , "username");
            }

            if(log.containsKey("jwt")){
                /*if(GlobalValues.role_user.equals("ROLE_ADMIN")){
                    System.out.println("Moving into the developer web configuration!");
                }*/

                return new ResponseEntity(log, HttpStatus.OK);
            }
            System.out.println(log.get("error"));
            return new ResponseEntity(log, HttpStatus.UNAUTHORIZED);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
