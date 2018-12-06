import userAPI from "../../api/user";
import Vue from "vue";
import VueCookie from "vue-cookie";

Vue.use(VueCookie);

const state = {
    user: {},
    validate: {}
};

const mutations = {
    SET_USER(state, user){ state.user = user; },
    VALIDATE: (state, validate) => { state.validate = validate }
};

const actions = {
    async registerUser({commit}, data) {
        const {status, data: user } = await userAPI.create(data);
        if (status === 200) {
          commit("SET_AUTHENTICATED", true);
          commit("SET_USER", user);
          VueCookie.set("helpet_auth", user.token);
        }
        return user;
    },
    async validate({commit}, data) {
        const { status, data: user} = await userAPI.validate(data);
        console.log("validate", user);
        if (status === 200) {
          commit("VALIDATE", user);
        }
        return user;
    },
    getProfile({commit}) {
        return userAPI.profile().then(res => res.data);
    },
    updateUser({commit}, data) {
        return userAPI.update(data);
    }
};

export default {
    state,
    actions,
    mutations
}
