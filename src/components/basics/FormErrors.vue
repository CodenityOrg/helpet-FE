<template>
    <transition name="fade">
      <ul class="FormErrors">
        <slot/>
      </ul>
    </transition>
</template>

<script>
  export default {
    name: "FormErrors",
  }
</script>

<style lang="scss" scoped>
.FormErrors {
  text-align: left;
  margin: 1em 0 0 0;
}
</style>