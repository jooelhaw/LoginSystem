let userNameH1 = document.getElementById('userName');
let signOutBtn = document.getElementById('signOut');

let activeUser;

function displayActiveUser() {
  if (localStorage.getItem('activeUser') != null) {
    activeUser = JSON.parse(localStorage.getItem('activeUser'));
    userNameH1.innerHTML = `Hello <span class = "userName">${activeUser.name}</span> <br><br> Nice to Meet You.`;
    console.log(activeUser);
  }
}
displayActiveUser();
signOutBtn.addEventListener('click', function (e) {
  console.log('button clicked');
  e.preventDefault();

  logOut();
})

function logOut() {
  localStorage.removeItem('activeUser');
  document.location.href = '/index.html';
}