import axios from 'axios';

async function UpdateMessage(id, token, sender, receiver , message) {
    try {
        const response = await axios({
            method: 'put',
            url: `http://127.0.0.1:8000/api/Chat/Message/${id}/`,
            headers: {
                'Authorization': `TOKEN ${token}`,
            },
            data: {
                sender: sender,
                receiver: receiver,
                message: message
            }
        })

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default UpdateMessage;
