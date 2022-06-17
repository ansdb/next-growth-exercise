const users = [
    {
      id: "123456789",
      createdDate: "2021-01-06T00:00:00.000Z",
      status: "En validation",
      firstName: "Mohamed",
      lastName: "Taha",
      userName: "mtaha",
      registrationNumber: "2584",
    },
     {
      id: "987654321",
      createdDate: "2021-07-25T00:00:00.000Z",
      status: "Validé",
      firstName: "Hamid",
      lastName: "Orrich",
      userName: "horrich",
      registrationNumber: "1594",
    },
       {
      id: "852963741",
      createdDate: "2021-09-15T00:00:00.000Z",
      status: "Rejeté",
      firstName: "Rachid",
      lastName: "Mahidi",
      userName: "rmahidi",
      registrationNumber: "3576",
    }
]

function addCurrentUsers(users){

        users.forEach( userItems => {
            const user = document.createElement('tr');
            const usersAddIn = document.querySelector('.manage-users__users');

            user.className = 'manage-users__user';

            usersAddIn.append(user);

            for(let userItem in userItems){
                userInfo = document.createElement('td');

                if(userItem === 'status'){
                    if(userItems[userItem] === 'En validation'){
                        userInfo.innerHTML = '<span class="status on-validation">' + userItems[userItem] + '</span>';
                    }else if(userItems[userItem] === 'Validé'){
                        userInfo.innerHTML = '<span class="status valide">' + userItems[userItem] + '</span>';
                    }else if(userItems[userItem] === 'Rejeté'){
                        userInfo.innerHTML = '<span class="status rejected">' + userItems[userItem] + '</span>'
                    }
                } else if(userItem === 'createdDate'){
                    userInfo.innerText = dateFormater(userItems[userItem]);
                } else{
                    userInfo.innerText = userItems[userItem];
                }

                user.append(userInfo);
            }

            const actionRow = document.createElement('td');
            actionRow.innerHTML = '<button type="button" class="delete-user" onclick="deleteUser(this)"></button>';
            user.append(actionRow);
        });
}

addCurrentUsers(users);

function deleteUser(deleteUser){
    const user = deleteUser.parentElement.parentElement;
    const userParent = user.parentElement;
    const userToBeDeleted = [...userParent.children].indexOf(user);

    user.remove(); // remove the user (tr element) from the DOM
    users.splice(userToBeDeleted, 1); // remove the user object from the array users
}

// Transform the date from current format to Day/Month/Year format

function dateFormater(date){
    const year = date.match(/^[0-9]{4}/)[0];
    const month = date.match(/-[0-9]{2}/)[0].replace('-', '');
    const day = date.match(/-[0-9]{2}T/)[0].replace('T', '').replace('-', '');

    return day + '/' + month + '/' + year;
}