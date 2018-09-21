<template>
    <div id="tab-perdidos" 
        style="height: 70vh; overflow-y: auto;"
        class="tab-content">
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
            this.getFoundPosts();
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
