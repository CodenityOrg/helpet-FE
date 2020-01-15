import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import user from "./modules/user";
import pet from "./modules/pet";
import general from "./modules/general";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

const store = new Vuex.Store({
    modules: {
        auth,
        user,
        pet,
        general
    }
});

export default store;
