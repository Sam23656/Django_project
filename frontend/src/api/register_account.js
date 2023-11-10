import axios from 'axios';

async function register_account(username, email, password, fullName) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/User/', {
            username: username,
            email: email,
            password: password,
            full_name: fullName
        });
        return response.data
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default register_account;
