<template>
  <div id="app">
      <div>
          <div id="snackbar"></div>
          <router-view name="navbar"></router-view>
          <router-view></router-view>
      </div>
  </div>
</template>

<script>

export default {
  name: 'app',
};
</script>

<style>
@import './assets/css/base.css';
@import './assets/css/componentes.css';
@import './assets/css/estilos.css';

</style>
