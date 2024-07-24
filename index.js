import * as utils from './utils.js';
import * as query from './queries.js';
import * as render from './render.js';

function InitWithToken() {
    const JWT_token = sessionStorage.getItem("JWT");
    if (JWT_token) {
        render.renderHomepage();
    } else {
        render.renderLoginpage();
    }
}

document.addEventListener("DOMContentLoaded", InitWithToken);