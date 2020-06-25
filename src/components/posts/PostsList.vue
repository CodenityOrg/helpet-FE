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
            @onShowInfo="showUser"
        />
    </infinite-list>
</template>
<script>
import { mapState, mapActions } from "vuex";
import PostsListItem from "./PostsListItem";
import InfiniteList from "../common/InfiniteList";

export default {
    name: "PostsList",
    props: {
        filters: {
            type: Object
        }
    },
    components: {
        PostsListItem,
        InfiniteList
    },
    computed: {
        ...mapState({
            posts: state => state.pet.posts,
            total: state => state.pet.total,
        })
    },
    watch: {
        filters: {
            async handler(){
                this.skip = 0;
                this.isLoading = true;
                await this.fetchNearPosts({
                    filters: this.filters,
                    skip: this.skip,
                    limit: this.limit
                });
                this.skip += this.limit;
                this.isLoading = false;
            },
            immediate: true
        }
    },
    data() {
        return {
            skip: 0,
            limit: 5,
            isLoading: false
        }
    },
    methods: {
        ...mapActions({
            fetchNearPosts: "fetchNearPosts"
        }),
        showUser(user) {
            this.$emit("onShowInfoUser", user);
        },
        resetFilters() {
            this.skip = 0;
        },
        async scrollEnd() {
            this.isLoading = true;
            await this.fetchNearPosts({
                filters: this.filters,
                limit: this.limit,
                skip: this.skip
            });
            this.skip += this.limit;
            this.isLoading = false;
        }
    },
    beforeDestroy() {
        this.$store.commit("RESET_POSTS");
    }
}
</script>