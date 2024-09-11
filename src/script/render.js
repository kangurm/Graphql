import * as query from './query.js';
import * as util from './util.js';

export async function Homepage() {
    const JWT_token = util.getTokenFromStorage();
    const userInfo =  await util.fetchData(query.userQuery, JWT_token);

    let firstName;
    let lastName;
    console.log("Userinfo: ", userInfo)
    if (userInfo.error === undefined) {
        firstName = userInfo.data.user[0].firstName;
        lastName = userInfo.data.user[0].lastName;
    }

    console.log("Userinfo: ", userInfo)

    let template =
    `
    <div class="user_info">
        <span class="welcome_message">Welcome,
            <span class="welcome_name">${firstName} ${lastName}</span>
        </span>
        <div id="logout">Logout</div>
    </div>
    `
    document.getElementById("root").insertAdjacentHTML("afterbegin", template);

    document.getElementById("logout").addEventListener("click", function () {
        util.logout();
        Loginpage();
    })
}

export async function Loginpage() {
    let template =
    `
    <div id="login_container">
        <form id="login_contents">
            <h1 class="title">Graphql 📈📉</h1>
            <h2 class="title_guide">Sign in to your intra account</h2>
            <input type="text" name="username" id="username" placeholder="Username/Email" required>
            <input type="password" name="password" id="password" placeholder="Password" required>
            <input type="submit" value="Login" id="submit">
        </div>
    </div>
    `
    document.getElementById("root").insertAdjacentHTML("afterbegin", template);

    // Event listener for login submit button
    document.getElementById("login_contents").addEventListener("submit", async function (event) {
        event.preventDefault();
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        if (username.length >= 1 && password.length >= 1) {
            let result;
            if (result = await util.fetchSignin(username, password)) {
                console.log("Login successful", result)
                util.clearContent();
                Homepage();
            } else {
                console.log("Login unsuccessful", result);
                sessionStorage.removeItem("JWT");
            }
        } else {
            console.log("Invalid amount of characters")
            // TODO: Display error
        }
    });
}
