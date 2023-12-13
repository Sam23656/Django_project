import register_account from "../../api/Auth/register";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [userType, setUserType] = useState('job_seeker');
  const today = new Date();

  const navigate = useNavigate();

  const buttonClick = async (e) => {
    e.preventDefault();

    
    if (!username || !email || !password || !fullName) {
      alert('Please fill in all fields.');
      return;
    }

    await register_account(username, email, password, fullName, userType, dateOfBirth);
    navigate('/');
  }

  const handleCheckboxChange = (type) => {
    setUserType(type);
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center mt-5">
      <p className="mb-4">Logo</p>
      <form className="form-control d-flex flex-column align-items-center" style={{ width: "80%", maxWidth: "400px" }}>
        <div className="mb-4">
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
            minLength="6"
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
        <br />
        <label>Дата рождения:</label>
        <input type="date" className="form-control" style={{ width: "75%" }} name="dateOfBirth" min="1900-01-01" max={today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2)} value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
        <button onClick={(e) => buttonClick(e)} className="btn btn-primary mt-2">Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default Register;
