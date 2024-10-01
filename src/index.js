import * as render from './script/render.js';
import { clearDataContainers, setActiveTab } from './script/util.js';

/* Initializes the app, when the player has an auth token saved in their browser session and will
be logged in immediately. */
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
        // MyProfile deprecated
        case "My Profile":
            clearDataContainers();
            render.MyProfile();
            break;
        case "Overall XP":
            clearDataContainers();
            render.OverallXP();
            break;
        case "Audits Info":
            clearDataContainers();
            render.Audits();
            break;
        default:
            render.Homepage();
    }
}

document.addEventListener("DOMContentLoaded", InitWithToken);