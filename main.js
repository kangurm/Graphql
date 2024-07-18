
document.getElementById("loginContents").addEventListener("submit", function(event) {
    event.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    if (username.length >= 1 && password.length >= 1) {
        let response = fetchSignin(username, password)
        console.log("Response: ", response)
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
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}