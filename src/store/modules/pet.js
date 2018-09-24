import postAPI from "../../api/post";

const state = {
    lostPosts: [],
    foundPosts: [],
    currentType: "found"
}

const mutations = {
    SET_FOUND_POSTS(state, foundPosts) {
        state.foundPosts = foundPosts;
    },
    SET_LOST_POSTS(state, lostPosts) {
        state.lostPosts = lostPosts;
    },
    SET_CURRENT_TYPE(state, type) {
        state.currentType = type;
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

const getCoordinates = (post) => {
    return {
        id: post._id,
        latitude: post.latitude,
        longitude: post.longitude
    }
}

const getters = {
    getPosts: state => state.foundPosts,
    getCurrentPositions: state => {
        if (state.currentType === "found") {
            return state.foundPosts.map(getCoordinates);
        }

        if (state.currentType === "lost") {
            return state.lostPosts.map(getCoordinates);
        }
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}