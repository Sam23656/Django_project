import axios from 'axios';

async function UpdateFeedback(token, id ,user_id, object_id, message) {
    try {
        const response = await axios({
            method: 'put',
            url: `http://127.0.0.1:8000/api/User/feedback/${id}/`,
            headers: {
                'Authorization': `TOKEN ${token}`,
            },
            data: {
                user: user_id,
                object: object_id,
                message: message
            }
        })

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default UpdateFeedback;