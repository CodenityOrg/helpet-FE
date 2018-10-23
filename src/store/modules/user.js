import userAPI from "../../api/user";
import Vue from "vue";
import VueCookie from "vue-cookie";

Vue.use(VueCookie);

const state = {
    user: {}
};

const mutations = {
    SET_USER(state, user){
        state.user = user;
    }
};

const actions = {
    async registerUser({commit}, data) {
        //return userAPI.create(data);
        const {status, data: user} = await userAPI.create(data);
        if (status === 200) {
            commit("SET_AUTHENTICATED", true);
            commit("SET_USER", user);
            VueCookie.set("helpet_auth", user.token);
        }
        return
    }
};

export default {
    state, 
    actions,
    mutations
}