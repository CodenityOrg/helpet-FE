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
            const container = this.$refs.container;
            return (container.scrollHeight - container.scrollTop ) === (container.clientHeight );
      }
    }
  }
</script>

