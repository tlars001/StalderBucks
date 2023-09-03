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

const url = 'https://api.jsonserve.com/fva5P-';

const response = fetch(url, {
    headers: {
        'Accept': 'application/json',
    },
});

const text = response.text();

console.log(text);

  return accounts;
}