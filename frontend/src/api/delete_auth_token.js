import axios from 'axios';

async function delete_auth_token(auth_token) {
    try {
        const headers = {
            Authorization: `Token ${auth_token}`
        };
        await axios.post('http://127.0.0.1:8000/api/auth/token/logout', null, { headers });

        localStorage.removeItem('auth_token');
        window.location.href = '/'; 
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default delete_auth_token;

