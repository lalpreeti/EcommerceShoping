window.history.forward();
function noBack() {
  window.history.forward();
}

let login_form = document.querySelector(".login");
login_form.addEventListener("submit", loginForm);

let emailLog = document.getElementById("loginEmail");
let passwordLog = document.getElementById("loginPassword");
let error = document.getElementById("error");

const currentUser = {};

// let dataN;
function loginForm(e) {
  e.preventDefault(); //stop the submit and hold the data from

  dataN = JSON.parse(localStorage.getItem("users"));
  //       = it convert string to object

  let email = emailLog.value;
  let password = passwordLog.value;
  let cases = ["Email not found", "Password Incorrect", "login sucessfull"];
  let x = checkLogin(email, password);
  if (x == 0 || x == 1) {
    error.innerHTML = cases[x];
  } else {
    error.innerHTML = cases[x];
    JSON.parse(localStorage.getItem("users"));

    localStorage.setItem("cu", JSON.stringify(currentUser));
    window.location.href = "/profile/dashboard.html";
  }
}

//Check Email match or not
function checkLogin(email, password) {
  let flag = 0;
  // for(let t of dataN){
  for (let t in dataN) {
    if (email == dataN[t].email) {
      if (password == dataN[t].password) {
        // currentUser.id=t;
        currentUser.fname = dataN[t].fname;
        currentUser.lname = dataN[t].lname;
        currentUser.email = dataN[t].email;
        currentUser.password = dataN[t].password;
        // currentUser.token = genarateToken();
        // return "login sucssfully";
        return 2;
      } else {
        // return "password incorrect";
        return 1;
      }
      flag = 1;
    }
  }
  if (flag == 0) {
    // return "Email not found";
    return 0;
  }
}

//create a random TOKEN
function genarateToken() {
  let capital_digit = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //
  let small_digit = "abcdefghijklmnopqrstuvwxyz"; //4
  let number = "0123456789"; //1
  let special = "!@#$%^&*()_+"; //1

  let characters = capital_digit + small_digit + number + special;
  let token = "";
  for (let i = 0; i < 16; i++) {
    let random = Math.floor(Math.random() * characters.length);
    token = token + characters[random];
  }
  return token; //store  the token in the person obbject who logged in
}

// function genarateToken1(){
//     let characters=crypto.randomUUID();
//     let token="";
//     for(let i=0;i<10;i++){
//         let random= Math.floor(Math.random()*characters.length);
//         token=token+characters[random]
//         // console.log(token);
//     }
//     return token;
// }
// console.log(genarateToken1());

if (window.localStorage.getItem("cu")) {
  window.location.href = "./dashboard.html";
}
