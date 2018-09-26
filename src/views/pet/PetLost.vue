<template>
    <div id="tab-perdidos" 
        class="tab-content">
        <loading :active.sync="isLoading"
                 :is-full-page="fullPage"></loading>
        <ItemFound
          :key="index"
          v-for="(foundPost, index) in foundPosts"
          :item="foundPost"
        />
    </div>
</template>

<script>
    import ItemFound from "./Item";
    import { mapActions, mapState, mapGetters } from "vuex";

    export default {
        name: 'AnimalLost',
        created() {
            this.getFoundPosts().then(() => {
                this.isLoading = false;
            });
        },
        components: {
            ItemFound
        },
        computed: {
            ...mapState({
                foundPosts: state => state.pet.foundPosts
            })
        },  
        methods: {
            ...mapActions({
                getFoundPosts:"getFoundPosts"
            })
        }
    };
</script>

<style scoped>

</style>
