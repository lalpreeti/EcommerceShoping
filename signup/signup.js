let sign_form = document.querySelector(".signup");
let input_Fname = document.querySelector("#signFirstName");
let input_Lname = document.querySelector("#signLastName");
let input_email = document.getElementById("signEmail");
let input_password = document.getElementById("signPassword");
let input_confirm_password = document.getElementById("signCPassword");
let error = document.getElementById("error");

sign_form.addEventListener("submit", validate);

const arr = [];
let id = 0;

function validate(e) {
    e.preventDefault();
    let fname = input_Fname.value;
    let lname = input_Lname.value;
    let email = input_email.value;
    let password = input_password.value;
    let confirm_password = input_confirm_password.value;

    if (email.includes("@") == false) {
        error.innerHTML = "Email must contain @";
    } else if (checkEmail(email) == false) {
        error.innerHTML = "Email already exist";
    }

    // if(!password.includes(name) && !password.includes(email)){
    //     error.innerHTML='should be not Name and email';
    // }
    else if (!checkPassword(password,email,fname,lname)) {
        error.innerHTML = "Atleast 1 uppercase, lowercase, number, special";
    } else if (password != confirm_password) {
        error.innerHTML = "Must be same";
    } else {
        error.innerHTML = "Form submitted sucessfully";
        // error.style.color="green";
        document.querySelector(".signup").reset();
        // document.querySelector('#submit').disabled=true;

        // var obj ={id:id++,name,email,password}

        // arr = JSON.parse(getLocalStorage);

        if (window.localStorage.getItem("users")) {
            JSON.parse(window.localStorage.getItem("users")).map((value) => {
                arr.push(value);
                id = value.id;
                console.log(id);
            });
        }

        var obj = { fname, lname, email, password };

        arr.push(obj);

        console.log(arr);

        localStorage.setItem("users", JSON.stringify(arr));

        window.location.href = "/login/login.html";

        // setTimeout(() => {
        //     document.location.reload();
        // }, 3000);
    }
}
function checkPassword(password, email,Fname,Lname) {
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
        password != Fname &&password != Lname &&
        password != email
    ) {
        return true;
    } else {
        return false;
    }
}

function countSpaces(str) {
    str = str.trim();
    let arr = str.split(" ");
    return arr.length;
}
function checkEmail(email) {
    for (t of arr) {
        if (t.email == email) {
            return false;
        }
    }
}

if (window.localStorage.getItem("cu")) {
    window.location.href = "/profile/dashboard.html";
}
