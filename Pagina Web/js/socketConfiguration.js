export {createConversation} from "../js/MongoDBCode/mongo"; 


/* -------------- Socket Configuration --------------------*/
class WebSocketChat {
constructor(usernameVariable) {
this.stompClient = null;
this.currentRoom = 'pnh0002';
this.currentUser = usernameVariable;

    this.connectWebSocket();
}

connectWebSocket() {
    const socket = new SockJS('http://localhost:9086/chat-socket');
    this.stompClient = Stomp.over(socket);
    
    this.stompClient.connect({}, (frame) => {
        console.log('Connected: ' + frame);
        
        this.subscribeToRoom(this.currentRoom);
        
    }, (error) => {
        setTimeout(() => this.connectWebSocket(), 5000);
    });
}

subscribeToRoom(roomID) {
    if (this.stompClient && this.stompClient.connected) {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        
        this.subscription = this.stompClient.subscribe(`/topic/${roomID}`, (message) => {
            this.handleIncomingMessage(JSON.parse(message.body));
        });
        
        console.log(`Suscribe to the room: ${roomID}`);
        this.currentRoom = roomID;
        
        this.updateActiveRoom();
    }
}


sendMessage(messageText) {
    if (!messageText.trim()) return;
    
    if (this.stompClient && this.stompClient.connected) {
        const chatMessage = {
            message: messageText,
            user: this.currentUser,
            timestamp: new Date().toISOString()
        };
        
        this.stompClient.send(`/app/chat/${this.currentRoom}`, {}, JSON.stringify(chatMessage));
        
        this.displayMessage(chatMessage, true);

        // In order to send the message to the database 
        createConversation(this.currentRoom, chatMessage); 
        
        document.getElementById('messageInput').value = '';
    } else {
        this.connectWebSocket();
    }
}

handleIncomingMessage(message) {
    if (message.user !== this.currentUser) {
        this.displayMessage(message, false);
    }
}

displayMessage(message, isOwnMessage) {
    const messageContainer = document.getElementById('message-container');
    
    const messageElement = document.createElement('div');
    messageElement.className = `message-bubble ${isOwnMessage ? 'user' : 'other'}`;
    
    const time = new Date(message.timestamp || new Date()).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    messageElement.innerHTML = `
        <div class="message-content">
            ${!isOwnMessage ? `<div class="message-sender">${message.user}</div>` : ''}
            <div class="message-text">${this.escapeHtml(message.message)}</div>
            <div class="message-time">${time}</div>
        </div>
    `;
    
    messageContainer.appendChild(messageElement);
    
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

updateActiveRoom() {
    document.querySelectorAll('.chat-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeRoom = document.getElementById(this.currentRoom);
    if (activeRoom) {
        activeRoom.classList.add('active');
    }
}

changeRoom(roomID) {
    if (roomID !== this.currentRoom) {
        this.subscribeToRoom(roomID);
   
        this.clearMessages();
    }
}


clearMessages() {
    const messageContainer = document.getElementById('message-container');
    messageContainer.innerHTML = '';
}

escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

}

document.addEventListener("DOMContentLoaded", function(){
    const param = new URLSearchParams(window.location.search);

    let nameUser = param.get('name'); 

    if(!nameUser){
        nameUser = "UsuarioDefault"; 
        window.chatApp = new WebSocketChat(nameUser); 
    }else{
        window.chatApp = new WebSocketChat(nameUser); 
    }
    
});