<template>
  <div id="app">
      <div>
          <div id="snackbar"></div>
          <NavBar></NavBar>
          <HomePage></HomePage>
      </div>
  </div>
</template>

<script>
import HomePage from './home/HomePage.vue';
import NavBar from './includes/NavBar.vue';

export default {
  name: 'app',
  components: {
    HomePage,
    NavBar,
  },
};
</script>

<style>
@import './assets/css/base.css';
@import './assets/css/componentes.css';
@import './assets/css/estilos.css';

</style>
