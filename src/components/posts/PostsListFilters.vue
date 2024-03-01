<template>
  <div class="PostListFilters">
    <TypeFilter class="PostListFilters__TypeFilter" />
    <OrderFilter class="PostListFilters__OrderFilter" />
  </div>
</template>
<script>
import { mapState } from "vuex"

import OrderFilter from "./PostsListFiltersOrder.vue"
import TypeFilter from "./PostsListFiltersType.vue"

export default {
  name: "PostsListFilters",
  computed: {
    ...mapState({
      filters: (state) => state.pet.filters
    })
  },
  components: {
    OrderFilter,
    TypeFilter
  }
}
</script>

<style lang="scss">
.PostListFilters {
  display: flex;
  margin: 10px 10px 20px 0px;
  color: gray;
  font-size: 14px;
  &__TypeFilter {
    margin-right: 30px;
  }

  &__OrderFilter {
    margin: 0;
  }
}
</style>
