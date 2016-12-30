
var name = document.getElementById('name');
var pw = document.getElementById('pw');


function store() {
    localStorage.setItem('name', name1.value);
    localStorage.setItem('pw', pw.value);
}


function check() {

  
    var storedname1 = localStorage.getItem('name1');
    var storedPw = localStorage.getItem('pw');


    var username1 = document.getElementById('username1');
    var userPw = document.getElementById('userPw');

	
if(username1.value == storedname1 && userPw.value == storedPw) {
        alert('You are logged in.');
    }else {
        alert('ERROR.');
    }
}

