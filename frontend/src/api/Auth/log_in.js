import axios from 'axios';
import Cookies from 'js-cookie';
import get_user_data from './get_user_data';

async function logIn(email, password) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/User/auth/jwt/create', {
            email: email,
            password: password,
        });
        const response2 = await axios.get(`http://127.0.0.1:8000/api/User/get_id/${email}/`)
        const access_token  = response.data['access'];
        const refresh_token = response.data['refresh'];
        const id = response2.data
        const user_data = await get_user_data(id)
        const admin_status = user_data.role == 'admin' ? true : false;
        const user_role = user_data.role
        if (access_token && refresh_token && id) {
            Cookies.set('access_token', access_token, {expires: 7});
            Cookies.set('refresh_token', refresh_token, {expires: 7});
            Cookies.set('id', id, {expires: 365 * 100});
            Cookies.set('admin_status', admin_status, {expires: 365 * 100});
            Cookies.set('user_role', user_role, {expires: 365 * 100});
            return access_token;
        } else {
            throw new Error('Token not found in response');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default logIn;
