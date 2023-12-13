import axios from 'axios';

async function CreateFramework(token, title) {
    try {
        const response = await axios({
            method: 'post',
            url: `http://127.0.0.1:8000/api/Employee/Framework/`,
            headers: {
                'Authorization': `TOKEN ${token}`,
            },
            data: {
                title: title,
            }
        })

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default CreateFramework;
