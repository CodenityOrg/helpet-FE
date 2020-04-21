import postAPI from "../../api/post";

const state = {
    total: 0,
    post: {},
    posts: [],
    filters: {
        types: 0,
        order: "desc"
    },
    tags: []
}

const mutations = {
    SET_TOTAL_POSTS(state, total) {
        state.total = total;
    },
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
        state.total = 0;
    }
}

const actions = {
    async fetchPosts({ commit, state }, { ...searchParams }) {
        const {total, posts} = await postAPI.fetchPostList(searchParams);
        if (state.total != total) {
            commit("SET_TOTAL_POSTS", total);
            commit("ADD_POSTS", posts);
        }
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
        longitude: post.location.coordinates[0],
        latitude: post.location.coordinates[1],
        photo: post.photos.length > 0 ? post.photos[0].thumbnailPath : "https://saveapetil.org/wp-content/themes/saveapet/images/dog-placeholder.jpg",
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
