// First we have to declare the API where we can validate the user's login 
// based on the data inside the database 
const API_URL = 'http://localhost:9085'; // This part ain't going to change in a near future 
const LOGIN_ENDPOINT = '${API_URL}/auth/login'; // Basically the path of the login inside of the AuthController inside of the API



// Declaration of all the variables in the HTML 
let email = document.getElementById('email');
let password = document.getElementById('password'); 
let loginBtn = document.getElementById('loginBtn'); 
let togglePassword = document.getElementById('togglePassword'); 

// Function to show the password or to keep it sealed 
togglePasswordBtn.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.innerHTML = type === 'password' ? '👁️' : '🙈';
});