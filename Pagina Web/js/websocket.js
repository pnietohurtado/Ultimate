const sendBtn = document.getElementById('sendMessage');
const textField = document.getElementById('messageInput');
const messageContainer = document.getElementById('message-container');

/Change Theme Btn/
const themeBtn = document.getElementById('changeTheme');
let themeNow = "light";

/Username/
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

sendBtn.addEventListener('click', function(){
    if (window.chatApp) {
        window.chatApp.sendMessage(textField.value);
    }
});

textField.addEventListener('keydown', function(e){
    if(e.key === 'Enter'){
        e.preventDefault();
    if (window.chatApp) {
        window.chatApp.sendMessage(textField.value);
    }
}
});

/* Set the new chat from normal to active, by changing the class */
const chatConversation = document.querySelectorAll(".chat-item");



document.addEventListener("DOMContentLoaded", function(){
const chatList = document.querySelector(".chat-list");
    if (chatList) {
        chatList.addEventListener('click', function(e){
            if (e.target.classList.contains('chat-item')) {
                const roomID = e.target.id;
                if (window.chatApp) {
                    window.chatApp.changeRoom(roomID);
                }
                
                chatConversation.forEach(l => l.classList.remove("active")); 
                e.target.classList.add("active");
            }
        }); 
    }
});


document.addEventListener("DOMContentLoaded", function(){
    const param = new URLSearchParams(window.location.search);

    nameUser = param.get('name'); 
    user.innerHTML = param.get('name'); 
});