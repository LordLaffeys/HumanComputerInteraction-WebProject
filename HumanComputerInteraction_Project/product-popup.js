

document.addEventListener('DOMContentLoaded', function () {

    var popups = document.querySelectorAll('.popup');
    
    popups.forEach(function (popup) {
        var buybutton = popup.querySelector('#buyBtn'); // Find the buy button inside each popup
        buybutton.addEventListener('click', function () {
            handleTransaction('buy', popup);
        });
        var sellbutton = popup.querySelector('#sellBtn'); // Find the close button inside each popup
        sellbutton.addEventListener('click', function () {
            handleTransaction('sell', popup);
        });
    });
    
    function handleTransaction(action, popups) {
        var userData = localStorage.getItem('userData');

        if (userData === null) {
            alert("Please log in to perform this action.");
            return;
        }  
        var priceInput = popups.querySelector('#price');
        var quantityInput = popups.querySelector('#quantity');

        var price = parseFloat(priceInput.value);
        var quantity = parseFloat(quantityInput.value);
        console.log(price, quantity);
        var totalPrice = price * quantity;

        if (isNaN(price) || isNaN(quantity)) {
            alert('please fill the price and quantity!');
            return;
        }

        var UD = JSON.parse(userData);
        var balance = UD.balance;


        if (action === "buy") {
            if (balance < totalPrice) {
                alert("Insufficient balance.");
                return;
            }
            balance -= totalPrice;
        } else if (action === "sell") {
            balance += totalPrice;
        }
    
        UD.balance = balance;
        localStorage.setItem('userData', JSON.stringify(UD));
        console.log(localStorage.getItem('userData'));
        
        var newTransaction = {
            timestamp:  new Date(),
            ticker: popups.getAttribute('data-crypto'),
            price: price,
            quantity: quantity,
            total: totalPrice,
        };

        // Retrieve the existing data from LocalStorage
        var history = localStorage.getItem('transactionHistory');
        let parsedData = [];
        if (history) {
            // Parse the existing data
            parsedData = JSON.parse(history);
        }
        parsedData.push(newTransaction);

        // Convert the updated data array back to JSON string and store it in LocalStorage
        localStorage.setItem('transactionHistory', JSON.stringify(parsedData));
        document.getElementById('price').value = '';
        document.getElementById('quantity').value = '';
        console.log(JSON.parse(localStorage.getItem('transactionHistory')));
    }
});