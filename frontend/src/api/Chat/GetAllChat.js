import axios from 'axios';

async function GetAllChat() {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/Chat/Chat/`, {
        })
        ;
    return response.data
      } catch (error) {
        console.error('Axios Error:', error);
      }
}

export default GetAllChat;