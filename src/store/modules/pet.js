import postAPI from "../../api/post";

const state = {
    lostPosts: [],
    foundPosts: []
}

const mutations = {
    SET_FOUND_POSTS(state, foundPosts) {
        state.foundPosts = foundPosts;
    },
    SET_LOST_POSTS(state, lostPosts) {
        state.lostPosts = lostPosts;
    }
}

const actions = {
    async getFoundPosts({ commit }) {
        const {data: foundPosts} = await postAPI.list();
        commit("SET_FOUND_POSTS", foundPosts);
    },
    getLostPosts({ commit }) {
        return postAPI.list();
    },
    createPost({ commit }, payload) {
        return postAPI.create(payload);
    }
}

const getters = {
    getPosts: state => state.foundPosts
}

export default {
    state,
    mutations,
    getters,
    actions
}