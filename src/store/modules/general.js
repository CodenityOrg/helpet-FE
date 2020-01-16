const state = {

}

const mutations = {

}

const actions = {
    async submitContactForm({commit}, form) {
        const {sent} = await general.submitContactForm(form);
        return sent;
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
