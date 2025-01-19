let totalAmount = 0;
let expenses = [];
const exchangeRates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.75,
    INR: 74.35  // Example exchange rate, you may need to update this with the latest rate
};
const currencySigns = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    INR: '₹'
};

function addExpense() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (description && amount && !isNaN(amount) && amount > 0) {
        const expenseList = document.getElementById('expense-list');
        const li = document.createElement('li');
        li.innerHTML = `${description} - $${amount.toFixed(2)} <button onclick="removeExpense(this, ${amount})">x</button>`;
        expenseList.appendChild(li);

        expenses.push({ description, amount });
        totalAmount += amount;
        updateTotalAmount();

        document.getElementById('description').value = '';
        document.getElementById('amount').value = '';
    } else {
        alert('Please enter a valid description and amount.');
    }
}

function removeExpense(element, amount) {
    const expenseList = document.getElementById('expense-list');
    expenseList.removeChild(element.parentElement);

    expenses = expenses.filter(expense => expense.amount !== amount);
    totalAmount -= amount;
    updateTotalAmount();
}

function updateTotalAmount() {
    document.getElementById('total-amount').innerText = totalAmount.toFixed(2);
}

function convertCurrency() {
    const selectedCurrency = document.getElementById('currency').value;
    const conversionRate = exchangeRates[selectedCurrency];

    const convertedExpenses = expenses.map(expense => ({
        ...expense,
        amount: (expense.amount * conversionRate).toFixed(2)
    }));

    totalAmount = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount * conversionRate), 0);
    document.getElementById('total-currency').innerText = selectedCurrency;
    document.getElementById('total-sign').innerText = currencySigns[selectedCurrency];
    updateTotalAmount();
    updateExpenseList(convertedExpenses, selectedCurrency);
}

function updateExpenseList(convertedExpenses, currency) {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';
    convertedExpenses.forEach(expense => {
        const li = document.createElement('li');
        li.innerHTML = `${expense.description} - ${currencySigns[currency]}${expense.amount} <button onclick="removeExpense(this, ${expense.amount})">x</button>`;
        expenseList.appendChild(li);
    });
}