<template>
  <div id="app">
      <div id="snackbar"></div>
      <app-nav-bar></app-nav-bar>
      <router-view />
  </div>
</template>

<script>
import NavBar from './includes/NavBar.vue';

export default {
  components: {
    'app-nav-bar': NavBar,
  },
  name: 'app',
};
</script>

<style>
    @import "assets/css/base.css";
    @import "assets/css/componentes.css";
    @import "assets/css/estilos.css";
</style>
