import register_account from "../api/register_account";
import { useState } from "react";

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register_account(username, email, password, fullName);
        window.location.href = '/';
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input onChange={(e) => setUsername(e.target.value)} type="Username" name="Username" />
                </label>
                <label>
                    Full Name:
                    <input onChange={(e) => setFullName(e.target.value)} type="FullName" name="FullName" />
                </label>
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

export default Register;