var balance = 0;
var transactionType = undefined;
var creditRadioButton = document.getElementById("credit-Btn");
var debitRadioButton = document.getElementById("debit-Btn");
var messageTextField = document.getElementById("msg");
var amtTextField = document.getElementById("amt");
var tableElement = document.getElementById("table");


function executeTransaction() {
    if(!amtTextField.value) {
        alert("Please enter an amount value");
        return;
    }

    if(!messageTextField.value) {
        alert("Please enter an valid description");
        return;
    }    

    if (creditRadioButton.checked) {
        performCreditOp();
    } else if (debitRadioButton.checked) {
        performDebitOp();
    } else {
        alert("please select debit or credit")
    }
}

function performCreditOp() {
    balance = balance + Number(amtTextField.value);
    
    var newRowElement = document.createElement("tr");

    var descriptionTableCell = document.createElement("td");
    descriptionTableCell.innerText = messageTextField.value;
    newRowElement.appendChild(descriptionTableCell)

    var creditTableCell = document.createElement("td");
    creditTableCell.innerText = amtTextField.value;
    newRowElement.appendChild(creditTableCell)

    var nullElement = document.createElement("td");
    newRowElement.appendChild(nullElement)    

    var balanceTableCell = document.createElement("td");
    balanceTableCell.innerText = balance;
    newRowElement.appendChild(balanceTableCell)    

    tableElement.appendChild(newRowElement)     
}

function performDebitOp() {

    if(balance == 0) {
        alert("no sufficient funds")
        return;
    }

    if(amtTextField.value > balance) {
        alert("no sufficient funds")
        return;
    }    

    balance = balance - Number(amtTextField.value);
    
    var newRowElement = document.createElement("tr");

    var descriptionTableCell = document.createElement("td");
    descriptionTableCell.innerText = messageTextField.value;
    newRowElement.appendChild(descriptionTableCell)

    var nullElement = document.createElement("td");
    newRowElement.appendChild(nullElement) 

    var debitTableCell = document.createElement("td");
    debitTableCell.innerText = amtTextField.value;
    newRowElement.appendChild(debitTableCell)

    var balanceTableCell = document.createElement("td");
    balanceTableCell.innerText = balance;
    newRowElement.appendChild(balanceTableCell)    

    tableElement.appendChild(newRowElement)     
}



// Action to be execute when clik submitt Button:
// Create table rows
// Create  table Column --?
// Text-field value should go on Desc Column 
// Check which radio button is selected and  in that column AmountField Value should show   
// In amount column  :
    //In amount Column Show :
   // If Credit Button selected : ( amountField value + existing Credit Field value )
   // If Debit Button selected : ( amountField value + existing Debit Field value )

