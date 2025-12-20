package com.securityWebSocket.securityWebSocket.Service.Impl;

import com.securityWebSocket.securityWebSocket.Persistance.Model.UserEntity;
import com.securityWebSocket.securityWebSocket.Persistance.Repository.UserRepository;
import com.securityWebSocket.securityWebSocket.Service.DTO.LoginDTO;
import com.securityWebSocket.securityWebSocket.Service.DTO.ResponseDTO;
import com.securityWebSocket.securityWebSocket.Service.Interface.IAuthService;
import com.securityWebSocket.securityWebSocket.Service.Interface.IJWTUtilitiesService;
import com.securityWebSocket.securityWebSocket.Service.Validation.UserValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AuthImpl implements IAuthService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private IJWTUtilitiesService service;

    @Autowired
    private UserValidation validation;

    @Override
    public HashMap<String, String> login(LoginDTO login, String identifier) throws Exception {
        HashMap<String, String> jwt = new HashMap<>();
        Optional<UserEntity> user = null;

        if(identifier.equals("username")) {
            user = repo.findUserByUser(login.getUsername());
        }
        if(identifier.equals("email")){
            user = repo.findUserByEmail(login.getEmail());
        }

        if(user.isEmpty()){
            jwt.put("error", "There's no such user in the database!");
            return jwt;
        }

        if(verifyPassword(login.getPassword(), user.get().getPassword())){
            UserEntity userEntity = user.get();
            List<String> roles = userEntity.getAuthorities().stream() // Se encarga de ver la lista de todos los roles posibles
                    .map(authority -> authority.getAuthority())
                    .collect(Collectors.toList());

            jwt.put("jwt", service.generateJWT(userEntity.getUuid(), userEntity.getUsername(), roles));
        } else {
            jwt.put("error", "Not matching passwords!");
            return jwt;
        }

        return jwt;
    }

    @Override
    public ResponseDTO register(UserEntity user) throws Exception {
        ResponseDTO response = validation.validation(user);

        if(response.getNumErrors() > 0){
            return response;
        }

        List<UserEntity> getAllusers = repo.findAll();
        for(UserEntity u : getAllusers){
            if(u.getEmail().equals(user.getEmail())){
                response.setNumErrors(1);
                response.setMessage("There is already a user with that email/username!");
                return response;
            }
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
        user.setPassword(encoder.encode(user.getPassword()));

        repo.save(user);

        if(response.getNumErrors() > 0){
            System.out.println("Errores de validacion! : " + response.getMessage());
            return response;
        }

        response.setMessage("Everything OK");
        return response;
    }

    private boolean verifyPassword(String enteredPassword, String storedPassword){
        BCryptPasswordEncoder encoded = new BCryptPasswordEncoder();
        return encoded.matches(enteredPassword, storedPassword);
    }

}
