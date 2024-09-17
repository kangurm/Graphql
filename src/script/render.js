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
    } // Possibly add an else statement here to remove JWT if its unvalid and call InitWithToken() again?

    MakeHeader(firstName, lastName);

    let mainContainer = e.MainContainer();

    document.getElementById("root").insertAdjacentHTML("beforeend", mainContainer);

    let graphContainer1 = e.GraphContainer();
    let StatsContainer1 = e.StatsContainer();
    let StatsContainer2 = e.StatsContainer();



    document.getElementById("main_container").insertAdjacentHTML("beforeend", graphContainer1);
    document.getElementById("main_container").insertAdjacentHTML("beforeend", StatsContainer1);
    document.getElementById("main_container").insertAdjacentHTML("beforeend", StatsContainer2);



    document.getElementById("home").addEventListener("click", function () {
        util.clearFromRoot();
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
                util.clearFromRoot();
                Homepage();
            } else {
                console.log("Login unsuccessful", result);
                // Removing JWT just in case there is an invalid value - not needed?!
                // sessionStorage.removeItem("JWT");
                util.showError("Invalid username or password");
            }
        } else {
            util.showError("Text fields cannot be empty");
        }
    });
}

function MakeHeader(firstName, lastName) {
    let header = e.Header();
    let userinfo = e.UserInfo({firstName, lastName});
    let projectsButton = e.TabButton({name: "My Projects"});
    let overallXPButton = e.TabButton({name: "Overall XP"});
    let auditsButton = e.TabButton({name: "Audits"});


    document.getElementById("root").insertAdjacentHTML("afterbegin", header);
    document.getElementById("header").insertAdjacentHTML("beforeend", projectsButton);
    document.getElementById("header").insertAdjacentHTML("beforeend", overallXPButton);
    document.getElementById("header").insertAdjacentHTML("beforeend", auditsButton);
    document.getElementById("header").insertAdjacentHTML("beforeend", userinfo);

    // Make "My Projects" active by default when Homepage() is called
    document.getElementById("My Projects").classList.add("active");
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
