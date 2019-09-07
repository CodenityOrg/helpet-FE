<template>
    <infinite-list
        id="tab-perdidos"
        class="tab-content"
        @scrollEnd="scrollEnd"
    >
        <loading :active.sync="isLoading"
                :is-full-page="fullPage" />
        <PostsListItem
            :key="index"
            v-for="(post, index) in posts"
            :post="post"
            :type="type"
            @onShowInfo="showUser"
        />
    </infinite-list>
</template>
<script>
import { mapState, mapActions } from "vuex";
import PostsListItem from "./PostsListItem";

export default {
    name: "PostsList",
    props: {
        filters: {
            type: Object
        }
    },
    components: {
        PostsListItem
    },
    async created() {
        this.isLoading = true;
        await this.fetchPosts();
        this.skip = this.skip + this.limit;
        this.isLoading = false;
    },
    computed: {
        ...mapState({
            posts: state => state.pet.posts
        })
    },
    methods: {
        ...mapActions({
            fetchPosts: "fetchPosts"
        }),
        showUser(user) {
            this.$emit("onShowInfoUser", user);
        },
        resetFilters() {
            this.skip = 0;
        }
    },
    beforeDestroy() {
        this.$store.commit("RESET_LOST_POSTS");
    }
}
</script>