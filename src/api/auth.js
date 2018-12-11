import axios from 'axios';

const HOST = process.env.VUE_APP_ROOT_HOST || 'http://localhost:3000/api';

export default {
    login(credentials) {
        return axios.post(`${HOST}/login`, credentials).catch((e) => {
          console.log(e);
          return e.toString();
        })
    },
    logout() {
        return axios.post(`${HOST}/logout`);
    },
    validToken(token) {
        return axios.post(`${HOST}/users/valid-token`, {token})
                .catch((e) => {
                    if (e.toString().includes("401")) {
                        return {status: 401}
                    }
                });
    }
};
