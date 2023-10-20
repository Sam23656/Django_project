import axios from 'axios';

async function get_users() {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/users/?format=json');
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default get_users;
