import axios from "axios"

const HOST = import.meta.env.VITE_ROOT_HOST || "http://localhost:3000/api"

export default {
  create(payload) {
    return axios.post(`${HOST}/users`, payload)
  },
  login(credentials) {
    return axios.post(`${HOST}/login`, credentials)
  },
  profile(fullData) {
    return axios.get(`${HOST}/users/profile?full=${fullData}`)
  },
  update(payload) {
    return axios.put(`${HOST}/users/profile`, payload)
  },
  validate(payload) {
    return axios.post(`${HOST}/users/validate`, payload)
  },
  userById({ id, fullData }) {
    return axios.get(`${HOST}/users/${id}?full=${fullData}`)
  },
  updateToken(token) {
    return axios.put(`${HOST}/users/receiver-id`, { receiverId: token })
  },
  fetchNotifications() {
    return axios.get(`${HOST}/notifications/`)
  },
  readNotification(id) {
    return axios.post(`${HOST}/notifications/${id}/read`)
  }
}
