var balance = 0;
var transactionType = undefined;
var creditRadioButton = document.getElementById("credit-Btn");
var debitRadioButton = document.getElementById("debit-Btn");
var messageTextField = document.getElementById("msg");
var amtTextField = document.getElementById("amt");
var tableElement = document.getElementById("table");
var expenseNotFoundEl = document.getElementById("no-expense-found");
var cardsContainer = document.getElementById("card-container");
var cardBalanceForSmallDevice = document.getElementById("amount-card");
var plusBtn = document.getElementById("plus-icon-container");
var addExpenseForm = document.getElementById("add-transaction-container-mobile");
var closeIconEl = document.getElementById("close-icon");
let transactions = []


// Function to load transactions array from local storage only once
let transactionsLoaded = false;

let isSmallScreen = window.innerWidth > 742 ? false : true;
//when close btn clicked in responsive form
onCloseBtnhandler()

// Call loadTransactionsFromLocalStorageOnce() when your script starts
loadTransactionsFromLocalStorageOnce();

//this will handle plus btn operation
plusIconHandler()

if (!isSmallScreen) {
    addExpenseForm.classList.remove("hide");
    closeIconEl.classList.add('hide')
}

function closeAddForm() {
    addExpenseForm.classList.add("hide")
    cardsContainer.classList.remove("hide")
}
function onCloseBtnhandler() {
    closeIconEl.addEventListener('click', () => {
        closeAddForm()
    })

}

// Function to load transactions array from local storage
function loadTransactionsFromLocalStorageOnce() {
    if (!transactionsLoaded) {
        const transactionsData = localStorage.getItem('transactions');

        if (transactionsData) {
            transactions = JSON.parse(transactionsData);

            if (transactions.length > 0) {
                balance = transactions[transactions.length - 1].balance
                isSmallScreen ? createTransactionCard() : createTableRows()


            }

        }

        transactionsLoaded = true;
        if (transactions.length > 0) {

            showTable()
        } else {
            hideTable()
            if (isSmallScreen) {
                updateBalaceInCard()
            }
        }

    }


}

function showTable() {
    expenseNotFoundEl.classList.add('hide')
    tableElement.classList.remove('hide')
    // expenseNotFoundEl.style.display = block;

}

function hideTable() {

    expenseNotFoundEl.classList.remove('hide')
    tableElement.classList.add('hide')
    // expenseNotFoundEl.style.display = block;


}


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
    if (isSmallScreen) {
        addExpenseForm.classList.add("hide")
        cardsContainer.classList.remove("hide")
    }
}


function performCreditOp() {
    expenseNotFoundEl.classList.add('hide')
    tableElement.classList.remove('hide')
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
    expenseNotFoundEl.classList.add('hide')
    tableElement.classList.remove('hide')
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

    if (isSmallScreen) {
        createTransactionCard()
    } else {
        createTableRows()
    }

};

function clearInputs() {
    messageTextField.value = "";
    amtTextField.value = ""
}

function createTransactionCard() {

    transactions.map((data) => {
        var newCardElement = document.createElement("div");
        newCardElement.classList.add("card")

        var cardContentContainer = document.createElement("div");
        cardContentContainer.classList.add("card-content-container")

        var cardProfile = document.createElement("div");
        cardProfile.classList.add("card-profile")
        cardProfile.innerText = data.transactionType == "credit" ? "CR" : "DR";
        cardContentContainer.appendChild(cardProfile)

        var cardTitle = document.createElement("div");
        cardTitle.classList.add("card-title");
        cardTitle.innerText = data.description
        cardContentContainer.appendChild(cardTitle)

        var cardAmount = document.createElement("div");
        cardAmount.classList.add("card-amount");
        cardAmount.innerText = data.transactionType == "credit" ? "+ " + data.amount : "- " + data.amount;
        let colorClass = data.transactionType == "credit" ? "green-text-color" : "red-text-color";
        cardAmount.classList.add(colorClass)
        cardContentContainer.appendChild(cardAmount)

        newCardElement.appendChild(cardContentContainer)

        cardsContainer.append(newCardElement)



    })
    clearInputs()
    updateBalaceInCard()


}

function updateBalaceInCard() {
    cardBalanceForSmallDevice.innerText = (balance > 0 ? balance : 0)
}

function plusIconHandler() {
    plusBtn.addEventListener("click", (e) => {
        console.log(e);
        addExpenseForm.classList.remove("hide")
        cardsContainer.classList.add("hide")


    })
}


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

    })
    clearInputs()
}


// Function to save transactions array to local storage
function saveTransactionsToLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}


