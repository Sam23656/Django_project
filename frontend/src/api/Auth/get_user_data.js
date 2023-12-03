import axios from 'axios';

async function get_user_data(id, token) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/User/${id}/`, {
        })
        ;
    return response.data
      } catch (error) {
        console.error('Axios Error:', error);
      }
}

export default get_user_data;