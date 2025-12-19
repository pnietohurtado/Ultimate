package com.securityWebSocket.securityWebSocket.Service.Interface;

import java.util.List;
import com.nimbusds.jwt.JWTClaimsSet;

public interface IJWTUtilitiesService {
    String generateJWT(Long uuid, String username, List<String> roles);
    public JWTClaimsSet parseJWT(String jwt);
}
