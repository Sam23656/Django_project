import axios from 'axios';

async function GetAllTags() {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/Employee/Tag/`, {
        })
        ;
    return response.data
      } catch (error) {
        console.error('Axios Error:', error);
      }
}

export default GetAllTags;