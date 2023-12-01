import axios from 'axios';
import Cookies from 'js-cookie';

async function delete_auth_token() {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
}

export default delete_auth_token;

