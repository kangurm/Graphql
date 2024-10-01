import * as query from './query.js';
import * as e from './component.js';
import * as util from './util.js';


export async function Homepage() {
    const JWT_token = util.getTokenFromStorage();
    const user = await util.fetchData(query.userQuery, JWT_token);

    let firstName;
    let lastName;
    if (user.error === undefined) {
        firstName = user.data.user[0].firstName;
        lastName = user.data.user[0].lastName;
    } // Possibly add an else statement here to remove JWT if its unvalid and call InitWithToken() again?

    let user_id = user.data.user[0].id;
    sessionStorage.setItem("user_id", user_id);

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

    OverallXP();
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
    let userinfo = e.UserInfo({ firstName, lastName });
    // let profileButton = e.TabButton({ name: "My Profile" });
    let overallXPButton = e.TabButton({ name: "Overall XP" });
    let auditsButton = e.TabButton({ name: "Audits Info" });


    document.getElementById("root").insertAdjacentHTML("afterbegin", header);
    // document.getElementById("header").insertAdjacentHTML("beforeend", profileButton);
    document.getElementById("header").insertAdjacentHTML("beforeend", overallXPButton);
    document.getElementById("header").insertAdjacentHTML("beforeend", auditsButton);
    document.getElementById("header").insertAdjacentHTML("beforeend", userinfo);

    // Make "Overall XP" active by default when Homepage() is called
    document.getElementById("Overall XP").classList.add("active");
}

export async function OverallXP() {
    const JWT_token = util.getTokenFromStorage();
    const xpdata = await util.fetchData(query.ProjectsQuery, JWT_token);

    let xpTransactions = xpdata.data.transaction;
    let xpTransactionsLength = xpTransactions.length;
    let xpTransactionsList = [];
    for (let i = 0; i < xpTransactionsLength; i++) {
        xpTransactionsList.push([xpTransactions[i].object.name, xpTransactions[i].amount]);
    }

    // List for the graph
    const xpTransactionsListNumbers = JSON.parse(JSON.stringify(xpTransactionsList));

    // Stats for the top 5 projects
    xpTransactionsList.sort((a, b) => b[1] - a[1]);
    xpTransactionsList.splice(5);

    for (let i = 0; i < xpTransactionsList.length; i++) {
        xpTransactionsList[i][1] = (xpTransactionsList[i][1] / 1000).toFixed(1) + "kB";
    }

    // Stats for the Total XP amount
    let totalXP = 0;
    for (let i = 0; i < xpTransactionsLength; i++) {
        totalXP += xpTransactions[i].amount;
    }

    totalXP = (totalXP / 1000).toFixed(2) + "kB";

    // Load the Visualization API and the corechart package.
    google.charts.load('current', { 'packages': ['corechart'] });

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Project');
        data.addColumn('number', 'XP');
        data.addRows(xpTransactionsListNumbers);

        // Set chart options
        var options = {
            'title': 'XP Rewards Based on Projects',
            'width': 1125,
            'height': 600,
            'backgroundColor': 'transparent'
        };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('graph_container'));
        chart.draw(data, options);
    }

    let statsContent1 = e.StatsContent("Total XP", totalXP, false);
    let statsContent2 = e.StatsContent("Highest Rewarded Projects", xpTransactionsList, true);

    document.getElementById("stats1").innerHTML = statsContent1;
    document.getElementById("stats2").innerHTML = statsContent2;

}

// Deprecated for now
// export async function MyProfile() {
//     const JWT_token = util.getTokenFromStorage();
//     const xpdata = await util.fetchData(query.ProjectsQuery, JWT_token);

// }

export async function Audits() {
    const JWT_token = util.getTokenFromStorage();
    const auditsData = await util.fetchData(query.AuditsQuery, JWT_token);


    // Load the Visualization API and the corechart package.
    google.charts.load('current', { 'packages': ['corechart'] });

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Audits');
        data.addColumn('number', 'Amount');
        data.addRows([
            ['Given', auditsData.data.upTransactions.aggregate.count],
            ['Received', auditsData.data.downTransactions.aggregate.count],
        ]);

        // Set chart options
        var options = {
            'title': 'Audits Given VS Audits Received',
            'width': 1125,
            'height': 600,
            'backgroundColor': 'transparent'
        };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.BarChart(document.getElementById('graph_container'));
        chart.draw(data, options);
    }

    let auditRatio = auditsData.data.user[0].auditRatio.toFixed(2);

    let audits = auditsData.data.audit

    let failsGiven = 0;

    audits.forEach(audit => {
        if (audit.grade !== null && audit.grade < 1) {
            failsGiven++;
        }
    })

    let statsContent1 = e.StatsContent("Audit Ratio", auditRatio, false);
    let statsContent2 = e.StatsContent("Failed Audits Given To Others", failsGiven, false);

    document.getElementById("stats1").innerHTML = statsContent1;
    document.getElementById("stats2").innerHTML = statsContent2;
}
