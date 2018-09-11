import axios from 'axios';

const HOST = process.env.ROOT_HOST || 'http://localhost:3000/api';

export default {
    create(payload) {
        return axios.post(`${HOST}/users`, payload);
    },
    login(credentials) {
        return axios.post(`${HOST}/login`, credentials);
    }
};