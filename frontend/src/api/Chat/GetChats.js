import axios from 'axios';

async function GetChats() {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/Chat/', {
        });
        return response.data
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default GetChats;