package com.InicioUsuario.repaso.Service.DTO;

public class LoginDTO
        /**
         * Se trata de una clase POJO, es decir, que no tiene lógica dentro del
         * programa. Va a servir únicamente para poder albergar el "modelo" que se
         * van a pasar de una clase a otra la cuál no esté en el mismo "package"
         */

{
    // Parámetros
    private String username;
    private String email;
    private String password;

    // Contructor
    public LoginDTO(){}

    //Getter y Setter
    public void setUsername(String username){this.username = username; }
    public void setEmail(String email){this.email = email; }
    public void setPassword(String pass){this.password = pass; }

    public String getUsername(){return this.username; }
    public String getEmail(){return this.email;}
    public String getPassword(){return this.password; }

    // "Override" métodos
    @Override
    public String toString(){
        StringBuilder sb = new StringBuilder();
        sb.append("\nUsername: ").append(this.username).append(" Password: ").append(this.password)
                .append(" Email: ").append(this.email).append("\n");
        return sb.toString();
    }


}
