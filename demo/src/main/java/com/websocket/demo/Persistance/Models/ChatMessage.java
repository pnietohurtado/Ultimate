package com.websocket.demo.Persistance.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class ChatMessage {

    String message;
    String user;

    public ChatMessage(){}
    public ChatMessage(String message, String user){
        this.message = message;
        this.user = user;
    }

    public void setMessage(String message){this.message = message;}
    public void setUser(String user){this.user = user; }

    public String getMessage(){return this.message; }
    public String getUser(){return this.user;}


}
