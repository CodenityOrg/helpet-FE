import userAPI from "../../api/user"
import Vue from "vue"
import VueCookie from "vue-cookie"
import axios from "axios"

Vue.use(VueCookie)

const state = {
  user: {},
  validate: {},
  notifications: {},
  countUnreadNotifications: 0
}

const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  VALIDATE: (state, validate) => {
    state.validate = validate
  },
  SET_NOTIFICATIONS(state, notifications) {
    state.notifications = notifications
  },
  SET_NOTIFICATION_READ(state, id) {
    const { notifications } = state
    const index = notifications.findIndex(
      (notification) => notification._id === id
    )
    Vue.set(notifications, index, {
      ...notifications[index],
      read: true
    })
  },
  SET_NOTIFICATIONS_UNREAD(state, count) {
    state.countUnreadNotifications = count
  },
  INCREASE_NOTIFICATIONS_UNREAD(state) {
    state.countUnreadNotifications = state.countUnreadNotifications + 1
  },
  DECREASE_NOTIFICATIONS_UNREAD(state) {
    state.countUnreadNotifications = state.countUnreadNotifications - 1
  }
}

const actions = {
  async registerUser({ commit }, data) {
    const { status, data: user } = await userAPI.create(data)
    if (status === 200) {
      commit("SET_AUTHENTICATED", true)
      commit("SET_USER", user)
      VueCookie.set("helpet_auth", user.token)
      axios.defaults.headers.common["authorization"] = user.token
    }
    return user
  },
  getProfile({ commit }, fullData = true) {
    return userAPI.profile(fullData).then((res) => res.data)
  },
  getOne({ commit }, id) {
    return userAPI.userById({ id, fullData: true }).then((res) => res.data)
  },
  updateUser({ commit }, data) {
    return userAPI.update(data)
  },
  updateToken({ commit, state }, token) {
    return userAPI.updateToken({ token })
  },
  getNotifications({ commit }) {
    return userAPI
      .fetchNotifications()
      .then(({ status, data: { notifications, unread } }) => {
        commit("SET_NOTIFICATIONS", notifications)
        commit("SET_NOTIFICATIONS_UNREAD", unread)
      })
  },
  readNotification({ commit }, id) {
    return userAPI.readNotification(id).then(() => {
      commit("SET_NOTIFICATION_READ", id)
    })
  }
}

export default {
  state,
  actions,
  mutations
}
