import axios from 'axios';

async function getAllUsers(token) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/User/`, {
          headers: {
            Authorization: `TOKEN ${token}`,
          },
        })
        ;
    return response.data
      } catch (error) {
        console.error('Axios Error:', error);
      }
}

export default getAllUsers;