import delete_auth_token from "../../api/delete_auth_token";
import Cookies from 'js-cookie';

function Logout() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        await delete_auth_token()
        window.location.href = '/';
    }
    const handleCancel = async (e) => {
        e.preventDefault();
        window.location.href = '/';
    }
    if (!Cookies.get("access_token")) {
        window.location.href = '/';
    }

    else {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center mt-5" >
            <p className="mb-4">Logo</p>
            <form className="d-flex flex-column align-items-center form-control" style={{width: "15%"}}>
                <div className="mb-4">
                    <p>Are you sure you want to logout?</p>
                </div>
                <div className="flex flex-row">
                <button onClick={(e) => handleSubmit(e)} className="btn btn-primary">Logout</button>
                <button onClick={(e) => handleCancel(e)} className="ms-2 btn btn-secondary" >Cancel</button>
                </div>
            </form>
        </div>
    )
}
}

export default Logout;
