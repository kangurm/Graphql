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
    let statsContainer1 = e.StatsContainer();



    document.getElementById("main_container").insertAdjacentHTML("beforeend", graphContainer1);
    document.getElementById("main_container").insertAdjacentHTML("beforeend", statsContainer1);



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

export async function OverallXP() {
    const JWT_token = util.getTokenFromStorage();
    const xpdata =  await util.fetchData(query.ProjectsQuery, JWT_token);

    let xpTransactions = xpdata.data.transaction;
    let xpTransactionsLength = xpTransactions.length;
    let xpTransactionsList = [];
    for (let i = 0; i < xpTransactionsLength; i++) {
        xpTransactionsList.push([xpTransactions[i].object.name, xpTransactions[i].amount]);
    }

    xpTransactionsList.sort((a, b) => b[1] - a[1]);
    xpTransactionsList.splice(5);

    for (let i = 0; i < xpTransactionsList.length; i++) {
        xpTransactionsList[i][1] = (xpTransactionsList[i][1] / 1000).toFixed(1) + "kB";
    }

    let totalXP = 0;
    for (let i = 0; i < xpTransactionsLength; i++) {
        totalXP += xpTransactions[i].amount;
    }

    totalXP = (totalXP / 1000).toFixed(2) + "kB";




    console.log(xpdata);

    // Load the Visualization API and the corechart package.
    google.charts.load('current', {'packages':['corechart']});

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['Mushrooms', 3],
          ['Onions', 1],
          ['Olives', 1],
          ['Zucchini', 1],
          ['Pepperoni', 2]
        ]);

        // Set chart options
        var options = {'title':'How Much Pizza I Ate Last Night',
                       'width':1125,
                       'height':875,
                       'backgroundColor': 'transparent'};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('graph_container'));
        chart.draw(data, options);
      }

      let statsContent1 = e.StatsContent("Total XP", totalXP, false);
      let statsContent2 = e.StatsContent("Highest Rewarded Projects", xpTransactionsList, true);

      document.getElementById("stats1").innerHTML = statsContent1;
      document.getElementById("stats2").innerHTML = statsContent2;

}

export function MyProjects() {
    console.log('rendering my projects')

}

export function Audits() {
    console.log('rendering audits')

}
