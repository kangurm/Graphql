import * as utils from './utils.js';

// Event listener for login submit button
document.getElementById("loginContents").addEventListener("submit", function(event) {
    event.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    if (username.length >= 1 && password.length >= 1) {
        fetchSignin(username, password)
    } else {
        // TODO: Display error
    }
});


function fetchSignin(username, password) {
    fetch('https://01.kood.tech/api/auth/signin', {
        method: 'POST',
        headers: {
            Authorization: 'Basic ' + btoa(`${username}:${password}`),
            "Content-Type": 'application/json',
            "Content-Encoding": 'base64',
        },
    })
    .then(response => response.json())
    .then(data => {
        sessionStorage.setItem("JWT", data);
        if (utils.validateToken) {
            console.log("Token valid")
        } else {
            console.error("Token invalid")
        }

    })
    .catch((error) => {
        console.error('Error:', error);
    });
}