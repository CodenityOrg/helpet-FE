import authAPI from "../../api/auth"
import Vue from "vue"
import VueCookie from "vue-cookie"
import Notifications from "vue-notification"
import axios from "axios"

Vue.use(VueCookie)
Vue.use(Notifications)

const state = {
  authenticated: false,
  user: {}
}

const mutations = {
  SET_AUTHENTICATED(state, val) {
    state.authenticated = val
  },
  SET_USER(state, user) {
    state.user = user
  }
}

const actions = {
  async login({ commit }, credentials) {
    const { status, data: user } = await authAPI.login(credentials)
    if (status === 200) {
      commit("SET_AUTHENTICATED", true)
      commit("SET_USER", user)
      VueCookie.set("helpet_auth", user.token)
      axios.defaults.headers.common["authorization"] = user.token
    } else {
      commit("SET_AUTHENTICATED", false)
    }
  },
  async oauthLogin({ commit }, data) {
    const { status, data: user } = await authAPI.oauthLogin(data)
    if (status === 200) {
      commit("SET_AUTHENTICATED", true)
      commit("SET_USER", user)
      VueCookie.set("helpet_auth", user.token)
      axios.defaults.headers.common["authorization"] = user.token
    } else {
      commit("SET_AUTHENTICATED", false)
    }
  },
  logout({ commit }) {
    VueCookie.delete("helpet_auth")
  },
  async validateAuthorization({ commit }) {
    const authorization = VueCookie.get("helpet_auth")
    if (!authorization) {
      return false
    }
    const { status, data: user } = await authAPI.validToken(authorization)

    if (status === 200) {
      commit("SET_AUTHENTICATED", true)
      commit("SET_USER", user)
      return true
    }
    if (status === 401) {
      commit("SET_AUTHENTICATED", false)
      commit("SET_USER", {})
      VueCookie.delete("helpet_auth")
    }
    return false
  }
}

const getters = {}

export default {
  state,
  actions,
  getters,
  mutations
}
