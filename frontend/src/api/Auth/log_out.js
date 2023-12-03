import Cookies from 'js-cookie';

async function logOut() {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
}

export default logOut;

