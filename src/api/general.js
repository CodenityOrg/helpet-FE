import axios from "axios"

const HOST = import.meta.env.VITE_ROOT_HOST || "http://localhost:3000/api"

export default {
  submitContactForm(form) {
    return axios.post(`${HOST}/contact`, form)
  }
}
