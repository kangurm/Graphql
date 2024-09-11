
export function getTokenFromStorage() {
    const JWT_token = sessionStorage.getItem("JWT");
    return JWT_token ? JWT_token : undefined
}

export function clearContent() {
    document.getElementById("root").innerHTML = '';
}

export function logout() {
    sessionStorage.removeItem("JWT");
    clearContent();
}


export async function fetchData(new_query, JWT_token) {
    return fetch("https://01.kood.tech/api/graphql-engine/v1/graphql",
        {
            method: "POST",
            headers: {
                Authorization: "Bearer " + JWT_token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: new_query }),
        })
        .then(response => response.json())
        .catch(error => console.error(error));
}

export async function fetchSignin(username, password) {
    try {
        const response = await fetch('https://01.kood.tech/api/auth/signin', {
            method: 'POST',
            headers: {
                Authorization: 'Basic ' + btoa(`${username}:${password}`),
                "Content-Type": 'application/json',
                "Content-Encoding": 'base64',
            },
        });
        const data = await response.json();
        if (response.ok) {
            sessionStorage.setItem("JWT", data);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}