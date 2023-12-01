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
        <div className="d-flex flex-column align-items-center justify-content-center " style={{marginTop: "20%"}}>
            <p className="mb-4">Logo</p>
            <form className="form-control" style={{width: "10%"}}>
                <div className="mb-4">
                    <input className="form-control" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" name="email" />
                </div>
                <div className="mb-4">
                    <input className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" name="password" />
                </div>
                <button onClick={(e) => buttonClick(e)} className="btn btn-primary ms-5">Login</button>
            </form>
        </div>
    )
}
}

export default Login;
