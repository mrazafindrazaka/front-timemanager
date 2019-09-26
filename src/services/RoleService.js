import Axios from "axios";

export class RoleService {
    constructor(host) {
        this.host = host;
    }

    getAllRoles() {
        const url = this.host + "/roles";

        return Axios.get(url);
    }

    getRole(id) {
        const url = this.host + "/role/" + id;

        return Axios.get(url);
    }

    createRole(data) {
        const url = this.host + "/role";

        return Axios.post(url, data);
    }

    editRole(id, data) {
        const url = this.host + "/role/" + id;

        return Axios.put(url, data);
    }

    deleteRole(id) {
        const url = this.host + "/role/" + id;

        return Axios.delete(url);
    }
}
