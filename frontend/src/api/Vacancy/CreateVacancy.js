import axios from 'axios';

async function CreateVacancy(user_id, token, title, description, salary, tags, languages, frameworks) {
    try {
        const response = await axios({
            method: 'post',
            url: `http://127.0.0.1:8000/api/Employee/Vacancy/`,
            headers: {
                'Authorization': `TOKEN ${token}`,
            },
            data: {
                creator: user_id,
                title: title,
                description: description,
                salary: salary,
                tags: tags,
                languages: languages,
                frameworks: frameworks
            }
        })

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default CreateVacancy;
