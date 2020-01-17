<template>
    <transition name="fade">
      <component :is="tag" class="ErrorMessage">
        <span class="ErrorMessage__message">{{message}}</span>
      </component>
    </transition>
</template>

<script>
  export default {
    name: "ErrorMessage",
    props: {
      message: {
        type: String,
      },
      tag: {
        type: String,
        default: "li",
      }
    }
  }
</script>

<style lang="scss" scoped>
.ErrorMessage {
  color: red;
  font-size: 0.8rem;
}
</style>