// First we have to declare the API where we can validate the user's login 
// based on the data inside the database 
const API_URL = 'http://localhost:8089'; // This part ain't going to change in a near future 
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
    });
}else{
    console.log('Data from the button ' + email); 
    console.log('No button created!'); 
}


// Function to enter the web after a propper validation 
loginBtn.addEventListener('click' , function() {
    let passwordValidation = password.value; 
    if(password != null ||
        passwordValidation.length < 3 || 
        passwordValidation.length > 15 
    ){
        console.log('Access denied to the web, Invalid password setting!'); 
    }else{
        console.log('Access granted, welcome!')
    }
}); 