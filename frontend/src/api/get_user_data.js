import axios from 'axios';

async function get_user_data(id, token) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/User/${id}`, {
            headers: {
                Authorization: `TOKEN ${token}`
            }
        });
        return response.data
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default get_user_data;