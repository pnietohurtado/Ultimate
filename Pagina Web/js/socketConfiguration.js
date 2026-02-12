// export { createConversation } from "../js/MongoDBCode/mongo";

/* -------------- Socket Configuration --------------------*/
class WebSocketChat {
    constructor(usernameVariable) {
        this.stompClient = null;
        this.currentRoom = 'pnh0002';
        this.currentUser = usernameVariable;
        this.subscription = null;

        // Guardar referencia al input de mensajes
        this.messageInput = null;

        this.connectWebSocket();
    }

    connectWebSocket() {
        try {
            const socket = new SockJS('http://localhost:9086/chat-socket');
            this.stompClient = Stomp.over(socket);

            this.stompClient.connect({}, (frame) => {
                console.log('Connected: ' + frame);
                this.subscribeToRoom(this.currentRoom);
            }, (error) => {
                console.error('Connection error:', error);
                setTimeout(() => this.connectWebSocket(), 5000);
            });
        } catch (error) {
            console.error('Error creating WebSocket:', error);
            setTimeout(() => this.connectWebSocket(), 5000);
        }
    }

    subscribeToRoom(roomID) {
        if (this.stompClient && this.stompClient.connected) {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }

            this.subscription = this.stompClient.subscribe(`/topic/${roomID}`, (message) => {
                try {
                    this.handleIncomingMessage(JSON.parse(message.body));
                } catch (error) {
                    console.error('Error parsing message:', error);
                }
            });

            console.log(`Subscribed to room: ${roomID}`);
            this.currentRoom = roomID;
            this.updateActiveRoom();
        }
    }

    async sendMessage(messageText) {
        if (!messageText || !messageText.trim()) return;

        if (this.stompClient && this.stompClient.connected) {
            const chatMessage = {
                message: messageText.trim(),
                user: this.currentUser,
                timestamp: new Date().toISOString()
            };

            try {
                // Enviar mensaje por WebSocket
                this.stompClient.send(`/app/chat/${this.currentRoom}`, {}, JSON.stringify(chatMessage));

                // Mostrar mensaje en la interfaz
                this.displayMessage(chatMessage, true);

                // Guardar en base de datos
                // createConversation(this.currentRoom, chatMessage);

                // Enviar a la API
                await fetch(`http://localhost:8000/api/sendmessage/${this.currentRoom}/${encodeURIComponent(chatMessage.message)}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => console.log('Message sent to API:', data))
                    .catch(error => console.error('API Error:', error));

            } catch (error) {
                console.error('Error sending message:', error);
            }
        } else {
            console.warn('WebSocket not connected, reconnecting...');
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

        if (!messageContainer) {
            console.error('Message container not found');
            return;
        }

        const messageElement = document.createElement('div');
        messageElement.className = `message-bubble ${isOwnMessage ? 'user' : 'other'}`;

        const time = new Date(message.timestamp || new Date()).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });

        messageElement.innerHTML = `
            <div class="message-content">
                ${!isOwnMessage ? `<div class="message-sender">${this.escapeHtml(message.user)}</div>` : ''}
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
        if (roomID && roomID !== this.currentRoom) {
            this.subscribeToRoom(roomID);
            this.clearMessages();
        }
    }

    clearMessages() {
        const messageContainer = document.getElementById('message-container');
        if (messageContainer) {
            messageContainer.innerHTML = '';
        }
    }

    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Método para establecer el input de mensajes
    setMessageInput(inputElement) {
        this.messageInput = inputElement;
    }
}

// Inicialización cuando el DOM está listo
document.addEventListener("DOMContentLoaded", function () {
    try {
        const param = new URLSearchParams(window.location.search);
        let nameUser = param.get('name');

        if (!nameUser) {
            nameUser = "UsuarioDefault";
        }

        // Crear instancia del chat
        window.chatApp = new WebSocketChat(nameUser);

        // Establecer referencia al input de mensajes
        const messageInput = document.getElementById('messageInput');
        if (messageInput && window.chatApp) {
            window.chatApp.setMessageInput(messageInput);
        }

        console.log('Chat initialized for user:', nameUser);

    } catch (error) {
        console.error('Error initializing chat:', error);
    }
});