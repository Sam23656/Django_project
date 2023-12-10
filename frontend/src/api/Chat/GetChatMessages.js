import axios from 'axios';
import GetChatDetail from './GetChatDetail';

async function GetChatMessages(id) {
    try {
        const chat = await GetChatDetail(id);
        const messages = chat.messages.map(async (msg) => {
            const messageData = await axios.get(`http://127.0.0.1:8000/api/Chat/Message/${msg}/`);
            return messageData.data;
        });
        return await Promise.all(messages);
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default GetChatMessages;
