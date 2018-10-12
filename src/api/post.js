import axios from 'axios';

const HOST = process.env.ROOT_HOST || 'http://localhost:3000/api';

export default {
    list({type, limit = 5, skip = 0}) {
        return axios.get(`${HOST}/posts?type=${type}&limit=${limit}&skip=${skip}`).then(res => res.data);
    },
    create(payload) {
        return axios.post(`${HOST}/posts`, payload);
    },
    profile(id) {
        return axios.post(`${HOST}/posts/${id}`, payload);
    },
    getFeatures(query) {
        return axios.get(`${HOST}/posts/features?q=${query}`);
    }
};