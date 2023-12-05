import axios from 'axios';

async function UpdateVacancy(user_id, id, token, title, description, salary, tags, languages) {
    try {
        const response = await axios({
            method: 'put',
            url: `http://127.0.0.1:8000/api/Employee/Vacancy/${id}/`,
            headers: {
                'Authorization': `TOKEN ${token}`,
            },
            data: {
                creator: user_id,
                tags: tags,
                languages: languages,
                title: title,
                description: description,
                salary: salary,
            }
        })

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default UpdateVacancy;
