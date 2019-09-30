import Axios from "axios";

export class ClockService {
    constructor(host) {
        this.host = host;
    }

    clockIn(id_user) {
        const url = this.host + "/clockInUserById?id_user=" + id_user;

        return Axios.get(url);
    }

    clockOut(id_user) {
        const url = this.host + "/clockOutUserById?id_user=" + id_user;

        return Axios.get(url);
    }

    getAllClock() {
        const url = this.host + "/queryTimes";

        return Axios.get(url);
    }

    getUserClock(id_user) {
        const url = this.host + "/queryTime?id_user=" + id_user;

        return Axios.get(url);
    }
}
