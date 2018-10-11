<template>
  <div
    ref="container"
    style="overflow-y: scroll;"
    @scroll="scrollHandler"
  >
    <loading 
        :active.sync="loading"
        :is-full-page="false" 
    />
    <slot/>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "InfiniteList",
    methods: {
      async scrollHandler() {
        if (this.isAtTheBottom()) {
            this.$emit("scrollEnd");
        }
      },
      isAtTheBottom() {
        const container = this.$refs.container;
        return (container.scrollHeight - container.scrollTop ) === (container.clientHeight );
      }
    },
    props: {
      loading: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

