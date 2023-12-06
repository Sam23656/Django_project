import axios from 'axios';

async function CreateJobApplication(user_id, token, vacancy_id) {
    try {
        const response = await axios({
            method: 'post',
            url: `http://127.0.0.1:8000/api/JobSeeker/JobApplication/`,
            headers: {
                'Authorization': `TOKEN ${token}`,
            },
            data: {
                creator: user_id,
                vacancy: vacancy_id
            }
        })

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default CreateJobApplication;
