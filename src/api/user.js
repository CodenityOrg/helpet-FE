import axios from 'axios';

const HOST = process.env.ROOT_HOST || 'http://locahost:3000';

export default {
    create(payload) {
        return axios.post(`${HOST}/users`, { body: payload });
    }
};