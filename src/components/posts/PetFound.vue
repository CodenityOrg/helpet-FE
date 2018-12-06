<template>
  <infinite-list
    id="tab-encontrados" 
    class="tab-content"
    @scrollEnd="scrollEnd"
  >
    <loading :active.sync="isLoading"
      :is-full-page="fullPage" />
    <ItemFound
      :key="index"
      v-for="(foundPost, index) in foundPosts"
      :item="foundPost"
      @onShowInfo="showUser"
    />
  </infinite-list>
</template>

<script>
  import ItemFound from "./Item";
  import { mapActions, mapState, mapGetters } from "vuex";
  import InfiniteList from "../common/InfiniteList";
  import listMixin from "./mixins/list";

  export default {
    name: "PetsFound",
    components: {
      ItemFound,
      InfiniteList
    },
    mixins: [listMixin],
    async created() {
      this.isLoading = true;
      this.$store.commit("SET_CURRENT_TYPE", "found");
      await this.getItems();
      this.skip = this.skip + this.limit;
      this.isLoading = false;
    },
    computed: {
      ...mapState({
        foundPosts: state => state.pet.foundPosts
      })
    },
    methods: {
      ...mapActions({
        getItems: "getFoundPosts"
      }),
      showUser(user) {
        this.$emit('onShowInfoUser', user);
      },
    },
    beforeDestroy() {
      this.$store.commit("RESET_FOUND_POSTS");
    }
  };
</script>
