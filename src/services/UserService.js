import Axios from "axios";

export class UserService {
    constructor(host) {
        this.host = host;
    }

    getAllUsers() {
        const url = this.host + "/user";

        return Axios.get(url);
    }

    getUser(id) {
        const url = this.host + "/user/" + id;

        return Axios.get(url);
    }

    createUser(data) {
        const url = this.host + "/user";

        return Axios.post(url, data);
    }

    editUser(id, data) {
        const url = this.host + "/user/" + id;

        return Axios.put(url, data);
    }

    deleteUser(id) {
        const url = this.host + "/user/" + id;

        return Axios.delete(url);
    }
}
