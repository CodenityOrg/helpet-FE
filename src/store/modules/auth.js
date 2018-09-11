import authAPI from "../../api/auth";

const state = {
    authenticated: false
}

const mutations = {
    SET_AUTHENTICATED(state, val) {
        state.authenticated = val;
    }
}

const actions = {
    async login({commit}, credentials) {
        const response = await authAPI.login(credentials);
        if (response.statusCode === 200) {
            commit("SET_AUTHENTICATED", true);
        }
    }
}

const getters = {

}

export default {
    state,
    actions,
    getters
}