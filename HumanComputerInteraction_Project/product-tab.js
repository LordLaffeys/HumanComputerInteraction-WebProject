function openTab(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("product_tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("product_tablinks");
    for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
} 

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

// function showPopup(popupId) {
//     var popup = document.getElementById(popupId);
//     if (popup) {
//         console.log('Showing popup:', popupId);
//         popup.style.display = 'block';
//         var balanceElement = document.getElementById("balance");
//         var USERDATA = localStorage.getItem('userData');
//         var UD = JSON.parse(USERDATA);
        
//         if (USERDATA !== null) { 
//             console.log('user balance initial : ', USERDATA);
//             console.log('user balance initial : ', UD.balance);
//             console.log(balanceElement);
//             balanceElement.textContent = UD.balance;
//         }
//     } else {
//         console.error('Popup not found:', popupId);
//     }
// }

// function closePopup(popupId) {
//     var popup = document.getElementById(popupId);
//     if (popup) {
//         console.log('Closing popup:', popupId);
//         popup.style.display = 'none';
//     } else {
//         console.error('Popup not found:', popupId);
//     }
// }


document.addEventListener('DOMContentLoaded', function () {
    var popups = document.querySelectorAll('.popup');
    
    popups.forEach(function (popup) {
        var closeButton = popup.querySelector('#closeBtn'); // Find the close button inside each popup
        closeButton.addEventListener('click', function () {
            closePopup(popup);
        });
        
        popup.addEventListener('click', function () {
            var popupId = this.id;
            showPopup(popupId);
        });
    });
});

function showPopup(popupId) {
    var popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = 'block';
        var balanceElement = popup.querySelector("#balance"); // Find the balance element inside the popup
        var USERDATA = localStorage.getItem('userData');
        var UD = JSON.parse(USERDATA);
        
        if (USERDATA !== null) { 
            console.log(balanceElement);
            balanceElement.textContent = UD.balance;
        }
    } else {
        console.error('Popup not found:', popupId);
    }
}

function closePopup(popupId) {
    var popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = 'none'; // Hide the popup
    } else {
        console.error('Popup not found for close action.');
    }
}

function updateTotal() {
    try {
        // Get the values from the input fields
        var price_input = parseFloat(document.getElementById("price").value) || 0;
        var quantity_input = parseInt(document.getElementById("quantity").value) || 0;
        // Calculate the total
        var total = price_input * quantity_input;
        // Set the total to the span element
        document.getElementById("totalPrice").textContent = total.toFixed(2);

        var USERDATA = localStorage.getItem('userData');
        var UData = JSON.parse(USERDATA);
        var newBalance = Math.max(0, UData.balance - total);
        document.getElementById("balance").textContent = newBalance;
    } catch (error) {
        // Handle the error
        console.error('An error occurred:', error);
        // Optionally, display an error message to the user
        alert('An error occurred. Please check your input and try again.');
    }
}