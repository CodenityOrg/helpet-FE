<template>
  <div
    ref="container"
    @scroll="scrollHandler"
  >
    <slot/>
  </div>
</template>

<script>
  export default {
    name: "InfiniteList",
    methods: {
      async scrollHandler() {
        console.log("scrollHeight", this.$refs.container.scrollHeight);
        if (this.isAtTheBottom()) {
            console.log("scroll reached")
            this.$emit("scrollEnd");
        }
      },
      mounted() {
        console.log("scrollHeight", this.$refs.container.scrollHeight);
      },
      isAtTheBottom() {
          const $container = this.$refs.container;
          
          // Use getBoundingClientRect for get height with decimal part
          const {height} = $container.getBoundingClientRect();
          const {scrollHeight, scrollTop} = $container;

          // Using truncate function for avoid problems with extra pixels in some list elements 
          // and get a more accurate difference
          return Math.trunc(scrollHeight - scrollTop) === Math.trunc(height);
      }
    }
  }
</script>

