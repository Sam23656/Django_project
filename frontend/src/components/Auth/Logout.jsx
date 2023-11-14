import delete_auth_token from "../../api/delete_auth_token";

function Logout() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        await delete_auth_token()
        window.location.href = '/';
    }

    return (
        <div className="flex flex-col items-center justify-center mt-[20%] ">
            <p className="mb-4">Logo</p>
            <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <p>Are you sure you want to logout?</p>
                </div>
                <div className="flex flex-row">
                <input type="submit" className="bg-gradient-to-r from-violet-900 to-violet-700 hover:from-violet-800 hover:to-violet-600 text-white font-bold py-2 px-4 rounded-full" value="Logout"/>
                <input style={{'width': '120px', 'height': '50px'}} type="button" onClick={() => window.location.href = '/'} className="ms-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded-full" value="Cancel"/>
                </div>
            </form>
        </div>
    )
}

export default Logout;
