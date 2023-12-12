import axios from 'axios';

async function GetAllFeedbacks() {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/User/feedback/`, {
        })
        ;
    return response.data
      } catch (error) {
        console.error('Axios Error:', error);
      }
}

export default GetAllFeedbacks;