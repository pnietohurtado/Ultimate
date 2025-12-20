package com.InicioUsuario.repaso.Security;

import com.InicioUsuario.repaso.Global.GlobalValues;
import com.InicioUsuario.repaso.Service.Interface.IJWTUtilityService;
import com.nimbusds.jwt.JWTClaimsSet;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class JWTAuthorizationFilter extends OncePerRequestFilter {

    @Autowired
    private IJWTUtilityService service;


    public JWTAuthorizationFilter(IJWTUtilityService ijwtUtilityService){
        this.service = ijwtUtilityService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String requestUri = request.getRequestURI();
        String header = request.getHeader("Authorization");

        if (requestUri.startsWith("/auth/")) {
            filterChain.doFilter(request, response);
            return;
        }

        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String token = header.substring(7);
            JWTClaimsSet claims = service.parseJWT(token);


            List<String> roles = claims.getStringListClaim("roles");
            List<GrantedAuthority> authorities = roles.stream()
                    .map(role -> {
                        // Asegurar que los roles tengan el prefijo ROLE_ si es necesario
                        if (!role.startsWith("ROLE_")) {
                            role = "ROLE_" + role;
                            GlobalValues.role_user = role;
                        }
                        return new SimpleGrantedAuthority(role);
                    })
                    .collect(Collectors.toList());


            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            claims.getSubject(),
                            null,
                            authorities
                    );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            filterChain.doFilter(request, response);

        } catch (Exception e) {
            System.out.println("ERROR validando token: " + e.getMessage());
            e.printStackTrace();
            SecurityContextHolder.clearContext();

            // Responder con 401 en lugar de continuar
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"Invalid token\", \"message\": \"" + e.getMessage() + "\"}");
        }
    }
}
