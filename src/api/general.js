import axios from 'axios';

const HOST = process.env.VUE_APP_ROOT_HOST || "http://localhost:3000/api";

export default {
    submitContactForm(form) {
        return axios.post(`${HOST}/contact`, form);
    }
};