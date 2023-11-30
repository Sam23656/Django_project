import axios from 'axios';
import Cookies from 'js-cookie';

async function createAuthToken(email, password) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/auth/jwt/create/', {
            email: email,
            password: password,
        });
        const response2 = await axios.get(`http://127.0.0.1:8000/api/User/get_id/${email}/`)
        const access_token  = response.data['access'];
        const refresh_token = response.data['refresh'];
        const id = response2.data

        if (access_token && refresh_token && id) {
            Cookies.set('access_token', access_token, {expires: 7});
            Cookies.set('refresh_token', refresh_token, {expires: 7});
            Cookies.set('id', id, {expires: 365 * 100});
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
