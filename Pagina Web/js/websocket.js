const sendBtn = document.getElementById('sendMessage'); 
const textField = document.getElementById('messageInput'); 
const messageContainer = document.getElementById('message-container'); 

sendBtn.addEventListener('click', function(){
    const messageDiv = document.createElement('div'); 
    messageDiv.textContent = textField.value; 
    messageDiv.classList.add('message-bubble.user'); 
    console.log(messageDiv.className)
    messageContainer.appendChild(messageDiv); 
}); 

