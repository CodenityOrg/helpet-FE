import userAPI from "../../api/user";

const state = {
    user: {}
};

const mutations = {
    SET_USER(state, user){
        state.user = user;
    }
};

const actions = {
    registerUser({commit}, data) {
        return userAPI.create(data);
    }
};

export default {
    state, 
    actions,
    mutations
}