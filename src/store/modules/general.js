import general from "../../api/general"

const state = {}

const mutations = {}

const actions = {
  async submitContactForm({ commit }, form) {
    const {
      status,
      data: { sent }
    } = await general.submitContactForm(form)
    if (status !== 200) {
      return false
    }
    return sent
  }
}

const getters = {}

export default {
  state,
  actions,
  getters,
  mutations
}
