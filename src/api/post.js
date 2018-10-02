import axios from 'axios';

const HOST = process.env.ROOT_HOST || 'http://localhost:3000/api';

export default {
    list(type) {
        return axios.get(`${HOST}/posts?type=${type}`).then(res => res.data);
    },
    create(payload) {
        return axios.post(`${HOST}/posts`, payload);
    },
    profile(id) {
        return axios.post(`${HOST}/posts/${id}`, payload);
    }
};