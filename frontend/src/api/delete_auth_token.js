import axios from 'axios';

async function delete_auth_token(auth_token) {
        localStorage.removeItem('auth_token');
}

export default delete_auth_token;

