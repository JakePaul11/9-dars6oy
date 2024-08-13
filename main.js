const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD'; // Replace with your API endpoint if different

document.addEventListener('DOMContentLoaded', function() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            populateCurrencyOptions(data.rates);
        })
        .catch(error => console.error('Error fetching currency data:', error));
});

function populateCurrencyOptions(rates) {
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');

    for (const [currencyCode] of Object.entries(rates)) {
        const optionFrom = document.createElement('option');
        optionFrom.value = currencyCode;
        optionFrom.textContent = currencyCode;
        fromCurrencySelect.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = currencyCode;
        optionTo.textContent = currencyCode;
        toCurrencySelect.appendChild(optionTo);
    }
}

function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;

    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    fetch(`${API_URL}`)
        .then(response => response.json())
        .then(data => {
            const rates = data.rates;
            const convertedAmount = (amount / rates[fromCurrency]) * rates[toCurrency];
            displayResult(convertedAmount, toCurrency);
        })
        .catch(error => console.error('Error fetching conversion data:', error));
}

function displayResult(amount, currency) {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = `Converted Amount: ${amount.toFixed(2)} ${currency}`;
}
