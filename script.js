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

        users.forEach(userItems => {
            const user = document.createElement('tr');
            user.className = 'manage-users__user';
            document.querySelector('.manage-users__users').append(user);

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
                }else{
                    userInfo.innerText = userItems[userItem];
                }

                user.append(userInfo);
            }
        });
}

addCurrentUsers(users);