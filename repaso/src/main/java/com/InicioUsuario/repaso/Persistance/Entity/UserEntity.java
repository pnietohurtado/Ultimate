package com.InicioUsuario.repaso.Persistance.Entity;

import com.InicioUsuario.repaso.Persistance.Enum.Role;
import jakarta.persistence.*;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
public class UserEntity implements UserDetails {

    // Parámetros de la entidad

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uuid; // Id del personaje

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

    // Constructor de la clase
    public UserEntity(){} // Muy importante tener un constructor vacío

    // Getter y Setter

    public void setUuid (Long id){this.uuid = id; }
    public void setEmail(String email){this.email = email; }
    public void setPassword(String password){this.password = password; }
    public void setRole(Role role){this.role = role; }
    public void setUsername(String username){this.username = username; }

    public Long getUuid() {
        return uuid;
    }

    public String getEmail() {
        return email;
    }

    public Role getRole() {
        return role;
    }

    //  Métodos implementados desde la interfaz de UserDetails

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String authority = this.role.name(); // Siempre va a empezar con "ROLE_" ...
        if (!authority.startsWith("ROLE_")) {
            authority = "ROLE_" + authority;
        }
        return List.of(new SimpleGrantedAuthority(authority));
    }

    @Override
    public @Nullable String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }


    @Override
    public String toString(){
        StringBuilder sb = new StringBuilder();
        sb.append("\nEmail: ").append(this.email).append(" Username: ").append(this.username)
                .append(" Password: ").append(this.password).append("\n");
        return sb.toString();
    }
}
