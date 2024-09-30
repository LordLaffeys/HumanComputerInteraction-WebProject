// Function to check if the user is logged in
function isUserLoggedIn() {
    const storedUserData = localStorage.getItem('userData');
    if (!storedUserData) {
        return false; // No user data found
    }

    try {
        const userData = JSON.parse(storedUserData);
        return userData && userData.loggedIn === true; // Ensure loggedIn is explicitly true
    } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        return false; // Return false if parsing fails
    }
}

// Function to handle logout
function logout() {
    localStorage.removeItem('userData'); // Remove user data from local storage
    alert('Logged out successfully!');
    location.replace("home.html"); // Redirect to home page or login page
}

function checkUserData() {
    const storedUserData = localStorage.getItem('userData');
    if (!storedUserData) {
        alert('Please login to access this page.');
        return false;
    }
    return true;
}

// Function to update the navbar based on login status
function updateNavbar() {
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const logoutLink = document.getElementById('logout-link');
    const dashboardLink = document.getElementById('dashboard-link');

    if (isUserLoggedIn()) {
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';
        logoutLink.style.display = 'block';
    } else {
        loginLink.style.display = 'inline-block';
        registerLink.style.display = 'inline-block';
        logoutLink.style.display = 'none';
    }
}

// Call updateNavbar when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const dashboardLink = document.getElementById('dashboard-link');

    console.log(localStorage.getItem('userData'));

    if (dashboardLink) {
        dashboardLink.addEventListener('click', (event) => {
            if (!checkUserData()) {
                event.preventDefault(); // Prevent default navigation
            }
        });
    }

    updateNavbar();
});
