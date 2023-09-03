var jsonData = [];

//======================================================================================================================
function login(index)
{
  localStorage.setItem('account', JSON.stringify(jsonData[index]));
  location.href = "./Resources/AccountPage.html";
}

//======================================================================================================================
function createAccount()
{
}

//======================================================================================================================
async function populateLoginAccounts()
{
    var accountList = document.getElementById("accountOptions");
    await readAccountsFile();

    for (var i = 0; i < jsonData.length; i++)
    {
      accountList.innerHTML += '<a onclick="login(' + i + ')">' + jsonData[i][0] + '</a>';
    }
}

//======================================================================================================================
async function readAccountsFile()
{
  const url = 'https://api.npoint.io/fdefa62193acc0f3cd7c';

    await fetch(url)
  .then((response) => {return response.json()})
  .then((data) => {
    for(var i = 0; i < data.Accounts.length; i++)
    {
      jsonData.push(Object.values(data.Accounts[i]));
    }
  })
  .catch((e) => console.error(e));
}

//======================================================================================================================
function retrieveAccountInfo()
{
  var account = JSON.parse(localStorage.getItem('account'));
  var accountName = document.getElementById("welcomeHeader");
  var accountBalance = document.getElementById("accountBalance");

  accountName.innerHTML += account[0];
  accountBalance.innerHTML += account[1];
}
