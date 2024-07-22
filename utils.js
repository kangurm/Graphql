export async function validateToken() {
    const token = sessionStorage.getItem("JWT");
    return token ? true : false
}