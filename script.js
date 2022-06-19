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

function addUserInfo(userItems, user, isUserNew){
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
            if(!isUserNew){
                userInfo.innerText = dateFormater(userItems[userItem]);
            }else{
                userInfo.innerText = userItems[userItem];
            }
        } else{
            userInfo.innerText = userItems[userItem];
        }

        user.append(userInfo);
    }
}

function addCurrentUsers(users){

        users.forEach( userItems => {
            const user = document.createElement('tr');
            const usersList = document.querySelector('.manage-users__users');

            user.className = 'manage-users__user';

            usersList.append(user);

            addUserInfo(userItems, user, false)

            addDeleteUserToDOM(user)
        });
}

addCurrentUsers(users);

function deleteUser(deleteUser){
    const user = deleteUser.parentElement.parentElement;
    const userParent = user.parentElement;
    const userToBeDeleted = [...userParent.children].indexOf(user);

    user.remove(); // remove the user (tr element) from the DOM
    users.splice(userToBeDeleted, 1); // remove the user object from the array users
    console.log(users);
}

// Transform the date from current format to Day/Month/Year format

function dateFormater(date){
    const year = date.match(/^([0-9]{4})/)[0];
    const month = date.match(/-[0-9]{2}/)[0].replace('-', '');
    const day = date.match(/-[0-9]{2}T/)[0].replace('T', '').replace('-', '');

    return day + '/' + month + '/' + year;
}

function dateFormaterNewUser(date){
    const year = date.match(/^([0-9]{4})/)[0];
    const month = date.match(/-[0-9]{2}-/)[0].replace(/-/g, '');
    const day = date.match(/(-[0-9]{2})$/)[0].replace('-', '');

    return day + '/' + month + '/' + year;
}

// Show ajout d'utilisateurs form

function addUserFormToggler(){
    const addUserForm = document.querySelector('#addUserForm');
    const showButton = document.querySelector('.manage-users__show-form').firstElementChild;

    showButton.addEventListener('click', (event) => {
        if(!addUserForm.className.includes('show')){
            showButton.parentElement.style.display = 'none';
            addUserForm.className += ' show';
            event.target.setAttribute('aria-expanded', 'true');
        }else{
            // From the imaegs on the exercise page this bellow part might be optional and not neccessary
            addUserForm.className = addUserForm.className.replace(' show', '');
            event.target.setAttribute('aria-expanded', 'false');
        }
    });

}

addUserFormToggler();

function addNewUser(){
    const addUserBtn = document.querySelector('.add-user-btn');
    const newUser = {
        id: "",
        createdDate: "",
        status: "",
        firstName: "",
        lastName: "",
        userName: "",
        registrationNumber: "",
    };

    addUserBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const formInfo = event.target.parentElement.parentElement;
        const user = document.createElement('tr');
        const usersList = document.querySelector('.manage-users__users');

        newUser.id = Math.ceil(Math.random()*1000000000) + '';
        newUser.createdDate = dateFormaterNewUser(formInfo['creation-date'].value);
        newUser.status = formInfo.status.value;
        newUser.firstName = formInfo['first-name'].value;
        newUser.lastName = formInfo['last-name'].value;
        newUser.userName = formInfo.username.value;
        newUser.registrationNumber = formInfo['registration-number'].value;

        console.log(newUser, users);
        users.push(newUser);

        addUserInfo(newUser, user, true);

        addDeleteUserToDOM(user)

        usersList.append(user);
    });
}

function addDeleteUserToDOM(user){
    const actionRow = document.createElement('td');
    actionRow.innerHTML = '<button type="button" class="delete-user" onclick="deleteUser(this)"></button>';
    user.append(actionRow);
}

addNewUser();