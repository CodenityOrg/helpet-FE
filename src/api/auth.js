import axios from 'axios';

const HOST = process.env.ROOT_HOST || 'http://localhost:3000/api';

export default {
    login(credentials) {
        return axios.post(`${HOST}/login`, credentials);
    },
    logout() {
        return axios.post(`${HOST}/logout`);
    }
};