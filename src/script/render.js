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
    let userinfo = e.UserInfo({firstName, lastName});
    let overallXPButton = e.TabButton({name: "Overall XP"});
    let projectsButton = e.TabButton({name: "My Projects"});
    let auditsButton = e.TabButton({name: "Audits"});

    document.getElementById("root").insertAdjacentHTML("afterbegin", header);
    document.getElementById("header").insertAdjacentHTML("beforeend", overallXPButton);
    document.getElementById("header").insertAdjacentHTML("beforeend", projectsButton);
    document.getElementById("header").insertAdjacentHTML("beforeend", auditsButton);
    document.getElementById("header").insertAdjacentHTML("beforeend", userinfo);

    // document.getElementById("root").insertAdjacentHTML("afterbegin", template);

    document.getElementById("home").addEventListener("click", function () {
        util.clearContent();
        Homepage();
    });

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

export function OverallXp() {
    console.log('rendering overall xp')

}

export function MyProjects() {
    console.log('rendering my projects')

}

export function Audits() {
    console.log('rendering audits')

}
