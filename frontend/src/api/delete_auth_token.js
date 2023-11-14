import axios from 'axios';

async function delete_auth_token() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
}

export default delete_auth_token;

