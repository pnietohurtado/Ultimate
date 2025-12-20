package com.InicioUsuario.repaso.Service.Interface;

import com.nimbusds.jwt.JWTClaimsSet;

import java.util.List;

public interface IJWTUtilityService {

    String generateJWT(Long uuid, String username, List<String> roles);
    public JWTClaimsSet parseJWT(String jwt);

}
