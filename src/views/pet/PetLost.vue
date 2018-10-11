<template>
    <div
        id="tab-perdidos" 
        class="tab-content">
        <loading :active.sync="isLoading"
                 :is-full-page="fullPage" />
        <infinite-list
            style="height: 500px;"
            :loading="isListLoading"
            @scrollEnd="scrollEnd"
        >
            <ItemFound
                :key="index"
                v-for="(lostPost, index) in lostPosts"
                :item="lostPost"
            />
        </infinite-list>

    </div>
</template>

<script>
    import ItemFound from "./Item";
    import { mapActions, mapState, mapGetters } from "vuex";
    import InfiniteList from "../../components/InfiniteList";
    import listMixin from "./mixins/list";

    export default {
        name: "AnimalLost",
        mixins: [listMixin],
        components: {
            ItemFound,
            InfiniteList
        },
        async created() {
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
            })
        }
    };
</script>

<style scoped>

</style>
