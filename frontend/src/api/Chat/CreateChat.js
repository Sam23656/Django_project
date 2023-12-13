import axios from 'axios';

async function CreateChat(token, first_user_id, second_user_id) {
    try {
        const response = await axios({
            method: 'post',
            url: `http://127.0.0.1:8000/api/Chat/Chat/`,
            headers: {
                'Authorization': `TOKEN ${token}`,
            },
            data: {
                first_user: first_user_id,
                second_user: second_user_id
            }
        })

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default CreateChat;