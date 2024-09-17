import * as render from './script/render.js';
import { clearContent, setActiveTab } from './script/util.js';

// Initializes the app, when the player has an auth token saved in browser session he will be logged in immediately.
function InitWithToken() {
    const JWT_token = sessionStorage.getItem("JWT");
    if (JWT_token) {
        render.Homepage();
    } else {
        render.Loginpage();
    }
}

window.changeTab = (event, name) => {
    setActiveTab(event.target);
    switch (name) {
        case "Overall XP":
            render.OverallXp();
            break;
        case "My Projects":
            render.MyProjects();
            break;
        case "Audits":
            render.Audits();
            break;
        default:
            render.Homepage();
    }
}

document.addEventListener("DOMContentLoaded", InitWithToken);