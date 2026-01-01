class WebSocketChat {
    constructor() {
        this.stompClient = null;
        this.currentRoom = 'chat01'; // Sala por defecto
        this.currentUser = 'Pablo Nieto'; // Usuario por defecto
        
        this.initializeEventListeners();
        this.connectWebSocket();
    }

    // Conectar al WebSocket
    connectWebSocket() {
        const socket = new SockJS('http://localhost:9086/chat-socket');
        this.stompClient = Stomp.over(socket);
        
        this.stompClient.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            
            // Suscribirse a la sala actual
            this.subscribeToRoom(this.currentRoom);
            
            // Mostrar mensaje de conexión exitosa
            this.displaySystemMessage('Conectado al chat');
        }, (error) => {
            console.error('WebSocket connection error:', error);
            this.displaySystemMessage('Error de conexión. Intentando reconectar...');
            // Reintentar conexión después de 5 segundos
            setTimeout(() => this.connectWebSocket(), 5000);
        });
    }

    // Suscribirse a una sala específica
    subscribeToRoom(roomID) {
        if (this.stompClient && this.stompClient.connected) {
            // Cancelar suscripción anterior si existe
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
            
            // Suscribirse a la nueva sala
            this.subscription = this.stompClient.subscribe(`/topic/${roomID}`, (message) => {
                this.handleIncomingMessage(JSON.parse(message.body));
            });
            
            console.log(`Suscrito a la sala: ${roomID}`);
            this.displaySystemMessage(`Entraste a la sala: ${roomID}`);
            this.currentRoom = roomID;
            
            // Actualizar interfaz para mostrar sala activa
            this.updateActiveRoom();
        }
    }

    // Enviar mensaje
    sendMessage(messageText) {
        if (!messageText.trim()) return;
        
        if (this.stompClient && this.stompClient.connected) {
            const chatMessage = {
                message: messageText,
                user: this.currentUser,
                timestamp: new Date().toISOString()
            };
            
            this.stompClient.send(`/app/chat/${this.currentRoom}`, {}, JSON.stringify(chatMessage));
            
            // Mostrar mensaje inmediatamente en la interfaz (como usuario actual)
            this.displayMessage(chatMessage, true);
            
            // Limpiar input
            document.getElementById('messageInput').value = '';
        } else {
            this.displaySystemMessage('No estás conectado. Intentando reconectar...');
            this.connectWebSocket();
        }
    }

    // Manejar mensajes entrantes
    handleIncomingMessage(message) {
        // Solo mostrar mensaje si no es del usuario actual (para evitar duplicados)
        if (message.user !== this.currentUser) {
            this.displayMessage(message, false);
        }
    }

    // Mostrar mensaje en la interfaz
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
        
        // Auto-scroll al último mensaje
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    // Mostrar mensajes del sistema (conexión, desconexión, etc.)
    displaySystemMessage(text) {
        const messageContainer = document.getElementById('message-container');
        
        const systemMessage = document.createElement('div');
        systemMessage.className = 'message-bubble system';
        systemMessage.innerHTML = `
            <div class="message-content">
                <div class="message-text">${this.escapeHtml(text)}</div>
            </div>
        `;
        
        messageContainer.appendChild(systemMessage);
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    // Actualizar sala activa en la interfaz
    updateActiveRoom() {
        // Remover clase 'active' de todas las salas
        document.querySelectorAll('.chat-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Agregar clase 'active' a la sala actual
        const activeRoom = document.getElementById(this.currentRoom);
        if (activeRoom) {
            activeRoom.classList.add('active');
        }
    }

    // Cambiar de sala
    changeRoom(roomID) {
        if (roomID !== this.currentRoom) {
            this.subscribeToRoom(roomID);
            
            // Limpiar mensajes anteriores
            this.clearMessages();
            
            // Cargar historial de mensajes de la sala (si implementas backend para esto)
            // this.loadRoomHistory(roomID);
        }
    }

    // Limpiar mensajes del contenedor
    clearMessages() {
        const messageContainer = document.getElementById('message-container');
        messageContainer.innerHTML = '';
    }

    // Escapar HTML para seguridad
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Inicializar event listeners
    initializeEventListeners() {
        // Enviar mensaje al hacer clic en el botón
        document.getElementById('sendMessage').addEventListener('click', () => {
            const input = document.getElementById('messageInput');
            this.sendMessage(input.value);
        });

        // Enviar mensaje al presionar Enter
        document.getElementById('messageInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage(e.target.value);
            }
        });

        // Cambiar de sala al hacer clic en un chat
        document.querySelectorAll('.chat-item').forEach(item => {
            item.addEventListener('click', () => {
                const roomID = item.id;
                this.changeRoom(roomID);
            });
        });

        // Cambiar tema
        document.getElementById('changeTheme').addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.body.setAttribute('data-theme', newTheme);
            
            // Cambiar ícono del botón
            const button = document.getElementById('changeTheme');
            button.textContent = newTheme === 'light' ? '🌙' : '☀️';
        });

        // Cambiar nombre de usuario (ejemplo)
        document.querySelector('.profile-name').addEventListener('click', () => {
            const newName = prompt('Introduce tu nuevo nombre:', this.currentUser);
            if (newName && newName.trim()) {
                this.currentUser = newName.trim();
                document.querySelector('.profile-name').textContent = newName;
                this.displaySystemMessage(`Ahora eres: ${newName}`);
            }
        });
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.chatApp = new WebSocketChat();
});