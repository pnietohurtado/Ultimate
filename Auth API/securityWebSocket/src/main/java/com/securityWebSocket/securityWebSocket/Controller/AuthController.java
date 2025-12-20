package com.securityWebSocket.securityWebSocket.Controller;

import com.securityWebSocket.securityWebSocket.Persistance.Model.UserEntity;
import com.securityWebSocket.securityWebSocket.Service.DTO.LoginDTO;
import com.securityWebSocket.securityWebSocket.Service.DTO.ResponseDTO;
import com.securityWebSocket.securityWebSocket.Service.Impl.AuthImpl;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthImpl service;

    @PostMapping("/register")
    public ResponseEntity<ResponseDTO>register(@RequestBody UserEntity user){
        try {
            return new ResponseEntity(service.register(user), HttpStatus.OK);
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
