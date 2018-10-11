<template>
    <div 
      id="tab-encontrados" 
      class="tab-content"
    >
        <loading :active.sync="isLoading"
            :is-full-page="fullPage" />
        <infinite-list
          style="height: 500px;"
          :isLoading="isListLoading"
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
  import listMixin from "./mixins/list";

  export default {
    name: "PetsFound",
    components: {
      ItemFound,
      InfiniteList
    },
    mixins: [listMixin],
    async created() {
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
      })
    }
  };
</script>
