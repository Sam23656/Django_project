import logIn from '../../api/Auth/log_in';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import Cookies from "js-cookie";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const buttonClick = async (e) => {
    e.preventDefault();
    await logIn(email, password);
    navigate('/');
  };

  if (Cookies.get("access_token")) {
    navigate('/');
  } else {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ marginTop: "20%" }}>
        <p className="mb-4">Logo</p>
        <form className="form-control d-flex flex-column align-items-center justify-content-center" style={{ width: "80%", maxWidth: "400px" }}>
          <div className="mb-4" style={{ width: "100%" }}>
            <input className="form-control" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" name="email" />
          </div>
          <div className="mb-4" style={{ width: "100%" }}>
            <input className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" type="password" name="password" />
          </div>
          <button onClick={(e) => buttonClick(e)} className="btn btn-primary">Войти</button>
        </form>
      </div>
    );
  }
}

export default Login;
