import postAPI from "../../api/post";

const state = {
    post: {},
    posts: [],
    filters: {
        types: 0,
        order: "desc"
    },
    tags: []
}

const mutations = {
    SET_CURRENT_TYPE(state, type) {
        state.currentType = type;
    },
    SET_TAGS(state, tags) {
        state.tags = tags;
    },
    ADD_POSTS(state, posts) {
        if (posts) {
            state.posts.push(...posts);
        }
    },
    SET_FILTERS(state, filters) {
        state.filters = filters;
    },
    RESET_POSTS(state) {
        state.posts = [];
    }
}

const actions = {
    async fetchPosts({ commit }, { ...searchParams }) {
        const posts = await postAPI.fetchPostList(searchParams);
        commit("ADD_POSTS", posts);
    },
    createPost({ commit }, payload) {
        return postAPI.create(payload);
    },
    async getTags({commit}, q) {
        const {data: tags} = await postAPI.getTags(q);
        commit("SET_TAGS", tags);
    }
}

const getCoordinates = (post) => {
    return {
        id: post._id,
        latitude: post.latitude,
        longitude: post.longitude,
        photo: post.photos[0].thumbnailPath,
        type: 1
    }
}

const getters = {
    getCurrentPositions: state => state.posts.map(getCoordinates)
}

export default {
    state,
    mutations,
    getters,
    actions
}
