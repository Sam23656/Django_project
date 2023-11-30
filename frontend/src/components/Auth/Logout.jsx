import delete_auth_token from "../../api/delete_auth_token";
import Cookies from 'js-cookie';

function Logout() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        await delete_auth_token()
        window.location.href = '/';
    }

    if (!Cookies.get("access_token")) {
        window.location.href = '/';
    }
    else {
    return (
        <div className="flex flex-col items-center justify-center mt-[20%] ">
            <p className="mb-4">Logo</p>
            <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <p>Are you sure you want to logout?</p>
                </div>
                <div className="flex flex-row">
                <button className="btn-secondary">Logout</button>
                <button onClick={() => window.location.href = '/'} className="btn-secondary" >Cancel</button>
                </div>
            </form>
        </div>
    )
}
}

export default Logout;
