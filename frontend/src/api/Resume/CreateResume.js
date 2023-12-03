import axios from 'axios';

async function CreateResume(user_id, token, skills, languages, education, experience, social_links, additional_info) {
    try {
        const response = await axios({
            method: 'post',
            url: `http://127.0.0.1:8000/api/JobSeeker/Resume/`,
            headers: {
                'Authorization': `TOKEN ${token}`,
            },
            data: {
                creator: user_id,
                skills: skills,
                languages: languages,
                education: education,
                experience: experience,
                social_links: social_links,
                additional_info: additional_info
            }
        })

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default CreateResume;
