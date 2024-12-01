let logInForm = document.getElementById('loginForm');
let emailInput = document.getElementById('email');
let passInput = document.getElementById('password');
let logInBtn = document.getElementById('loginBtn');
let emailLabel = document.getElementById('emailLabel');
let passLabel = document.getElementById('passLabel');
let activeUser;
let users = [];
let emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
let passRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;


// check regex func
function checkRegEx(regex, input) {
  return regex.test(input.value);
}


// check all validations 
function checkValidations() {
  let valid = true;
  if (emailInput.value == "") {
    emailLabel.innerHTML = "#Email is Required";
    emailLabel.style.display = 'block';
    valid = false;
  } else if (!checkRegEx(emailRegEx, emailInput)) {
    emailLabel.innerHTML = "#Email is Not Valid";
    emailLabel.style.display = 'block';
    valid = false;
  }
  if (passInput.value == "") {
    passLabel.innerHTML = "#Password is Required";
    passLabel.style.display = 'block';
    valid = false;
  }
  return valid;
}


// check if the user already signed up in the local storage
function checkLogin(email, pass) {
  let isEmailExist = false;
  if (localStorage.getItem('users') != null) {
    users = JSON.parse(localStorage.getItem('users'));
    for (const user of users) {
      if (user.email == email) {
        isEmailExist = true;
        if (user.pass == pass) {
          activeUser = user;
          return true;
        } else {
          passLabel.innerHTML = "#The Password is Not correct";
          passLabel.style.display = 'block';
          return false;
        }
      }
    }
  }
  if (!isEmailExist) {
    emailLabel.innerHTML = "#This Email is Not Registered";
    emailLabel.style.display = 'block';
  }
  return false;
}

// clear inputs after valid registration
function clearFields() {
  passInput.value = "";
}

// login ////////////////////////////////////////
logInForm.addEventListener('submit', function (e) {
  e.preventDefault();
  if (checkValidations())
  {
    if (checkLogin(emailInput.value, passInput.value))
    {
      localStorage.setItem('activeUser', JSON.stringify(activeUser));
      clearFields();
      document.location.href = '/home.html';
    }
  }
})

// remove error message after typing in this field
emailInput.addEventListener('input', function (e) {
  emailLabel.style.display = 'none';
})
passInput.addEventListener('input', function (e) {
  passLabel.style.display = 'none';
})
