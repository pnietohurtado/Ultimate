package com.securityWebSocket.securityWebSocket.Service.DTO;

public class ResponseDTO {
    private String message;
    private int numErrors ;

    public ResponseDTO(){}

    public String getMessage(){return this.message; }
    public int getNumErrors(){return this.numErrors; }

    public void setMessage(String message){this.message = message; }
    public void setNumErrors(int numErrors){this.numErrors = numErrors; }

    @Override
    public String toString() {
        return "ResponseDTO{" +
                "message='" + message + '\'' +
                ", numErrors=" + numErrors +
                '}';
    }
}
