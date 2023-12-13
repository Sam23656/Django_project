import axios from 'axios';

async function UpdateFramework(id, token, title) {
    try {
        const response = await axios({
            method: 'put',
            url: `http://127.0.0.1:8000/api/Employee/Language/${id}/`,
            headers: {
                'Authorization': `TOKEN ${token}`,
            },
            data: {
                title: title
            }
        })

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default UpdateFramework;