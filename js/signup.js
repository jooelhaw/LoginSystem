let emailInput = document.getElementById('email');
let passInput = document.getElementById('password');
let nameInput = document.getElementById('name');
let signUpBtn = document.getElementById('signUpBtn');
let signUpForm = document.getElementById('signupForm');
let nameLabel = document.getElementById('nameLabel');
let emailLabel = document.getElementById('emailLabel');
let passLabel = document.getElementById('passLabel');
let users = [];
let emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
let passRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
let nameRegEx = /^(?=.*\w).{3,}$/;
// check regex func
function checkRegEx(regex, input) {
  return regex.test(input.value);
}

// check all validations 
function checkValidations() {
  let valid = true;
  if (nameInput.value == "") {
    nameLabel.innerHTML = "#Name is Required";
    nameLabel.style.display = 'block';
    valid = false;
  } else {
    if (!checkRegEx(nameRegEx, nameInput)) {
      nameLabel.innerHTML = "#Name is Not Valid";
      nameLabel.style.display = 'block';
      valid = false;
    }
  }
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
  } else if (!checkRegEx(passRegEx, passInput)) {
    passLabel.innerHTML = "#Password is Not Valid";
    passLabel.style.display = 'block';
    valid = false;
  }
  return valid;
}

// check if the user already signed up in the local storage
function checkNotExist(email) {
  if (localStorage.getItem('users') != null) {
    users = JSON.parse(localStorage.getItem('users'));
    for (const user of users) {
      if (email == user.email) {
        emailLabel.innerHTML = "#This Email is Already Registered";
        emailLabel.style.display = 'block';
        return false;
      }
    }
  }
  return true;
}
// Sign up ///////////////////////////////////////
// add user to local storage
function addUser(name, email, pass) {
  let user = {
    name: name,
    email: email,
    pass: pass
  }
  users.push(user);
  // save user in local db
  localStorage.setItem('users', JSON.stringify(users));
}

// clear inputs after valid registration
function clearFields() {
  emailInput.value = "";
  nameInput.value = "";
  passInput.value = "";
}
// when sign up button is clicked
signUpForm.addEventListener('submit', function (e) {
  e.preventDefault();
  if (checkValidations()) {
    if (checkNotExist(emailInput.value)) {
      addUser(nameInput.value, emailInput.value, passInput.value);
      clearFields();
      window.location.href = '/index.html';
    }
  }

});

// remove error message after typing in this field
nameInput.addEventListener('input', function (e) {
  nameLabel.style.display = 'none';
})
emailInput.addEventListener('input', function (e) {
  emailLabel.style.display = 'none';
})
passInput.addEventListener('input', function (e) {
  passLabel.style.display = 'none';
})
