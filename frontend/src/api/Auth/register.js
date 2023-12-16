import axios from 'axios';

async function register_account(username, email, password, fullName, userType, dateOfBirth, company_name, industry) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/User/', {
            email: email,
            username: username,
            password: password,
            full_name: fullName,
            role: userType,
            birthday: dateOfBirth,
            company_name: company_name,
            industry: industry
        });
        return response.data
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default register_account;
