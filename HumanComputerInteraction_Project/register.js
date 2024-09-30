const registerForm = document.querySelector('.login-form');
const firstNameInput = document.getElementById('fname');
const lastNameInput = document.getElementById('lname');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('psw');
const confirmPasswordInput = document.getElementById('pswconf');
const registerButton = document.querySelector('.register-button');

registerButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default form submission
        
    // Basic validation (client-side)
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    let isValid = true;

    if (!firstName) {
        alert('Please enter your first name');
        isValid = false;
    }

    if (!lastName) {
        alert('Please enter your last name');
        isValid = false;
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        alert('Please enter a valid email address');
        isValid = false;
    }

    if (!password || password.length < 8) {
        alert('Please enter a password with at least 8 characters');
        isValid = false;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        isValid = false;
    }

    if (isValid) {
        // **Security Warning:** Replace this with your actual server-side communication method
        // This example does not perform secure password hashing
        const userData = {
            firstName,
            lastName,
            email,
            password, // **WARNING: Do not store plain text passwords in production! Use proper hashing and security practices**
            loggedIn: false, // Set initial login status to false
            balance: 0, 
        };
        
        console.log('Sending registration data to server:', userData);

        localStorage.setItem('userData', JSON.stringify(userData));

        // Clear the form after successful registration (optional)
        location.replace("login.html");
    }
});
