const sendBtn = document.getElementById('sendMessage'); 
const textField = document.getElementById('messageInput'); 
const messageContainer = document.getElementById('message-container'); 

sendBtn.addEventListener('click', function(){
    const messageDiv = document.createElement('div'); 

    messageDiv.setAttribute('id', 'message-bubble-user'); 

    messageDiv.textContent = textField.value; 
    messageDiv.classList.add('message-bubble', 'user'); 
    console.log(messageDiv.className)
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

 

