import register_account from "../../api/register_account";
import { useState } from "react";

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [userType, setUserType] = useState('job_seeker');
    const [checkbox, setCheckbox] = useState(false);
    const [checkbox2, setCheckbox2] = useState(false);

    const buttonClick = async (e) => {
        e.preventDefault();
        await register_account(username, email, password, fullName, userType);
        window.location.href = '/';
    }

    const handleCheckboxChange = (type) => {
        setCheckbox(type === 'job_seeker');
        setCheckbox2(type === 'employer');
        setUserType(type);
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center mt-5">
            <p className="mb-4">Logo</p>
            <form className="d-flex flex-column align-items-center form-control" style={{width: "15%"}}>
                <div className="mb-4">
                    <input
                        className="form-control"
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        placeholder="Username"
                        name="username"
                    />
                </div>
                <div className="mb-4">
                    <input
                        className="form-control"
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Full Name"
                        type="text"
                        name="fullName"
                    />
                </div>
                <div className="mb-4">
                    <input
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                        name="email"
                    />
                </div>
                <div className="mb-4">
                    <input
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        type="password"
                        name="password"
                    />
                </div>
                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                <input
                    type="radio"
                    className="btn-check"
                    name="btnradio"
                    id="btnradio1"
                    autoComplete="off"
                    checked={userType === 'job_seeker'}
                    onChange={() => handleCheckboxChange('job_seeker')}
                />
                <label className="btn btn-outline-primary" htmlFor="btnradio1">Job Seeker</label>
                <input
                    type="radio"
                    className="btn-check"
                    name="btnradio"
                    id="btnradio2"
                    autoComplete="off"
                    checked={userType === 'employer'}
                    onChange={() => handleCheckboxChange('employer')}
                />
                <label className="btn btn-outline-primary" htmlFor="btnradio2">Employer</label>
                </div>
                <button onClick={(e) => buttonClick(e)} className="btn btn-primary mt-2">Register</button>
            </form>
        </div>
    );
}

export default Register;
