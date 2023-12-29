var loginForm=document.querySelector('.loginForm');
var signupForm=document.querySelector('.signupForm');
var signupData = JSON.parse(localStorage.getItem('signupData')) || {};
var signupSuccessMessage = document.getElementById('signupSuccessMessage');
var logoutButton = document.getElementById('logoutButton');
var navMain = document.getElementById('navMain');
var userNameNav = document.getElementById('userNameNav');


// Add event listner to a sigup link
document.querySelector('#signupLink').addEventListener('click', function (event) {
    event.preventDefault();  // Prevent the default form submission behavior
    toggleForms();})
// Add event listner to a sigin link
document.querySelector('#signinLink').addEventListener('click', function (event) {
    event.preventDefault();  // Prevent the default form submission behavior
    toggleForms();
});
// Add submit event listener to the login form
loginForm.addEventListener('submit',loginUser);
// Add submit event listener to the lsignup form
signupForm.addEventListener('submit',signupUser);
// Add click event listener to the logout button
logoutButton.addEventListener('click', logoutUser);

function toggleForms() {
    loginForm.classList.toggle('d-block');
    loginForm.classList.toggle('d-none');  // Add toggling for d-none class
    signupForm.classList.toggle('d-block');
    signupForm.classList.toggle('d-none');  // Add toggling for d-none class
    signupSuccessMessage.textContent = ''; // Clear the success message when toggling forms

    
}


// Function to handle login form submission
function loginUser(event) {
    event.preventDefault();
    var userEmail= document.getElementById('userEmailIn').value;
    var userPassword = document.getElementById('userPasswordIn').value;
    if (signupData.email === userEmail && signupData.password === userPassword) {
        // Add your logic for successful login
        loginForm.classList.add('d-none');
        userNameNav.textContent = signupData.name; // Display the user's name in the nav bar
        showLogoutButton();
        document.getElementById('welcome-message').textContent = 'Welcome, ' + signupData.name;
        document.getElementById('home').style.display = 'flex';
  

}}

// Function to handle signup form submission
function signupUser(event) {
    event.preventDefault();
    var userName= document.getElementById('userNameUp').value;
    var userEmail= document.getElementById('userEmailUp').value;
    var userPassword= document.getElementById('userPasswordUp').value;

        // Validate input
        if (!userName || !userEmail || !userPassword) {
            alert('Please fill in all fields.');
            return;}

            // Check for duplicate email
    if (signupData.email === userEmail) {
        alert('Email already exists. Please use a different email.');
        return;
    }
 // Validate password using regex (minimum 6 characters, at least one uppercase letter, one lowercase letter, and one digit)
 var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
 if (!passwordRegex.test(userPassword)) {
     alert('Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one digit.');
     return;
 }

    signupData = {
        name: userName,
        email: userEmail,
        password: userPassword
    };
      // Store signup data in localStorage
    localStorage.setItem('signupData', JSON.stringify(signupData));

    signupForm.reset();
    signupSuccessMessage.textContent = 'Signup successful!'; // Display success message
    hideLogoutButton();

    

}

// Function to handle logout
function logoutUser() {
    loginForm.classList.remove('d-none');
    document.getElementById('home').style.display = 'none';
    hideLogoutButton();
}

// Function to show logout button
function showLogoutButton() {
    logoutButton.style.display = 'block';
}

// Function to hide logout button
function hideLogoutButton() {
    logoutButton.style.display = 'none';
    userNameNav.textContent =""
}
