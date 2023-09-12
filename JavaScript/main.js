var jsonData;
var currentAccount = 0;
const url = 'https://api.npoint.io/fdefa62193acc0f3cd7c';

//======================================================================================================================
function login(index) {
  localStorage.setItem('accountValid', JSON.stringify(true));
  localStorage.setItem('account', JSON.stringify(index));
  location.href = "./Resources/AccountPage.html";
}

//======================================================================================================================
function displayCreateAccount() {
  document.getElementById("createAccountDiv").style.display = "block";
}

//======================================================================================================================
function createAccount() {
  var nameInput = document.getElementById("nameInput");
  var nameValue = nameInput.value;

  if (nameValue === "") {
    displayNotification("Please enter a name.");
    return;
  }

  for (var i = 0; i < jsonData.Accounts.length; i++) {
    if (jsonData.Accounts[i].name === nameValue) {
      displayNotification("Name already exists.");
      return;
    }
  }

  var newAccount = { "name": nameValue, "balance": 0 };
  jsonData.Accounts.push(newAccount);
  writeNewAccountData();

  nameInput.value = "";
  nameInput.blur();
  document.getElementById("createAccountDiv").style.display = "none";
  displayNotification("Account created successfully!");
}

//======================================================================================================================
async function writeNewAccountData() {
  updateJson();

  var accountList = document.getElementById("accountOptions");
  accountList.innerHTML = "";

  for (var i = 0; i < jsonData.Accounts.length; i++) {
    accountList.innerHTML += '<a onclick="login(' + i + ')">' + jsonData.Accounts[i].name + '</a>';
  }
}

//======================================================================================================================
async function populateLoginAccounts() {
  addMainPageEvents();
  var accountList = document.getElementById("accountOptions");
  accountList.innerHTML = "";
  await readAccountsFile();

  for (var i = 0; i < jsonData.Accounts.length; i++) {
    accountList.innerHTML += '<a onclick="login(' + i + ')">' + jsonData.Accounts[i].name + '</a>';
  }
}

//======================================================================================================================
async function readAccountsFile() {
  await fetch(url)
    .then((response) => { return response.json() })
    .then((data) => {
      jsonData = data;
    })
    .catch((e) => console.error(e));
}

//======================================================================================================================
function addMainPageEvents() {
  document.getElementById("nameInput").addEventListener("keyup", function (event) {
    if (event.key === 'Enter') {
      createAccount();
    }
  });
}

//======================================================================================================================
function addAccountPageEvents() {
  document.getElementById("depositInput").addEventListener("keyup", function (event) {
    if (event.key === 'Enter') {
      deposit();
    }
  });

  document.getElementById("withdrawInput").addEventListener("keyup", function (event) {
    if (event.key === 'Enter') {
      withdraw();
    }
  });

  document.getElementById("transferInput").addEventListener("keyup", function (event) {
    if (event.key === 'Enter') {
      transfer();
    }
  });
}

//======================================================================================================================
async function initAccountPage() {
  var accountValid = JSON.parse(localStorage.getItem('accountValid'));

  if (accountValid) {
    await readAccountsFile();
    addAccountPageEvents();
    retrieveAccountInfo();
  }
  else {
    // Leave if the selected account was not saved over local storage
    location.href = "../index.html";
  }
}

//======================================================================================================================
function retrieveAccountInfo() {
  currentAccount = JSON.parse(localStorage.getItem('account'));

  // Convert balance to numerical values
  for (var i = 0; i < jsonData.Accounts.length; i++) {
    jsonData.Accounts[i].balance = Number(jsonData.Accounts[i].balance);
  }

  var accountName = document.getElementById("welcomeHeader");
  var accountBalance = document.getElementById("accountBalance");
  accountName.innerHTML = ("Welcome " + jsonData.Accounts[currentAccount].name + '!');
  accountBalance.innerHTML = ("Funds: <b>$" + jsonData.Accounts[currentAccount].balance + "</b>");
}

//======================================================================================================================
function writeData() {
  updateJson();
  retrieveAccountInfo();
}

//======================================================================================================================
function updateJson() {
  fetch(url, {
    method: "POST",
    body: JSON.stringify(jsonData),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .catch((e) => console.error(e));
}

//======================================================================================================================
function displayDeposit() {
  document.getElementById("depositDiv").style.display = "block";
  document.getElementById("withdrawDiv").style.display = "none";
  document.getElementById("transferDiv").style.display = "none";
}

//======================================================================================================================
function displayWithdraw() {
  document.getElementById("depositDiv").style.display = "none";
  document.getElementById("withdrawDiv").style.display = "block";
  document.getElementById("transferDiv").style.display = "none";
}

//======================================================================================================================
function displayTransfer() {
  var accountList = document.getElementById("accounts");
  accountList.innerHTML = "";

  for (var i = 0; i < jsonData.Accounts.length; i++) {
    var tempName = jsonData.Accounts[i].name;
    if (tempName != jsonData.Accounts[currentAccount].name) {
      accountList.innerHTML += '<option value="' + tempName + '">' + tempName + '</option>';
    }
  }

  document.getElementById("depositDiv").style.display = "none";
  document.getElementById("withdrawDiv").style.display = "none";
  document.getElementById("transferDiv").style.display = "block";
}

//======================================================================================================================
function deposit() {
  var depositInput = document.getElementById("depositInput");
  var amount = Number(depositInput.value);

  if (amount != "") {
    jsonData.Accounts[currentAccount].balance += amount;
  }
  else {
    displayNotification("Please enter a valid amount.");
    return;
  }

  writeData();
  depositInput.blur();
  depositInput.value = "";
  displayNotification("Deposit Successful!");
}

//======================================================================================================================
function withdraw() {
  var withdrawInput = document.getElementById("withdrawInput");
  var amount = Number(withdrawInput.value);

  if (amount == "") {
    displayNotification("Please enter a valid amount.");
    return;
  }

  if (jsonData.Accounts[currentAccount].balance >= amount) {
    jsonData.Accounts[currentAccount].balance -= amount;
  }
  else {
    displayNotification("Insufficient Funds.");
    return;
  }

  writeData();
  withdrawInput.blur();
  withdrawInput.value = "";
  displayNotification("Withdrawal Successful!");
}

//======================================================================================================================
function transfer() {
  var transferInput = document.getElementById("transferInput");
  var selectedAccount = document.getElementById("accounts").value;
  var amount = Number(transferInput.value);

  if (selectedAccount == "") {
    displayNotification("Please enter an account to transfer funds.");
    return;
  }

  if (amount == "") {
    displayNotification("Please enter a valid amount.");
    return;
  }

  if (jsonData.Accounts[currentAccount].balance < amount) {
    displayNotification("Insufficient Funds.");
    return;
  }

  for (var i = 0; i < jsonData.Accounts.length; i++) {
    if (jsonData.Accounts[i].name === selectedAccount) {
      jsonData.Accounts[i].balance += amount;
      jsonData.Accounts[currentAccount].balance -= amount;
      break;
    }
  }

  writeData();
  transferInput.blur();
  transferInput.value = "";
  displayNotification("Transfer Successful!");
}

//======================================================================================================================
function displayNotification(input) {
  var notification = document.getElementById("notification");
  notification.innerHTML = input;

  notification.style.transition = 'none';
  notification.style.opacity = '1';
  void notification.offsetWidth;
  notification.style.transition = 'opacity 5s';
  notification.style.opacity = '0';

  setTimeout(function () {
    document.getElementById("notification").innerHTML = "";
  }, 5000);
}