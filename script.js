var balance = 0;
var transactionType = undefined;
var creditRadioButton = document.getElementById("credit-Btn");
var debitRadioButton = document.getElementById("debit-Btn");
var messageTextField = document.getElementById("msg");
var amtTextField = document.getElementById("amt");
var tableElement = document.getElementById("table");
var tableContainer = document.getElementById("table-container");
let transactions = []

// Function to load transactions array from local storage only once
let transactionsLoaded = false;


// Function to load transactions array from local storage
function loadTransactionsFromLocalStorageOnce() {
    if (!transactionsLoaded) {
        const transactionsData = localStorage.getItem('transactions');
        if (transactionsData) {
            transactions = JSON.parse(transactionsData);

            balance = transactions[transactions.length - 1].balance
            createTableRows()
        }

        transactionsLoaded = true;
    }
}

// Call loadTransactionsFromLocalStorageOnce() when your script starts
loadTransactionsFromLocalStorageOnce();

function executeTransaction() {


    if (!amtTextField.value) {
        alert("Please enter an amount value");
        return;
    }

    if (!messageTextField.value) {
        alert("Please enter an valid description");
        return;
    }

    if (creditRadioButton.checked) {
        performCreditOp();
        saveTransactionsToLocalStorage();
    } else if (debitRadioButton.checked) {
        performDebitOp();
        saveTransactionsToLocalStorage();
    } else {
        alert("please select debit or credit");
    }
}


function performCreditOp() {
    balance = balance + Number(amtTextField.value);
    updateTransactions("credit");
}

function performDebitOp() {
    if (balance == 0) {
        alert("no sufficient funds");
        return;
    }

    if (amtTextField.value > balance) {
        alert("no sufficient funds");
        return;
    }
    balance = balance - Number(amtTextField.value);
    updateTransactions("debit");
}

const updateTransactions = (transactionType) => {
    while (tableElement.rows.length > 1) {
        tableElement.deleteRow(1);
    }

    var descriptionValue = messageTextField.value;
    var amountValue = amtTextField.value;

    transactions.push({
        transactionType: transactionType,
        description: descriptionValue,
        amount: amountValue,
        balance: balance
    })


    createTableRows()
};


function createTableRows() {
    transactions.map((tr) => {

        //this will create main row
        var newRowElement = document.createElement("tr");

        //this will create transaction balance  table data
        var descriptionTableCell = document.createElement("td");
        descriptionTableCell.innerText = tr.description;
        newRowElement.appendChild(descriptionTableCell);

        //this will create transaction type  table data
        if (tr.transactionType == "credit") {


            var creditTableCell = document.createElement("td");
            creditTableCell.innerText = tr.amount
            newRowElement.appendChild(creditTableCell);

            //this will create data for empty space in cr/dr col
            var nullElement = document.createElement("td");
            newRowElement.appendChild(nullElement);

        } else if (tr.transactionType == "debit") {
            //this will create data for empty space in cr/dr col
            var nullElement = document.createElement("td");
            newRowElement.appendChild(nullElement);

            var debitTableCell = document.createElement("td");
            debitTableCell.innerText = tr.amount;
            newRowElement.appendChild(debitTableCell);


        }



        //this will create balance table data
        var balanceTableCell = document.createElement("td");
        balanceTableCell.innerText = tr.balance;
        newRowElement.appendChild(balanceTableCell);

        tableElement.appendChild(newRowElement);

        console.log(transactions);
    })
}


// Function to save transactions array to local storage
function saveTransactionsToLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}


