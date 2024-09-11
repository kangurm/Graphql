
export function getTokenFromStorage() {
    const JWT_token = sessionStorage.getItem("JWT");
    return JWT_token ? JWT_token : undefined
}

export async function fetchData(new_query, JWT_token) {
    try {
        const response = await fetch ("https://01.kood.tech/api/graphql-engine/v1/graphql",
        {
            method: "POST",
            headers: {
                Authorization: "Bearer " + JWT_token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({query: new_query}),
        });
        if (response.ok) {
            const data = await response.json();
            console.log("Data: ", data)
            return data;
        }
    } catch (error) {
        console.error(error);
    }
}

export function fetchSignin(username, password) {
    fetch('https://01.kood.tech/api/auth/signin', {
        method: 'POST',
        headers: {
            Authorization: 'Basic ' + btoa(`${username}:${password}`),
            "Content-Type": 'application/json',
            "Content-Encoding": 'base64',
        },
    })
    .then(response => response.json())
    .then(data => {
        sessionStorage.setItem("JWT", data);
        const JWT_token = getTokenFromStorage();
        if (JWT_token) {
            return true;
        } else {
            console.error("Token invalid")
            return false;
        }

    })
    .catch((error) => {
        console.error('Error:', error);
        return false;
    });
}