import register_account from "../../api/Auth/register_account";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [userType, setUserType] = useState('job_seeker');

    const navigate = useNavigate();

    const buttonClick = async (e) => {
        e.preventDefault();
        await register_account(username, email, password, fullName, userType);
        navigate('/');
    }

    const handleCheckboxChange = (type) => {

        setUserType(type);
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center mt-5">
            <p className="mb-4">Logo</p>
            <form className="d-flex flex-column align-items-center form-control" style={{width: "15%"}}>
                <div className="mb-4" style={{color: "white"}}>
                    <input
                        className="form-control"
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        placeholder="Имя пользователя"
                        name="username"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        className="form-control"
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Настоящее имя"
                        type="text"
                        name="fullName"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                        name="email"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Пароль"
                        type="password"
                        name="password"
                        required
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
                <label className="btn btn-outline-primary" htmlFor="btnradio1">Соискатель</label>
                <input
                    type="radio"
                    className="btn-check"
                    name="btnradio"
                    id="btnradio2"
                    autoComplete="off"
                    checked={userType === 'employer'}
                    onChange={() => handleCheckboxChange('employer')}
                />
                <label className="btn btn-outline-primary" htmlFor="btnradio2">Работодатель</label>
                </div>
                <button onClick={(e) => buttonClick(e)} className="btn btn-primary mt-2">Зарегистрироваться</button>
            </form>
        </div>
    );
}

export default Register;
