<template>
    <div id="tab-perdidos" 
        class="tab-content">
        <loading :active.sync="isLoading"
                 :is-full-page="fullPage" />
        <ItemFound
          :key="index"
          v-for="(lostPost, index) in lostPosts"
          :item="lostPost"
        />
    </div>
</template>

<script>
    import ItemFound from "./Item";
    import { mapActions, mapState, mapGetters } from "vuex";

    export default {
        name: 'AnimalLost',
        data() {
            return {
                skip: 0,
                limit: 5
            }
        },
        async created() {
            this.$store.commit("SET_CURRENT_TYPE", "lost");
            await this.getLostPosts();
            this.isLoading = false;
        },
        computed: {
            ...mapState({
                lostPosts: state => state.pet.lostPosts
            })
        },
        components: {
            ItemFound
        },
        methods: {
            ...mapActions({
                getLostPosts:"getLostPosts"
            })
        }
    };
</script>

<style scoped>

</style>
