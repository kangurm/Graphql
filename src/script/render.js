import * as query from './query.js';
import * as e from './component.js';
import * as util from './util.js';

export async function Homepage() {
    const JWT_token = util.getTokenFromStorage();
    const user =  await util.fetchData(query.userQuery, JWT_token);

    let firstName;
    let lastName;
    console.log("user: ", user)
    if (user.error === undefined) {
        firstName = user.data.user[0].firstName;
        lastName = user.data.user[0].lastName;
    }

    console.log("user: ", user)
    let header = e.Header();
    let template = e.UserInfo({firstName, lastName});

    document.getElementById("root").insertAdjacentHTML("afterbegin", header);
    document.getElementById("header").insertAdjacentHTML("beforeend", template);

    // document.getElementById("root").insertAdjacentHTML("afterbegin", template);

    document.getElementById("logout").addEventListener("click", function () {
        util.logout();
        Loginpage();
    })
}

export async function Loginpage() {
    let template = e.LoginContainer();

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
                // Removing JWT just in case there is an invalid value
                // sessionStorage.removeItem("JWT");
            }
        } else {
            console.log("Invalid amount of characters")
            // TODO: Display error
        }
    });
}
