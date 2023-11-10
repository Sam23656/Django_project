import delete_auth_token from "../../api/delete_auth_token";

function Logout() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth_token = localStorage.getItem('auth_token');
        await delete_auth_token(auth_token);
        window.location.href = '/';
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Log Out</h1>
                <input type="submit" value="Submit"/>
            </form>
        </>
    )
}

export default Logout;
