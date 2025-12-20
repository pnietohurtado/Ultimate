// First we have to declare the API where we can validate the user's login 
// based on the data inside the database 
const API_URL = 'http://localhost:9085'; // This part ain't going to change in a near future 
const LOGIN_ENDPOINT = '${API_URL}/auth/login'; // Basically the path of the login inside of the AuthController inside of the API



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
        
        /* Just a test on how to fetch a URL 
        fetch(LOGIN_ENDPOINT, {method: "POST"})
        .then(response => console.log(response))
        .catch(error => console.error(error)); 
        */
    });
}else{
    console.log('Data from the button ' + email); 
    console.log('No button created!'); 
}
 



// Functions about the login with de AUTHORIZATION API (LOGIN PART)
let email_value = email.value; 
let password_value = password.value; 

loginBtn.addEventListener('click' , function() {
    fetch("http://localhost:9085/auth/login", {method: "POST"})
    .then(response => console.log(response))
    .catch(error => console.error(error)); 
});

