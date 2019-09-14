import Axios from "axios";

export class TestService {

    constructor(host) {
        this.host = host;
    }

    getAllTests() {
        const url = this.host + '/test';

        return Axios.get(url);
    }

    addTest(data) {
        const url = this.host + '/test';

        return Axios.post(url, data);
    }

    deleteTest(id) {
        const url = this.host + '/test/' + id;

        return Axios.delete(url);
    }

    editTest(id, data) {
        const url = this.host + '/test/' + id;

        return Axios.put(url, data);
    }
}
