function storeUser() {

    var userObject = {};

    userObject.firstName = document.getElementById("firstNameInput").value;
    userObject.lastName = document.getElementById("lastNameInput").value;
    userObject.email = document.getElementById("emailInput").value;
    userObject.password = document.getElementById("passwordInput").value;
    userObject.phoneNumber = document.getElementById("phoneNumberInput").value;
    userObject.gender = document.getElementById("GenderInput").value;
    userObject.dateOfBirth = document.getElementById("DateOfBirthInput").value;
    userObject.topScore = 0;

    //store the user
    localStorage[userObject.email] = JSON.stringify(userObject);

    //inform user of result
    document.getElementById("result").innerHTML = "<b>Registration successful.</b>";

}


function validateForm() {
    var nameValid = document.forms["regForm"]["firstName"].value;
    var passValid = document.forms["regForm"]["password"].value;


    // validation fails if the input is blank
    if (nameValid == "" || nameValid == null) {
        alert("Error: Name is empty!");
        return false;

    }
    //validation fails in password has less than 5 characters
    if (passValid.length < 5) {
        alert("Error: Password must contain at least 5 characters!");
        return false;

    }
    if (nameValid == passValid) {
        alert("Error: Password can't be the same as name!");
        return false;

    }

    // validation was successful
    storeUser();
    return true;
    console.log("validation successful");
}

function checkLogin() {
    if (localStorage.loggedInUsrEmail !== undefined) {
        //enameValidtract details of logged in user
        var userObject = JSON.parse(localStorage[localStorage.loggedInUsrEmail]);

        //Say hello to logged in user
        document.getElementById("loginPara").innerHTML = "Hello " + userObject.firstName;

    }
}
var userLoggedIn = false;

function login() {
    //get email address
    var email = document.getElementById("emailInput").value;

    //user does not have an account
    if (localStorage[email] === undefined) {

        //inform user they do not have an account
        document.getElementById("loginFailure").innerHTML = "Email not recognized. Please check or create new account.";
        return;

    } else {
        var userObject = JSON.parse(localStorage[email]);
        var password = document.getElementById("passwordInput").value;
        if (password === userObject.password) { //successful login



            sessionStorage.loggedInUsrEmail = userObject.email;
            sessionStorage.loggedInFirstName = userObject.firstName;

            //trying to display score and keep it, doesnt work
            sessionStorage.loggedInScore = userObject.topScore;
            //localStorage.topScore=sessionStorage.loggedInScore;

            sessionStorage.userLoggedIn = true;


            document.getElementById("loginPara").innerHTML = userObject.firstName + " logged in";
            document.getElementById("loginFailure").innerHTML = ""; //clear any login failure

            var logoutButton = document.getElementById("logout");
            logoutButton.style = "visibility: hidden;";



        } else {
            document.getElementById("loginFailure").innerHTML = "Password incorrect. Please try again.";
        }


    }
}


function logout() {
    console.log("logout pressed");
    var formLogOut = document.getElementById("di2");
    formLogOut.style = "visibility: visible;";
    var logoutButton = document.getElementById("logout");
    logoutButton.style = "visibility: hidden;";
    sessionStorage.clear();

}

		