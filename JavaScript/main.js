//======================================================================================================================
function login()
{
}

//======================================================================================================================
function createAccount()
{
}

//======================================================================================================================
function populateLoginAccounts()
{
    var accountList = document.getElementById("accountOptions");
    var accounts = readAccountsFile();

    //console.log(accounts[0]);

    accounts.forEach(element => {
        accountList.appendChild(element);
    });
}

//======================================================================================================================
function readAccountsFile()
{
    var accounts = [];
//    fetch('https://api.jsonserve.com/fva5P-', { mode: 'no-cors'})
//  .then((response) => console.log(response))
//  .catch((e) => console.error(e));

fetch('https://api.jsonserve.com/fva5P-')
.then(data => {console.log(data); return data.json()})
.then(text => {console.log(text)});

  return accounts;
}