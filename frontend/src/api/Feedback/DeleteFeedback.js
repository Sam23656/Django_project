import axios from 'axios';

async function DeleteFeedback(id, token) {
    try {
        const response = await axios({
            method: 'delete',
            url: `http://127.0.0.1:8000/api/User/feedback/${id}/`,
            headers: {
                'Authorization': `TOKEN ${token}`,
            }
        })

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default DeleteFeedback;