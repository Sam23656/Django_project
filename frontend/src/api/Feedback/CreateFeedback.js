import axios from 'axios';

async function CreateFeedback(token, user_id, object_id, message) {
    try {
        const response = await axios({
            method: 'post',
            url: `http://127.0.0.1:8000/api/User/feedback/`,
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

export default CreateFeedback;