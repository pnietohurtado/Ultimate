package com.InicioUsuario.repaso.Service.Impl;

import com.InicioUsuario.repaso.Service.Interface.IJWTUtilityService;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.RSASSASigner;
import com.nimbusds.jose.crypto.RSASSAVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.text.ParseException;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@Service
public class JWTUtilityServiceImpl implements IJWTUtilityService {

    @Value("classpath:jwtKeys/private-key.pem")
    private Resource privateKeyResource;

    @Value("classpath:jwtKeys/public-key.pem")
    private Resource publicKeyResource;


    @Override
    public String generateJWT(Long uuid, String username, List<String> roles) {
        PrivateKey privateKey = loadPrivateKey(privateKeyResource);
        JWSSigner signer = new RSASSASigner(privateKey);

        Date now = new Date();

        JWTClaimsSet.Builder claimsBuilder = new JWTClaimsSet.Builder()
                .subject(uuid.toString())
                .claim("username", username)  // Añadir username como claim separada
                .issueTime(now)
                .expirationTime(new Date(now.getTime() + 14400000));

        if (roles != null && !roles.isEmpty()) {
            claimsBuilder.claim("roles", roles);
        }

        JWTClaimsSet claimSet = claimsBuilder.build();

        SignedJWT signedJWT = new SignedJWT(new JWSHeader(JWSAlgorithm.RS256), claimSet);
        try {
            signedJWT.sign(signer);
        } catch (JOSEException e) {
            throw new RuntimeException(e);
        }

        return signedJWT.serialize();
    }

    @Override
    public JWTClaimsSet parseJWT(String jwt) {
        try {
            PublicKey publicKey = loadPublicKey(publicKeyResource);

            SignedJWT signedJWT = SignedJWT.parse(jwt);

            JWSVerifier verifier = new RSASSAVerifier((RSAPublicKey) publicKey);
            if(!signedJWT.verify(verifier)){ // El Token no se ha podido verificar
                throw new JOSEException("Invalid signature");
            }

            JWTClaimsSet claimSet = signedJWT.getJWTClaimsSet();

            if(claimSet.getExpirationTime().before(new Date())){ // El token puede ser válido pero puede estar expirado
                throw new JOSEException("Expired Token");
            }

            return claimSet;

        } catch (ParseException | JOSEException e) {
            throw new RuntimeException(e);
        }

    }


    private PrivateKey loadPrivateKey(Resource resource){
        try {
            byte[] keyBytes = Files.readAllBytes(Paths.get(resource.getURI()));
            String privateKeyPEM = new String(keyBytes, StandardCharsets.UTF_8)
                    .replace("-----BEGIN PRIVATE KEY-----", "")
                    .replace("-----END PRIVATE KEY-----", "")
                    .replaceAll("\\s", ""); // "\\s" cuando coincide con un espacio en blanco lo va a quitar también

            byte[] decodedKey = Base64.getDecoder().decode(privateKeyPEM);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");

            return keyFactory.generatePrivate(new PKCS8EncodedKeySpec(decodedKey));
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        } catch (InvalidKeySpecException e) {
            throw new RuntimeException(e);
        }
    }

    private PublicKey loadPublicKey(Resource resource){
        try {
            byte[] keyBytes = Files.readAllBytes(Paths.get(resource.getURI()));

            String publicKeyPEM = new String(keyBytes, StandardCharsets.UTF_8)
                    .replace("-----BEGIN PUBLIC KEY-----", "")
                    .replace("-----END PUBLIC KEY-----", "")
                    .replaceAll("\\s", "");


            byte[] decodedKey = Base64.getDecoder().decode(publicKeyPEM);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");

            return keyFactory.generatePublic(new X509EncodedKeySpec(decodedKey));

        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        } catch (InvalidKeySpecException e) {
            throw new RuntimeException(e);
        }
    }


}
