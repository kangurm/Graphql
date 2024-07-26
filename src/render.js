import * as query from './queries.js';
import * as utils from './utils.js';

export async function renderHomepage() {
    const JWT_token = utils.getTokenFromStorage();
    const userInfo = await utils.fetchData(query.userQuery, JWT_token)

    console.log("Userinfo: ", userInfo)

}

export async function renderLoginpage() {
    let template = 
    `
        <div class="login_container">
        <form id="login_contents">
            <h1 class="title">Graphql 📈📉</h1>
            <h2 class="title_guide">Sign in to your intra account</h2>
            <input type="text" name="username" id="username" placeholder="Username/Email" required>
            <input type="password" name="password" id="password" placeholder="Password" required>
            <input type="submit" value="Login" id="submit">
        </div>
    `
    document.body.insertAdjacentHTML("afterbegin", template);
    
    // Event listener for login submit button
    document.getElementById("loginContents").addEventListener("submit", function(event) {
        event.preventDefault();
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        if (username.length >= 1 && password.length >= 1) {
            if (utils.fetchSignin(username, password)) {
                renderHomepage();
            }
        } else {
            // TODO: Display error
        }
    });
}