<template>
  <section class="container">
    <b-row class="mt-5 mb-5 terms">
      <b-col lg="8" offset-lg="2">
        <b-card class="p-4 rounded-lg">
          <div v-html="$t('terms.content')" />
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script>
export default {
  name: "TermsView"
}
</script>
<style lang="scss">
.terms {
  h1 {
    margin-bottom: 2rem;
  }
  h2,
  h3,
  h4 {
    margin-bottom: 0.9rem;
  }
  h2,
  h3,
  h4 {
    padding-top: 0.8rem;
  }
  .rounded-lg p:last-child {
    margin-bottom: 0;
  }
}
</style>
