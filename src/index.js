import * as render from './script/render.js';

// Initializes the app, when the player has an auth token saved in browser session he will be logged in immediately.
function InitWithToken() {
    const JWT_token = sessionStorage.getItem("JWT");
    if (JWT_token) {
        render.Homepage();
    } else {
        render.Loginpage();
    }
}

document.addEventListener("DOMContentLoaded", InitWithToken);