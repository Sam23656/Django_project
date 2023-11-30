import createAuthToken from "../../api/create_auth_token";
import { useState } from "react";
import Cookies from "js-cookie";
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const buttonClick = async (e) => {
        e.preventDefault();
        await createAuthToken(email, password);
        window.location.href = '/';
    }
    if (Cookies.get("access_token")) {
        window.location.href = '/';
    }
    else{
    return (
        <div className="flex flex-col items-center justify-center mt-[20%] ">
            <p className="mb-4">Logo</p>
            <form className="flex flex-col items-center justify-center">
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
}

export default Login;
