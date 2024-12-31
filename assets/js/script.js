const signupForm = document.getElementById('signup-form'),
      loginForm = document.getElementById('login-form'),
      signupSubmitBtn = signupForm.querySelector('.submit-btn'),
      loginSubmitBtn = loginForm.querySelector('.submit-btn'),
      phone = document.querySelector('#phone'),
      signupPassword = document.querySelector('#user-password'),
      signupPasswordConfirm = document.querySelector('#user-password-confirm'),
      signupEmail = document.querySelector('#mail'),
      loginEmail = document.querySelector('#login-mail'),
      loginPassword = document.querySelector('#login-password'),
      signupErrorDisplayers = signupForm.getElementsByClassName('error'),
      loginErrorDisplayers = loginForm.getElementsByClassName('error'),
      signupInputFields = signupForm.querySelectorAll('input'),
      loginInputFields = loginForm.querySelectorAll('input'),
      cardContainer = document.querySelector('.card-container'),
      outroOverlay = document.querySelector('.outro-overlay');

let count = 2;

function onValidation(current, messageString, booleanTest) {
    let message = current;
    message.textContent = messageString;
    booleanTest !== 0 ? ++count : count;
}

for (let i = 0; i < signupInputFields.length; i++) {
    let currentInputField = signupInputFields[i];
    let currentErrorDisplayer = signupErrorDisplayers[i];

    currentInputField.addEventListener('keyup', (e) => {
        let message = currentErrorDisplayer;
        e.target.value !== "" ? onValidation(currentErrorDisplayer, '', 0) : onValidation(currentErrorDisplayer, '*This field is Required', 0);
    });
}

phone.addEventListener('keyup', (e) => {
    let message = signupErrorDisplayers[3];
    e.target.value === e.target.value.replace(/\D/g, '') ? onValidation(message, '', 1) : onValidation(message, '*Please enter a valid number', 0);
});

signupEmail.addEventListener('keyup', (e) => {
    let message = signupErrorDisplayers[2];
    signupEmail.value.includes('@') && signupEmail.value.includes('.com') ? onValidation(message, '', 1) : onValidation(message, '*Please provide a valid Email', 0);
});

signupPassword.addEventListener('keyup', (e) => {
    let message = signupErrorDisplayers[4];
    signupPassword.value.length >= 8 ? onValidation(message, '', 1) : onValidation(message, 'Password requires a minimum of 8 characters', 0);
});

signupPasswordConfirm.addEventListener('keyup', (e) => {
    let message = signupErrorDisplayers[5];
    signupPassword.value === e.target.value ? onValidation(message, '', 1) : onValidation(message, '*Password did not match', 0);
});

signupSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (count > 5) {
        const fname = document.getElementById('f-name').value;
        const lname = document.getElementById('l-name').value;
        const email = document.getElementById('mail').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('user-password').value;

        const user = {
            fname,
            lname,
            email,
            phone,
            password,
        };

        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        cardContainer.style.display = 'none';
        outroOverlay.classList.remove('disabled');
    } else {
        for (let i = 0; i < signupErrorDisplayers.length; i++) {
            signupErrorDisplayers[i].textContent = '*This field is Required';
        }
    }
});

// Validate login form inputs
for (let i = 0; i < loginInputFields.length; i++) {
    let currentInputField = loginInputFields[i];
    let currentErrorDisplayer = loginErrorDisplayers[i];

    currentInputField.addEventListener('keyup', (e) => {
        let message = currentErrorDisplayer;
        e.target.value !== "" ? onValidation(currentErrorDisplayer, '', 0) : onValidation(currentErrorDisplayer, '*This field is Required', 0);
    });
}

loginEmail.addEventListener('keyup', (e) => {
    let message = loginErrorDisplayers[0];
    loginEmail.value.includes('@') && loginEmail.value.includes('.com') ? onValidation(message, '', 1) : onValidation(message, '*Please provide a valid Email', 0);
});

loginPassword.addEventListener('keyup', (e) => {
    let message = loginErrorDisplayers[1];
    loginPassword.value.length >= 8 ? onValidation(message, '', 1) : onValidation(message, 'Password requires a minimum of 8 characters', 0);
});

loginSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (count > 2) {
        const email = loginEmail.value;
        const password = loginPassword.value;

        let users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            alert(`Welcome, ${user.fname}!`);
            // Redirect to a different page or update the UI
        } else {
            alert('Invalid email or password.');
        }
    } else {
        for (let i = 0; i < loginErrorDisplayers.length; i++) {
            loginErrorDisplayers[i].textContent = '*This field is Required';
        }
    }
});

// Toggle between signup and login forms
document.querySelector('.signup-link').addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.style.display = 'block';
    loginForm.style.display = 'none';
});

document.querySelector('.login-link').addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
});
