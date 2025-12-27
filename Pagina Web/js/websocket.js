const sendBtn = document.getElementById('sendMessage'); 
const textField = document.getElementById('messageInput'); 
const messageContainer = document.getElementById('message-container'); 

/*Change Theme Btn*/
const themeBtn = document.getElementById('changeTheme'); 

const chat01 = document.getElementById('chat01')
const chat02 = document.getElementById('chat02')
const chat03 = document.getElementById('chat03')

themeBtn.addEventListener('click', function(){
    document.documentElement.style.setProperty("--color-preanimation-1", "black"); // In order to change the page theme
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


chat01.addEventListener('click', function(){
    if(chat01.className.split(" ").at(1) === 'active'){
        console.log('You are alredy selected'); 
    }else{
        chat01.classList.add(chat01.className.split(" ").at(0), 'active'); 
    }
})

chat02.addEventListener('click', function(){
    if(chat02.className.split(" ").at(1) === 'active'){
        console.log('You are alredy selected'); 
    }else{
        chat02.classList.add(chat01.className.split(" ").at(0), 'active'); 
    }
})

chat03.addEventListener('click', function(){
    if(chat03.className.split(" ").at(1) === 'active'){
        console.log('You are alredy selected'); 
    }else{
        chat03.classList.add(chat01.className.split(" ").at(0), 'active'); 
    }
})
 

