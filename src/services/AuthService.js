import Axios from "axios";

export class AuthService {
    constructor(host) {
        this.host = host;
    }

    authLogin(data) {
        const url = this.host + "/login";

        return Axios.post(url, data);
    }
}
