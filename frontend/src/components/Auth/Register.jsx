import register_account from "../../api/register_account";
import { useState } from "react";


function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');

    const buttonClick = async (e) => {
        e.preventDefault();
        await register_account(username, email, password, fullName);
        window.location.href = '/';
    }

    return (
        <div className="flex flex-col items-center justify-center mt-[20%] ">
            <p className="mb-4">Logo</p>
            <form className="flex flex-col items-center justify-center" >
                <div className="mb-4">
                    <input className="input" onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" name="username" />
                </div>
                <div className="mb-4">
                    <input className="input" onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" type="text" name="fullName" />
                </div>
                <div className="mb-4">
                    <input className="input" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" name="email" />
                </div>
                <div className="mb-4">
                    <input className="input" onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" name="password" />
                </div>
                <button onClick={(e) => buttonClick(e)} className="btn-secondary">Login</button>
            </form>
        </div>
    )
}

export default Register;