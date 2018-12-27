import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import user from "./modules/user";
import pet from "./modules/pet";
import Notifications from 'vue-notification';

Vue.use(Vuex);
Vue.use(Notifications);

const debug = process.env.NODE_ENV !== "production";

const store = new Vuex.Store({
    modules: {
        auth,
        user,
        pet
    }
});

export default store;
