// First we have to declare the API where we can validate the user's login 
// based on the data inside the database 
const API_URL = 'http://localhost:9085'; // This part ain't going to change in a near future 
const LOGIN_ENDPOINT = 'http://localhost:9085/auth/login'; // Basically the path of the login inside of the AuthController inside of the API



// Declaration of all the variables in the HTML 
const email = document.getElementById('email');
const password = document.getElementById('password'); 
const loginBtn = document.getElementById('loginBtn'); 
const togglePassword = document.getElementById('togglePassword'); 
const passwordInput = document.getElementById('password'); 


// Function to show the password or to keep it sealed 
if(togglePassword){
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '👁️' : '🙈';
      
    });
}else{
    console.log('Data from the button ' + email); 
    console.log('No button created!'); 
}
 



// Functions about the login with de AUTHORIZATION API (LOGIN PART)

loginBtn.addEventListener('click', function(){ // The login button 
    login(email.value, password.value) ; 
}); 

function isValidEmail(email) { // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function login(email, password){
    try{
        console.log('Username => ' + email + " Password => " + password); 

        let credentials = null; 
        
        if(isValidEmail(email)){
            console.log('Inside of the email request!')
            credentials = {
                email: email, 
                password: password
            };
        }else{
            console.log('Inside of the username!'); 
            credentials = {
                username: email, 
                password: password
            };
        }

        /*if(credentials == null){
            console.log("The credentials are null!"); 
        }*/
        
        const response = await fetch(`${LOGIN_ENDPOINT}`, { // Fetching the data to the API 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    'Accept': 'application/json' 
                },
                body: JSON.stringify(credentials),
                credentials: 'include'
        }); 


        if (!response.ok) { // Test to see if the response is right or not 
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Error HTTP number: ${response.status}`);
        }

    }catch(error){
        console.error(error); 
        throw error; 
    }
}

