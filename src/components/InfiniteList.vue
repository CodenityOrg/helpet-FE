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
          const {clientHeight, scrollHeight, scrollTop} = this.$refs.container;
          const diff = Math.trunc(scrollHeight - scrollTop);
          console.log(diff, Math.trunc(this.$refs.container.getBoundingClientRect().height))
          return diff === Math.trunc(this.$refs.container.getBoundingClientRect().height);
      }
    }
  }
</script>

