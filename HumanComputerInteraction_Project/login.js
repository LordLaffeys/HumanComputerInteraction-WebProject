const registerForm = document.querySelector('.login-form');
const firstNameInput = document.getElementById('fname');
const lastNameInput = document.getElementById('lname');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('psw');
const confirmPasswordInput = document.getElementById('pswconf');
const loginButton = document.querySelector('.login-button');

// Admin data object
const adminData = {
    firstName: "ADMIN",
    lastName: "ADMIN",
    email: "admin@example.com",
    password: "adminPassword123", // Admin's password
    loggedIn: false,
    balance: 10000,
};

const simulationData = [
    {
        timestamp: new Date('2024-05-26T08:00:00'),
        ticker: 'SOL',
        price: 150,
        quantity: 2,
        total: 300,
    },
    {
        timestamp: new Date('2024-05-27T09:30:00'),
        ticker: 'XRP',
        price: 1.5,
        quantity: 100,
        total: 150,
    },
    {
        timestamp: new Date('2024-05-28T10:45:00'),
        ticker: 'BTC',
        price: 40000,
        quantity: 0.5,
        total: 20000,
    },
    {
        timestamp: new Date('2024-05-29T11:15:00'),
        ticker: 'ETH',
        price: 2500,
        quantity: 1,
        total: 2500,
    },
    {
        timestamp: new Date('2024-05-30T12:30:00'),
        ticker: 'BNB',
        price: 400,
        quantity: 5,
        total: 2000,
    },
    // Add more objects as needed
];


function isAdminLoggedIn(email, password) {
    return email === adminData.email && password === adminData.password;
}

loginButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default form submission
    console.log(":");
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Validate email and password
    if (isAdminLoggedIn(email, password)) {
        alert('Login successful!');
        // Redirect to admin dashboard or another page
        adminData.loggedIn = true;
        localStorage.setItem('userData', JSON.stringify(adminData));
        location.replace("dashboard.html");
    } else {
        // Retrieve the stored user data from localStorage
        const storedUserData = JSON.parse(localStorage.getItem('userData'));
        if (storedUserData) {
            let errorMessage = 'Invalid email or password. Please try again.';

            if (storedUserData.email === email && storedUserData.password === password) {
                storedUserData.loggedIn = true;
                localStorage.setItem('userData', JSON.stringify(storedUserData));
                
                location.replace("dashboard.html");
            }

            // Check if the email is correct but the password is wrong
            if (storedUserData.email === email && storedUserData.password !== password) {
                alert(errorMessage);
            }

            // Check if the email does not exist
            if (storedUserData.email !== email) {
                alert(errorMessage);
            }
        } else {
            alert('No registered user found. Please register.');
        }
    }
});
