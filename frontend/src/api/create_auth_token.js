import axios from 'axios';

async function createAuthToken(email, password) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/auth/token/login', {
            email: email,
            password: password,
        });

        const { auth_token } = response.data;

        if (auth_token) {
            localStorage.setItem('auth_token', auth_token);
            return auth_token;
        } else {
            throw new Error('Token not found in response');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default createAuthToken;
