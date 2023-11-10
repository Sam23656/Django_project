import axios from 'axios';

async function createAuthToken(email, password) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/auth/jwt/create/', {
            email: email,
            password: password,
        });

        const access_token  = response.data['access'];
        const refresh_token = response.data['refresh'];

        if (access_token && refresh_token) {
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            return access_token;
        } else {
            throw new Error('Token not found in response');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default createAuthToken;
