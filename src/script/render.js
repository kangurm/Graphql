import * as query from './query.js';
import * as util from './util.js';

export async function Homepage() {
    const JWT_token = util.getTokenFromStorage();
    const userInfo = await util.fetchData(query.myQuery, JWT_token)

    console.log("Userinfo: ", userInfo)

}

export async function Loginpage() {
    let template =
    `
        <div class="loginContainer">
        <form id="loginContents">
            <h1 class="title">Graphql 📈📉</h1>
            <h2 class="titleGuide">Sign in to your intra account</h2>
            <input type="text" name="username" id="username" placeholder="Username/Email" required>
            <input type="password" name="password" id="password" placeholder="Password" required>
            <input type="submit" value="Login" id="submit">
        </div>
    </div>
    `
    document.body.insertAdjacentHTML("afterbegin", template);

    // Event listener for login submit button
    document.getElementById("loginContents").addEventListener("submit", function(event) {
        event.preventDefault();
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        if (username.length >= 1 && password.length >= 1) {
            util.fetchSignin(username, password);
        } else {
            // TODO: Display error
        }
    });
}