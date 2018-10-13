import axios from 'axios';

const HOST = process.env.VUE_APP_ROOT_HOST || 'http://localhost:3000/api';

export default {
    list() {
        return axios.get(`${HOST}/posts`);
    },
    create(payload) {
        return axios.post(`${HOST}/posts`, payload);
    },
    profile(id) {
        return axios.post(`${HOST}/posts/${id}`, payload);
    }
};