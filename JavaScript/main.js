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

    accounts.forEach(element => {
        accountList.appendChild(element);
    });
}

//======================================================================================================================
function readAccountsFile()
{
    var accounts;

    fetch("./Resources/Accounts.txt")
  .then((res) => res.text())
  .then((text) => {
    accounts = text.split("\n");
   })
  .catch((e) => console.error(e));

  // test
   return accounts;
}