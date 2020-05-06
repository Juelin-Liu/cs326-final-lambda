const url = "https://aqueous-dusk-44841.herokuapp.com/profile"; 
const homeURL = "https://aqueous-dusk-44841.herokuapp.com"
const getInfoURL = "https://aqueous-dusk-44841.herokuapp.com/get_user_info"

// const url = "localhost:8080/profile"
// const homeURL="localhost:8080"
// const getInfoURL = "localhost:8080/get_user_info"

// NEW: helper method for posting data
async function postData(url, data) {
    const resp = await fetch(url,
		{
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			redirect: 'follow',
			body: JSON.stringify(data)
		});
    return resp;
}


function checker() {
	async () => {
		let username = document.getElementById("username").value;
		let email = document.getElementById("email").value;
		let password = document.getElementById("password").value;
		let confirmPassword = document.getElementById("password-confirm").value;
		if (password == confirmPassword) {
			if (password.value.match(/[a-z]/g) && password.value.match(/[A-Z]/g) && password.value.match(/[0-9]/g)&& password.value.length>=8){
				document.getElementById("password-prompt").addAttribute('hidden');
			}
			else{
				let message = "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters";
				document.getElementById("password-prompt").removeAttribute('hidden');
				document.getElementById("password-prompt").innerHTML = message;
			}
		}
		if (password != confirmPassword) {
			let message = "Two password not the same";
			document.getElementById("password-prompt").removeAttribute('hidden');
			document.getElementById("password-prompt").innerHTML = message;
		}
		
	}
};

function profile(){
	(async () => {
		console.log('running profile')
		let username = document.getElementById("username").value;
		let email = document.getElementById("email").value;
		let password = document.getElementById("password").value;
		let confirmPassword = document.getElementById("password-confirm").value;
		if(checker===true){
			const data = { 'email' : email, 'username' : username, 'password' : password }; // -- (1)
			const resp = await postData(url, data); 
			const j = await resp.json();
			console.log('Result is: ')
			console.log(j)
			if (j['result'] !== 'success') {
				document.getElementById("output").innerHTML = j['result'];
			} else {
				document.getElementById("output").innerHTML = username + ' update profile';
				setTimeout(function(){window.location.href=homeURL}, 1500) 
			}
		}
		else{
			document.getElementById("output").innerHTML = 'please try again';
		}
    })();
}

function get_user_info(){
	(async() =>{
		let resp = await fetch(getInfoURL)
		let j = await resp.json()
		if (j['result'] == 'success'){
			let email = document.getElementById("email")
			email.value = j['email']
			let username = document.getElementById("username")
			username.value = j['username']
		} else {
			console.log("Something goes wrong")
		}
	})()
}