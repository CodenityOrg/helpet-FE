import axios from 'axios';

const HOST = process.env.VUE_APP_ROOT_HOST || 'http://localhost:3000/api';

export default {
    create(payload) {
        return axios.post(`${HOST}/users`, payload);
    },
    login(credentials) {
        return axios.post(`${HOST}/login`, credentials);
    },
    profile(fullData) {
        return axios.get(`${HOST}/users/profile?full=${fullData}`);
    },
    update(payload) {
        return axios.put(`${HOST}/users/profile`, payload);
    },
    userById(id) {
        return axios.get(`${HOST}/users/${id}`);
    },
    validate(payload) {
      return axios.post(`${HOST}/users/validate`, payload);
    }
};
