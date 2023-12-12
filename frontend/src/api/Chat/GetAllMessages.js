import axios from 'axios';

async function GetAllMessages() {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/Chat/Message/`, {
        })
        ;
    return response.data
      } catch (error) {
        console.error('Axios Error:', error);
      }
}

export default GetAllMessages;