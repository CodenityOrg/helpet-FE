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
        if (this.isAtTheBottom()) {
            console.log("scroll reached")
            this.$emit("scrollEnd");
        }
      },
      isAtTheBottom() {
          const $container = this.$refs.container;
          // Use getBoundingClientRect for get height with decimal part
          const {height} = $container.getBoundingClientRect();
          const {scrollHeight, scrollTop} = $container;

          // Using truncate function for avoid problems with extra pixels in some list elements 
          // and get a more accurate difference

          const remainingHeight = Math.trunc(scrollHeight - scrollTop);
          const totalHeight = Math.trunc(height);

          // TODO: Get a method for obtain the exact pixels amount for element
          // Bug: ScrollHeight is retreinving a exceed pixel, it shouldn't according to https://mzl.la/2EKZ3s2
          // Fix: Added a range for avoid exceeding pixels on scroll calculation (NOT DEFINITIVED SOLUTION)

          const range = 5;
          return remainingHeight < totalHeight + range && remainingHeight > totalHeight - range;
      }
    }
  }
</script>

