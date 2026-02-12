package com.websocket.demo.Controller;

import com.websocket.demo.Persistance.Models.ChatMessage;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@CrossOrigin("*")
public class ChatController {

    @MessageMapping("/chat/{roomID}")
    @SendTo("/topic/{roomID}") // We return the user to the chat room
    public ChatMessage chat(@DestinationVariable String roomID, ChatMessage message){ // We identify de id of the chat room

        return new ChatMessage(message.getMessage(), message.getUser());
    }

}
