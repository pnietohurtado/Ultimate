const sendBtn = document.getElementById('sendMessage'); 
const textField = document.getElementById('messageInput'); 
const messageContainer = document.getElementById('message-container'); 

/*Change Theme Btn*/
const themeBtn = document.getElementById('changeTheme'); 
let themeNow = "light"; 

/*Username*/
let user = document.getElementById("username-chat"); 

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
    const user_data = JSON.parse(localStorage.getItem('usuario'));
    const user_data_register = JSON.parse(localStorage.getItem('usuario_register'));

    if(user_data_register){
        user.innerHTML = user_data_register.name; 
    }
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
 

