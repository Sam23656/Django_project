import axios from 'axios';

async function GetMessage(id) {
    try {
        const message = await axios.get(`http://127.0.0.1:8000/api/Chat/Message/${id}/`);
        return message.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default GetMessage;
