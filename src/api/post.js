import axios from 'axios';

const HOST = process.env.ROOT_HOST || 'http://locahost:3000';

export default {
    list() {
        return axios.get(`${HOST}/posts`);
    },
    create(payload) {
        return axios.post(`${HOST}/posts`, { body: payload });
    },
    profile(id) {
        return axios.post(`${HOST}/posts/${id}`, { body: payload });
    }
};