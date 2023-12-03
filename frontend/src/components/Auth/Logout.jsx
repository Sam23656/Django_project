import logOut from '../../api/Auth/log_out';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await logOut()
        navigate('/');
    }

    const handleCancel = async (e) => {
        e.preventDefault();
        navigate('/');
    }

    if (!Cookies.get("access_token")) {
        navigate('/');
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center mt-5" >
            <p className="mb-4">Logo</p>
            <form className="d-flex  flex-column align-items-center form-control" style={{ width: "15%", background: "#333", color: "#fff" }}>
                <div className="mb-4">
                    <p>Вы уверены, что хотите выйти?</p>
                </div>
                <div className="flex flex-row">
                    <button onClick={(e) => handleSubmit(e)} className="btn btn-primary">Выйти</button>
                    <button onClick={(e) => handleCancel(e)} className="ms-2 btn btn-secondary" >Отменить</button>
                </div>
            </form>
        </div>
    );
}

export default Logout;

