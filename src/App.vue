<template>
  <div id="app">
      <div id="snackbar"></div>
      <router-view name="navbar" />
      <router-view />
  </div>
</template>

<script>

export default {
  name: 'app',
};
</script>

<style>
    @import "assets/css/base.css";
    @import "assets/css/componentes.css";
    @import "assets/css/estilos.css";
</style>
