import axios from 'axios';

const HOST = process.env.VUE_APP_ROOT_HOST || "http://localhost:3000/api";

export default {
    fetchPostList({filters, limit = 5, skip = 0}) {
        return axios.get(`${HOST}/posts?type=${filters.types}&limit=${limit}&skip=${skip}&order=${filters.order}`).then(res => res.data);
    },
    create(payload) {
        return axios.post(`${HOST}/posts/s3`, payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
    },
    profile(id) {
        return axios.post(`${HOST}/posts/${id}`, payload);
    },
    getTags(query) {
        return axios.get(`${HOST}/posts/tags?q=${query}`);
    },
    getOne(id) {
        return axios.get(`${HOST}/posts/${id}`);
    }
};