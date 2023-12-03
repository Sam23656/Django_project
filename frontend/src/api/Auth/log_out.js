import Cookies from 'js-cookie';

async function logOut() {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        Cookies.remove("id");
        Cookies.remove("admin_status");
        Cookies.remove("user_role");
}

export default logOut;

