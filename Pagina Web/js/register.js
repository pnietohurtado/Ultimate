const LOGIN_ENDPOINT = 'http://localhost:9085/auth/register'; // Register ENDPOINT 

const nombre = document.getElementById('nombre'); 
const apellido = document.getElementById('apellido'); 
const email = document.getElementById('email'); 
const username = document.getElementById('username'); 
const password = document.getElementById('password'); 
const loginBtn = document.getElementById('loginBtn'); 

// The login botton in order to send to the API all the information 
loginBtn.addEventListener('click', function(){
    register(nombre.value, apellido.value, email.value, username.value, password.value); 
}); 

async function register(nombre, apellido, email, username, password){
    try{
        
        const credentials = {
            firstName: nombre, 
            lastName: apellido, 
            email: email, 
            username: username, 
            password: password
        }

        const response = await fetch(`${LOGIN_ENDPOINT}`, {
            method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Accept': 'application/json' 
                    },
                    body: JSON.stringify(credentials),
                    credentials: 'include'
        }); 

        if(response.ok){
            console.log('User added to the database!'); 
            window.location.href = 'PruebaChat.html'; 
        }else{
            console.log('Could not connect to the database!' ); 
        }

    }catch(error){
        console.error(error); 
    }

}
