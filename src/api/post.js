import axios from "axios"

const HOST = import.meta.env.VITE_ROOT_HOST || "http://localhost:3000/api"

export default {
  fetchPostList({ filters, limit = 20, skip = 0 }) {
    return axios
      .get(
        `${HOST}/posts?
            type=${filters.types}&limit=${limit}&skip=${skip}
            &order=${filters.order}`
      )
      .then((res) => res.data)
  },
  fetchNearPostList({
    filters,
    limit = 20,
    skip = 0,
    latitude = 0,
    longitude = 0
  }) {
    return axios
      .get(
        `${HOST}/posts/near?
            type=${filters.types}&limit=${limit}&skip=${skip}
            &longitude=${longitude}&latitude=${latitude}
            &order=${filters.order}`
      )
      .then((res) => res.data)
  },
  create(payload) {
    return axios.post(`${HOST}/posts`, payload, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
  },
  profile(id) {
    return axios.post(`${HOST}/posts/${id}`, payload)
  },
  getTags(query) {
    return axios.get(`${HOST}/posts/tags?q=${query}`)
  },
  getOne(id) {
    return axios.get(`${HOST}/posts/${id}`)
  }
}
