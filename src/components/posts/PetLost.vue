<template>
    <infinite-list
        id="tab-perdidos" 
        class="tab-content"
        @scrollEnd="scrollEnd"
    >
        <loading :active.sync="isLoading"
                :is-full-page="fullPage" />
        <ItemFound
            :key="index"
            v-for="(lostPost, index) in lostPosts"
            :item="lostPost"
            @onShowInfo="showUser"
        />
    </infinite-list>
</template>

<script>
    import ItemFound from "./PostItem";
    import { mapActions, mapState, mapGetters } from "vuex";
    import InfiniteList from "../common/InfiniteList";
    import listMixin from "./mixins/list";

    export default {
        name: "AnimalLost",
        mixins: [listMixin],
        components: {
            ItemFound,
            InfiniteList
        },
        async created() {
            this.isLoading = true;
            this.$store.commit("SET_CURRENT_TYPE", "lost");
            await this.getItems();
            this.skip = this.skip + this.limit;
            this.isLoading = false;
        },
        computed: {
            ...mapState({
                lostPosts: state => state.pet.lostPosts
            })
        },
        methods: {
            ...mapActions({
                getItems: "getLostPosts"
            }),
            showUser(user) {
                this.$emit('onShowInfoUser', user);
            },
        },
        beforeDestroy() {
            this.$store.commit("RESET_LOST_POSTS");
        }
    };
</script>

<style scoped>

</style>
