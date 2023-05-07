let userName = document.querySelector("#dashboardName");
let userEmail = document.querySelector("#dashboardEmail");
let error = document.getElementById("error");

let conNewPassword = document.querySelector("#conNewPassword");

let changeBtn = document.querySelector("#change");
let logOutBtn = document.querySelector("#logout");

const dataG = JSON.parse(localStorage.getItem("cu"));
const dataUser = JSON.parse(localStorage.getItem("users"));

userName.innerHTML = `${dataG.fname} ${dataG.lname}`;
userEmail.innerHTML = `${dataG.email}`;
console.log(dataG);

changeBtn.addEventListener("click", (e) => {
  //if chnage buttom click

  e.preventDefault();
  let firstName=document.querySelector('#firstName');
  let lastName=document.querySelector('#lastName');
  let oldPassword = document.querySelector("#oldPassword");
  let newPassword = document.querySelector("#newPassword");
  let conNewPassword = document.querySelector("#conNewPassword");

  let text = "Press a button!\nEither OK or Cancel.";
  if(confirm(text)==true){

    if(firstName.value!= ""){
      dataG.fname=firstName.value;
    }
    if(lastName.value!= ""){
      dataG.lname=lastName.value;
    }
    window.localStorage.setItem("cu", JSON.stringify(dataG));
    window.localStorage.setItem("users", JSON.stringify(dataG));
  
    if (oldPassword.value == dataG.password) {
      // if(!checkPassword(dataG.password,dataG.name,dataG.email)){
      //     // error.innerHTML="Atleast 1 uppercase, lowercase, number, special";
      // }
      // else
  
      if (newPassword.value != conNewPassword.value) {
        error.innerHTML = "New password and confirm password both not match !!";
      } else {
        if (conNewPassword.value != "") {
          dataG.password = conNewPassword.value;
          window.localStorage.setItem("cu", JSON.stringify(dataG));
          dataUser.map((data) => {
            console.log(data.password);
            if (oldPassword.value == data.password) {
              data.password = conNewPassword.value;
              window.localStorage.setItem("users", JSON.stringify(dataUser));
            }
          });
          document.querySelector("#form").reset();
          error.innerHTML = "Password changed sucessfully";
          setTimeout(() => {
            error.innerHTML = " ";
          }, 1000);
        }
      }
    } else {
      if (oldPassword.value == "") {
        error.innerHTML = "Must be type current passowrd";
      } else {
        error.innerHTML = "Password not exist";
      }
    }

    document.querySelector("#form").reset();
    location.reload();
  }
});

console.log(dataUser);

logOutBtn.addEventListener("click", () => {
  // e.preventDefault();
  //if logout click
  if(confirm("Are you want to logout")){
    window.localStorage.removeItem("cu");
  window.location.href = "/index.html";
  }
  
});

function checkPassword(password, name, email) {
  let cl = 0,
    sl = 0,
    n = 0,
    sc = 0;
  for (let t of password) {
    if (t >= "A" && t <= "Z") {
      cl++;
    } else if (t >= "a" && t <= "z") {
      sl++;
    } else if (t >= 0 && t <= 9) {
      n++;
    } else {
      sc++;
    }
  }
  if (
    cl >= 1 &&
    sl >= 1 &&
    n >= 1 &&
    sc >= 1 &&
    password != name &&
    password != email
  ) {
    return true;
  } else {
    return false;
  }
}
