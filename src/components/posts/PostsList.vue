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
import {throttle} from "lodash";

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
        })
    },
    watch: {
        filters: {
            async handler(){
                this.isLoading = true;
                await this.fetchPosts({
                    filters: this.filters,
                    skip: this.skip,
                    limit: this.limit
                });
                //this.skip = this.skip + this.limit;
                this.skip = 0;
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
            fetchPosts: "fetchPosts"
        }),
        showUser(user) {
            this.$emit("onShowInfoUser", user);
        },
        resetFilters() {
            this.skip = 0;
        },
        scrollEnd: throttle(async function () {
            this.isLoading = true;
            await this.fetchPosts({
                filters: this.filters, 
                limit: this.limit, 
                skip: this.skip 
            });
            this.skip = this.skip + this.limit;
            this.isLoading = false;
        }, 350)
    },
    beforeDestroy() {
        this.$store.commit("RESET_POSTS");
    }
}
</script>