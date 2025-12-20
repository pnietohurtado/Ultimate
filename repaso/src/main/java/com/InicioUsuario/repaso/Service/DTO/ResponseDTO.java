package com.InicioUsuario.repaso.Service.DTO;

public class ResponseDTO
        /**
         * Dentro de esta misma clase tenemos otro modelo POJO
         * que vamos a usar para pasarlo por las distintas clases
         * y así podemos mostrar al usuario los errores
         */
{

    private int error;
    private String message;

    public ResponseDTO(){}

    public void setError(int error){this.error = error;}
    public void setMessage(String m){this.message = m;}

    public int getError(){return this.error;}
    public String getMessage(){return this.message;}


}
