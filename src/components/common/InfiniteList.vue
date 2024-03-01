<template>
  <div @scroll.passive="debouncedScrollHandler">
    <slot />
  </div>
</template>

<script>
import { debounce } from "lodash"
export default {
  name: "InfiniteList",
  created() {
    this.debouncedScrollHandler = debounce(this.scrollHandler, 200)
  },
  methods: {
    async scrollHandler() {
      if (this.isAtTheBottom()) {
        this.$emit("scrollEnd")
      }
    },
    isAtTheBottom() {
      // Use getBoundingClientRect for get height with decimal part
      const { height } = this.$el.getBoundingClientRect()
      const { scrollHeight, scrollTop } = this.$el

      // Using truncate function for avoid problems with extra pixels in some list elements
      // and get a more accurate difference

      const remainingHeight = Math.trunc(scrollHeight - scrollTop)
      const totalHeight = Math.ceil(height)

      // TODO: Get a method for obtain the exact pixels amount for element
      // Bug: ScrollHeight is retreinving a exceed pixel, it shouldn't according to https://mzl.la/2EKZ3s2
      // Fix: Added a range for avoid exceeding pixels on scroll calculation (NOT DEFINITIVED SOLUTION)

      const range = 5
      const result =
        remainingHeight < totalHeight + range &&
        remainingHeight > totalHeight - range
      return result
    }
  }
}
</script>
