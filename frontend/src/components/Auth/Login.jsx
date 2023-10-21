import createAuthToken from "../../api/create_auth_token";
import { useState } from "react";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createAuthToken(email, password);
        window.location.href = '/';
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" />
                </label>
                <label>
                    Password:
                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" />
                </label>
                <input type="submit" value="Submit"/>
            </form>
        </>
    )
}

export default Login;
