import axios from 'axios';

async function UpdateResume(id, token, skills, languages, education, experience, social_links, additional_info) {
    try {
        console.log(skills)
        const response = await axios({
            method: 'put',
            url: `http://127.0.0.1:8000/api/JobSeeker/Resume/${id}/`,
            headers: {
                'Authorization': `TOKEN ${token}`,
            },
            data: {
                creator: id,
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

export default UpdateResume;
