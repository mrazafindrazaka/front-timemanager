import Axios from "axios";

export class TeamService {
    constructor(host) {
        this.host = host;
    }

    getAllTeams() {
        const url = this.host + "/teams";

        return Axios.get(url);
    }

    getTeam(id) {
        const url = this.host + "/team/" + id;

        return Axios.get(url);
    }

    createTeam(data) {
        const url = this.host + "/team";

        return Axios.post(url, data);
    }

    editTeam(id, data) {
        const url = this.host + "/team/" + id;

        return Axios.put(url, data);
    }

    deleteTeam(id) {
        const url = this.host + "/team/" + id;

        return Axios.delete(url);
    }
}
