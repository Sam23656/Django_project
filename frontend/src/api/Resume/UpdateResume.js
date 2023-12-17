import axios from 'axios';

async function UpdateResume(user_id, id, token, skills, languages, education, experience, social_links, additional_info, frameworks) {
    try {
        const response = await axios({
            method: 'put',
            url: `http://127.0.0.1:8000/api/JobSeeker/Resume/${id}/`,
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
                additional_info: additional_info,
                frameworks: frameworks
            }
        })

        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default UpdateResume;
