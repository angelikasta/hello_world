	function storeUser(){
	
	var userObject = {};
	
	userObject.firstName = document.getElementById("firstNameInput").value;
	userObject.lastName = document.getElementById("lastNameInput").value;
	userObject.email = document.getElementById("emailInput").value;
	userObject.password = document.getElementById("passwordInput").value;
	
	localStorage[userObject.email] = JSON.stringify(userObject);
	
	document.getElementById("result").innerHTML = "<b>Registration successful.</b>";
	
	}