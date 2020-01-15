import general from "../../api/general";

const state = {

}

const mutations = {

}

const actions = {
    async submitContactForm({commit}, form) {
        // const {sent} = await general.submitContactForm(form);
        console.log(form);
        return true;
    }
}

const getters = {

}

export default {
    state,
    actions,
    getters,
    mutations
}
