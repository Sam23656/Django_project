import axios from 'axios';

async function AddMessage(token, sender_id, receiver_id, message) {
    try {
        const response = await axios({
            method: 'post',
            url: `http://127.0.0.1:8000/api/Chat/Message/`,
            headers: {
                'Authorization': `TOKEN ${token}`,
            },
            data: {
                sender: sender_id,
                receiver: receiver_id,
                message: message
            }
        })

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default AddMessage;
