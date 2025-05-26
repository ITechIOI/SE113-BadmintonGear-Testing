import { jwtDecode } from "jwt-decode";
const login = async (username, password) => {
    const loginData = {
        grant_type: 'password',
        client_id: 'authservice',
        username: username,
        password: password,
        client_secret: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET,
    }
    const url = `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/micro-service/protocol/openid-connect/token`
    const formBody = Object.entries(loginData)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
    });

    if (!response.ok) {
        console.log('Login failed');
    }
    const data = await response.json();
    return data;
}



export { login };