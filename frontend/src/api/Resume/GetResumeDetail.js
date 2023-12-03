import axios from 'axios';

async function GetResumeDetail(id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/JobSeeker/Resume/${id}/`, {
            
        });
        return response.data
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default GetResumeDetail;

