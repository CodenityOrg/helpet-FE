<template>
    <div id="tab-encontrados" 
        class="tab-content"
    >
        <loading :active.sync="isLoading"
            :is-full-page="fullPage" />
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
    name: "PetsFound",
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
        getFoundPosts: "getFoundPosts"
      })
    },
    async created() {
      this.$store.commit("SET_CURRENT_TYPE", "found");
      await this.getFoundPosts();
      this.isLoading = false;
    }
  };
</script>

<style scoped>

</style>
