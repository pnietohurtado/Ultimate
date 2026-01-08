const sendBtn = document.getElementById('sendMessage'); 
const textField = document.getElementById('messageInput'); 
const messageContainer = document.getElementById('message-container'); 

/*Change Theme Btn*/
const themeBtn = document.getElementById('changeTheme'); 
let themeNow = "light"; 

/*Username*/
let user = document.getElementById("username-chat"); 
let nameUser = "Pevlo"; 

themeBtn.addEventListener('click', function(){
    if(themeNow === "light"){
        document.body.setAttribute("data-theme", "dark");
        themeNow = "dark"; 
    }else if(themeNow === "dark"){
        document.body.setAttribute("data-theme", "light");
        themeNow = "light"; 
    }
}); 

/*To export the data from the login*/
document.addEventListener("DOMContentLoaded", function(){
    const param = new URLSearchParams(window.location.search); 

    nameUser = param.get('name'); 
    user.innerHTML = param.get('name'); 

    window.chatApp = new WebSocketChat(nameUser); 
}); 



sendBtn.addEventListener('click', function(){
    const messageDiv = document.createElement('div'); 

    messageDiv.setAttribute('id', 'message-bubble-user'); 

    messageDiv.textContent = textField.value; 
    messageDiv.classList.add('message-bubble', 'user'); 
    console.log(messageDiv.className.split(" ").at(1)) // In order to get the first class name
    messageContainer.appendChild(messageDiv); 

    textField.value = ''; 
}); 

textField.addEventListener('keydown', function(e){

    if(e.key === 'Enter'){
        e.preventDefault(); 

        const messageDiv = document.createElement('div'); 

        messageDiv.setAttribute('id', 'message-bubble-user'); 

        messageDiv.textContent = textField.value; 
        messageDiv.classList.add('message-bubble' , 'user'); 
        console.log(messageDiv.className)
        messageContainer.appendChild(messageDiv); 

        textField.value = ''; 
    }
    
}); 


/* Set the new chat from normal to active, by changing the class */
const chatConversation = document.querySelectorAll("chat-item"); 

document.addEventListener("DOMContentLoaded", function(){

    const chatList = document.querySelector("chat.list"); 

    chatList.addEventListener('click', function(){

        chatList.classList.toggle("active"); 
        this.classList.toggle("active"); 

    }); 


    
    chatConversation.forEach(link => {
        link.addEventListener('click', function(e){
            e.preventDefault(); 
            chatConversation.forEach(l => l.classList.remove("active")); 
            this.classList.add("active"); 

        }); 
    }); 


}); 





/* -------------- Socket Configuration --------------------*/
class WebSocketChat {
    constructor(usernameVariable) {
        this.stompClient = null;
        this.currentRoom = 'chat01'; 
        this.currentUser = usernameVariable;
        
        this.initializeEventListeners();
        this.connectWebSocket();
    }

    // Connect to the webSocket
    connectWebSocket() {
        const socket = new SockJS('http://localhost:9086/chat-socket');
        this.stompClient = Stomp.over(socket);
        
        this.stompClient.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            
            // Suscribe to the current room
            this.subscribeToRoom(this.currentRoom);
            
        }, (error) => {
            // Try each 5 seconds 
            setTimeout(() => this.connectWebSocket(), 5000);
        });
    }

    subscribeToRoom(roomID) {
        if (this.stompClient && this.stompClient.connected) {
            // Cancel the previous subscription
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
            
            // Suscribirse a la nueva sala
            this.subscription = this.stompClient.subscribe(`/topic/${roomID}`, (message) => {
                this.handleIncomingMessage(JSON.parse(message.body));
            });
            
            console.log(`Suscribe to the room: ${roomID}`);
            this.displaySystemMessage(`Enter the room: ${roomID}`);
            this.currentRoom = roomID;
            
            this.updateActiveRoom();
        }
    }

    // Send Message
    sendMessage(messageText) {
        if (!messageText.trim()) return;
        
        if (this.stompClient && this.stompClient.connected) {
            const chatMessage = {
                message: messageText,
                user: this.currentUser,
                timestamp: new Date().toISOString()
            };
            
            this.stompClient.send(`/app/chat/${this.currentRoom}`, {}, JSON.stringify(chatMessage));
            
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

    // To show the message into the chat with the bubble "user" and "other"
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
        
        // To scroll down into the last message 
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }


    // Cambiar de sala
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
 

