<template>
    <div id="tab-encontrados" 
        class="tab-content"
    >
        <loading :active.sync="isLoading"
            :is-full-page="fullPage" />
        <infinite-list
          @scrollEnd="scrollEnd"
        >
          <ItemFound
            :key="index"
            v-for="(foundPost, index) in foundPosts"
            :item="foundPost"
          />
        </infinite-list>
    </div>
</template>

<script>
  import ItemFound from "./Item";
  import { mapActions, mapState, mapGetters } from "vuex";
  import InfiniteList from "../../components/InfiniteList";

  export default {
    name: "PetsFound",
    components: {
      ItemFound,
      InfiniteList
    },
    computed: {
      ...mapState({
        foundPosts: state => state.pet.foundPosts
      })
    },
    data() {
      return {
        limit: 5,
        skip: 0,
        items: []
      }
    },
    methods: {
      ...mapActions({
        getFoundPosts: "getFoundPosts"
      }),
      async scrollEnd() {
        const items = await this.getFoundPosts({ limit: this.limit, skip: this.skip });
        this.$store.commit("ADD_FOUND_POSTS", items);
        this.skip += this.limit;
      }
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
